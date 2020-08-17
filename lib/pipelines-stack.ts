import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { SlStack } from './sl-stack';

/**
 * Deployable unit of web service app
 */
export class CdkpipelinesStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new SlStack(this, 'SlStack');

  }
}