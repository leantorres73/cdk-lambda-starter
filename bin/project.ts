#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { DevPipelineStack } from '../lib/dev-pipeline-stack';
import { TestPipelineStack } from '../lib/test-pipeline-stack';
import { ProdPipelineStack } from '../lib/prod-pipeline-stack';
import { repositoryName } from '../repository';

const app = new cdk.App();

new DevPipelineStack(app, `${repositoryName}-DevPipeline`, {
    env: { account: 'DEV_ACCOUNT', region: 'us-east-2' },
});

new TestPipelineStack(app, `${repositoryName}-TestPipeline`, {
    env: { account: 'DEV_ACCOUNT', region: 'us-east-2' },
});

new ProdPipelineStack(app, `${repositoryName}-ProdPipeline`, {
    env: { account: 'DEV_ACCOUNT', region: 'us-east-2' },
});

app.synth();
