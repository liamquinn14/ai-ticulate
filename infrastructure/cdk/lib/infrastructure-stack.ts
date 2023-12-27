import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";

/**
 * ## Properties for the InfrastructureStack.
 * - stackName: the name of the stack
 * - keyName: the name of the keypair to use for the EC2 instance
 */
export interface EnvironmentProps extends cdk.StackProps {
  readonly stackName: string;
  readonly keyName: string;
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EnvironmentProps) {
    super(scope, id, props);

    /**
     * Create a VPC with a single public subnet
     */
    const vpc = new ec2.Vpc(this, `${props.stackName}-vpc`, {
      cidr: "10.0.0.0/16",
      natGateways: 0,
      //make the ec2 instance public
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });
    /**
     * Create a Security Group for the EC2 Instance
     */
    const webserverSG = new ec2.SecurityGroup(
      this,
      `${props.stackName}-webserver-sg`,
      {
        vpc,
        allowAllOutbound: true,
      }
    );
    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "allow SSH access from anywhere"
    );
    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "allow HTTP traffic from anywhere"
    );
    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      "allow HTTPS traffic from anywhere"
    );
    /**
     * Create a Role for the EC2 Instance
     * */
    const webserverRole = new iam.Role(
      this,
      `${props.stackName}-webserver-role`,
      {
        assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3ReadOnlyAccess"),
        ],
      }
    );

    /**
     * Specify the AMI to use for the EC2 Instance
     */
    const webserverImage = new ec2.LookupMachineImage({
      name: "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*",
      owners: ["099720109477"], // Canonical
    });
    /**
     * Create the EC2 Instance
     */
    const webserverInstance = new ec2.Instance(
      this,
      `${props.stackName}-webserver`,
      {
        vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        role: webserverRole,
        securityGroup: webserverSG,
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.BURSTABLE2,
          ec2.InstanceSize.MICRO
        ),
        machineImage: webserverImage,
        keyName: props.keyName,
      }
    );
  }
}
