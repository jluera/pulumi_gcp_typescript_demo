import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";


// Creating a GCP Cloud Storage bucket in US for web origin
const bucket = new gcp.storage.Bucket("pulumi_demo_website", {
    location: "US",
});


// Set default ACLs for Cloud Storage bucket
const acl = new gcp.storage.DefaultObjectAccessControl("pulumi_demo_website", {
    bucket: bucket.name,
    role: "READER",
    entity: "allUsers",
});


// Loop over file names in an array to name bucket objects
["index.html", "404.html"].map(
    (name) => 
    new gcp.storage.BucketObject(name, {
        bucket: bucket.name,
        source: new pulumi.asset.FileAsset(`../wwwroot/${name}`),
        name: name,
    }, {dependsOn: acl })
);


// Build the URL when the bucket name is returned from Google Cloud API
export const url = pulumi.interpolate`http://storage.googleapis.com/${bucket.name}/index.html`


// Pull docker image for webapp
const imageName = "demo-cloudrun-app";
const image = new docker.Image("example", {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/${imageName}:latest`,
  build: {
    dockerfile: "wwwroot/Dockerfile",
    context: "wwwroot", 
    platform: "linux/amd64" },
  });


// Configure Google Cloudrun and docker container for webapp
const container = new gcp.cloudrun.Service("demo-app", {
  name: "demo-app",
  location: "us-central1",
  template: {
    spec: {
      containers: [
        {
          image: image.imageName,
          ports: [{
            containerPort: 80,
          }],
          resources: {
            requests: {
              memory: "64Mi",
              cpu: "200m",
            },
            limits: {
              memory: "256Mi",
              cpu: "1000m",
            },
          },
        },
      ],
      containerConcurrency: 80,
    },
  },
});


// Allow anyone to access 
const iam = new gcp.cloudrun.IamMember("example", {
    service: container.name,
    location: "us-central1",
    role: "roles/run.invoker",
    member: "allUsers",
});

// exporting url for container
export const containerUrl = container.statuses[0].url
