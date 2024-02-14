## Simple Pulumi project using Typescript and GCP. Taken from Pulumi.
In this short demo project we will create a simple static website placed inside Google Cloud Storage bucket and another web application to be run off of Cloudrun via a docker container.  The demo I originally followed had these as two steps but the instructions below combines them into one batch job.

## Installing Prerequisites


### Node.js
First, you will need to ensure Node.js is installed and working:

```bash
$ node --version
v12.10.0
```

Also, verify that the Node Package Manager (NPM) is working:

```bash
$ npm --version
6.10.3
```

And make sure that Docker is installed and working:

```
docker version
```

### Google Cloud Project & SDK

You need an Google Cloud Platform account to deploy the components of the application. You may use your organization subscription, or create a free Google Cloud account [here](https://cloud.google.com/getting-started).

Please be sure to have administrative access to the subscription.

You will also use the command-line interface (CLI) tool to log in to an Google Cloud Platform account. You can install the SDK, as described [here](https://cloud.google.com/sdk/docs/install).

Once you've installed the GCloud SDK, you'll need to authenticate. You can find instructions on how to do that [here](https://cloud.google.com/sdk/docs/authorizing#authorizing_with_a_user_account)

Finally, you'll need an active GCP project to use when provisioning resources. You can use an existing project, or [create a new one](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

### Pulumi

You will use Pulumi to deploy infrastructure changes using code. [Install Pulumi here](https://www.pulumi.com/docs/get-started/install/). After installing the CLI, verify that it is working:

```bash
$ pulumi version
v3.1.0
```

The Pulumi CLI will ask you to login to your Pulumi account as needed. If you prefer to signup now, [go to the signup page](http://app.pulumi.com/signup). Multiple identity provider options 
are available &mdash; email, GitHub, GitLab, or Atlassian &mdash; and each of them will work equally well for these labs.

### Create an empty directory for the new Pulumi project

```
mkdir gcp-demo
cd gcp-demo
```

### Initialize a new Palumi project for Typescript
```
pulumi new typescript
```

### Install gcp and docker providers via npm
```
npm install @pulumi/gcp
npm install @pulumi/docker
```

### Link Pulumi with your GCP project so resources will be created in the same location
```
pulumi config set gcp:project gpc-project-name
```

### Copy or clone the files over to this project folder.
I'll leave this up to you.


### When the files are set you can kick off the process with Pulumi
```
pulumi up
```



