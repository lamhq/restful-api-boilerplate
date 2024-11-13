# NOTES

## Commands

Init project
```shell
terraform init -backend-config=backend.tfvars -reconfigure
terraform workspace new dev
```

Build:
```shell
npm run build
```

Preview changes:
```shell
terraform plan -var-file="params.tfvars"
```

Deploy:
```shell
terraform apply -var-file="params.tfvars" --auto-approve
```

Clean up:
```sh
terraform destroy -var-file="params.tfvars" --auto-approve
terraform workspace select default
terraform workspace delete dev
```

Invoke API GET /data:
```sh
curl -X GET https://b4iso32rk5.execute-api.eu-central-1.amazonaws.com/v1/data
```

Invoke API POST /data:
```sh
curl -X PUT https://b4iso32rk5.execute-api.eu-central-1.amazonaws.com/v1/data
```


## References

- [Using OIDC identity providers with a user pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html)
- https://docs.aws.amazon.com/lambda/latest/dg/typescript-layers.html
- https://docs.aws.amazon.com/lambda/latest/operatorguide/anti-patterns.html


## Documentation

### Reusing Lambda execution environment

A database connection instance can be reused across multiple invocations of the same Lambda function but cannot be shared between different Lambda functions.

If you want to reuse a database connection instance across multiple Lambda functions, you can use a managed connection pooling outside of the individual functions (Amazon RDS Proxy, for example).

Another method is to have only one Lambda function for all the application logic. Before that, you need to consider pros and cons of Monolith Lambda


### SAM Resource Naming Convention

Stack name format: `{project}-{env}-{part}`:
- `project`: name of the software project you're working on
- `env`: runtime environment (`dev`, `stage`, `prod`)
- `part`: part of your system (`web`, `api`, `database`, ...)

Template resource name format: `{resource-name}{resource-type}`.

AWS resource name format: `{project}-{env}-{part}-{resource-name}-{resource-type}`.

All the `project`, `env` and `part` should be provided as template parameters.

For example, if the project name is `demo`, and the environment to be deployed is `dev`. We're using a SAM template to define resources for the API part (`api`), it includes an API Gateway, a Lambda function.
- Stack name: `demo-dev-api`
- API Gateway:
  - Template resource name: `RestApi`
  - AWS resource name: `demo-dev-api-rest-api`
- Lambda function: `demo-dev-get-data-fn`
  - Template resource name: `GetDataFunction`
  - AWS resource name: `demo-dev-api-get-data-fn`


### Configure Amazon Cognito

When adding an identity provider (e.g., Google), set **Authorized scopes** to `profile email openid`

To authenticate API Gateway with Amazon Cognito:
- Redirect user to a login URL (Cognito domain)
- Get authorization code in the URL after user is redirected to your site
- Exchange the authorization code for `id_token`, `access_token`, `refresh_token`
- Use `id_token` to send request to protected API Gateway `Authorization: Bearer {id_token}`


### Access user's info in Lambda function

```js
export const lambdaHandler = async (event, context) => {
  if (event.requestContext && event.requestContext.authorizer) {
    // Extract user claims
    const userClaims = event.requestContext.authorizer.claims;

    // Access specific claims (e.g., username, email)
    const username = userClaims['cognito:username'];
    const email = userClaims['email'];

    // Log the user information
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
  }
  // ...
}
```

### Install Podman

brew install podman

podman machine init
podman machine start
podman machine stop


### Configure SAM CLI to work with Podman

1. Method 1: Docker API socket address can't be used by podman
run the command:
podman machine start

look in the command output, copy the command that set the socket address, it look like this:
export DOCKER_HOST='unix:///var/folders/vh/0y48_l8d1sx5f326mj43n8c40000gn/T/podman/podman-machine-default-api.sock'

paste and run the copied command in terminal, that tell the SAM CLI which address to run docker commands

run SAM CLI commands as usual

this method require you to set the `DOCKER_HOST` every time open a terminal session

1. Method 2: redirects the Docker API socket to Podman's socket
sudo /opt/homebrew/Cellar/podman/5.2.5/bin/podman-mac-helper install
podman machine stop
podman machine start

You do not need to set `DOCKER_HOST`.


### Finding Docker image used for builing SAM application

run the command: `sam build --use-container`.
look in the terminal output for the image name:
```
Fetching public.ecr.aws/sam/build-nodejs20.x:latest-arm64 Docker container image...
```


### Bugs: can not add tags for `AWS::Serverless::Api`

One thing to consider when using SAM is you cannot set tags for API Gateway:
```yml
  MyApi:
    Type: 'AWS::Serverless::Api'
    Properties:
      Name: !Sub "${Project}-${Env}-api"
      StageName: 'v1'
      Tags:
        project: !Sub "${Project}-${Env}"
        owner: !Ref Owner
```