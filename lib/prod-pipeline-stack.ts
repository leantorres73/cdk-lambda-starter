import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import * as codecommit from '@aws-cdk/aws-codecommit';
import { CdkpipelinesStage } from './pipelines-stack';
import { repositoryName } from '../repository';

/**
 * The stack that defines the application pipeline
 */
export class ProdPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const branch = 'master';

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const repository = codecommit.Repository.fromRepositoryName(this, 'Repository', repositoryName);

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: repositoryName + '-' + branch,
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: new codepipeline_actions.CodeCommitSourceAction({
        branch,
        repository: repository,
        output: sourceArtifact,
        actionName: 'CodeCommit',
      }),

       // How it will be built and synthesized
       synthAction: SimpleSynthAction.standardNpmSynth({
         sourceArtifact,
         cloudAssemblyArtifact,
         
         // We need a build step to compile the TypeScript Lambda
         buildCommand: 'npm run build'
       }),
    });

    pipeline.addApplicationStage(new CdkpipelinesStage(this, repositoryName, {
      env: { account: 'PROD_ACCOUNT', region: Stack.of(this).region }
    }));
  }
}