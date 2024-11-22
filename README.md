# RESTful API Template

## Overview

A starter code for a RESTful API application, built with Amazon API Gateway and AWS Lambda.


## Build your application

```bash
npm run build
```


## Unit tests

TBC


## Infrastructure Setup

Create a `backend.tfvars` file that contains configuration for Terraform S3 backend:
```hcl filename="backend.tfvars"
region               = ""
workspace_key_prefix = ""
bucket               = ""
key                  = ""
dynamodb_table       = ""
```

Create a `params.tfvars` file that contain required input parameters (see [`variables.tf`](./variables.tf)):
```hcl filename="params.tfvars"
region          = ""
owner           = ""
project         = ""
artifact_bucket = ""
```

Init the project:
```shell
terraform init -backend-config=backend.tfvars -reconfigure
terraform workspace new dev
terraform workspace select dev
```


## Deploy & sync

```shell
terraform apply -var-file="params.tfvars" --auto-approve
```


## Clean up

```sh
terraform destroy -var-file="params.tfvars" --auto-approve
terraform workspace select default
terraform workspace delete dev
```


## Source code structure

TBC