#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InfrastructureStack } from "../lib/infrastructure-stack";

const app = new cdk.App();
new InfrastructureStack(app, "dev", {
  stackName: "ai-ticulate-dev",
  keyName: "ai-ticulate.dev",
  env: {
    region: "eu-west-2",
    account: "472333205021",
  },
});
app.synth();
