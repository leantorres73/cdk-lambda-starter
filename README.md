# Welcome to your CDK TypeScript Starter project!

## How to start

1 - Put your repository name in repository.ts file.

2 - Push into master, dev and test branches.

3 - Run `npm run build`

4 - Run a cdk deploy only once (`cdk deploy '*' --require-approval never`) and then you don't need to deploy anymore because the pipelines will do the work for you.

## Documentation

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `npm run deploy`  it prepares your stack to be deployed in cdk
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
