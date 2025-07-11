import { PostgresEngineVersion } from "aws-cdk-lib/aws-rds";
import { InstanceClass, InstanceSize } from "aws-cdk-lib/aws-ec2";

export interface Config {
  accountId: string;
  region: string;
  vpcCidr: string;
  remsHosts: string[];
  domainName: string;
  certificateArn: string;
  containerImage: string;
  dbName: string;
  dbUser: string;
  postgresVersion: PostgresEngineVersion;
  dbInstanceSize: InstanceSize;
  dbInstanceClass: InstanceClass;
}

export function getConfig(): Config {
  return {
    accountId: process.env.CDK_ACCOUNT_ID || "000000000000",
    region: process.env.CDK_REGION || "ap-southeast-2",
    vpcCidr: process.env.VPC_CIDR || "192.168.0.0/24",
    remsHosts: (process.env.REMS_HOSTS || "dev-rems.example.org").split(","),
    domainName: process.env.DOMAIN_NAME || "dev-rems.example.org",
    certificateArn:
      process.env.CERTIFICATE_ARN ||
      "arn:aws:acm:region:account:certificate/dev",
    containerImage: process.env.CONTAINER_IMAGE || "cscfi/rems:latest",
    dbName: process.env.DB_NAME || "rems",
    dbUser: process.env.DB_USER || "rems",
    postgresVersion: getPostgresEngineVersion(
      process.env.POSTGRES_VERSION || "17.4"
    ),
    dbInstanceSize: getDBInstanceSize(process.env.DB_INSTANCE_SIZE || "micro"),
    dbInstanceClass: getDBInstanceClass(
      process.env.DB_INSTANCE_CLASS || "burstable3"
    ),
  };
}
  

export function getPostgresEngineVersion(version: string): PostgresEngineVersion {
  switch (version) {
    case "13.20":
      return PostgresEngineVersion.VER_13_20;
    case "14.9":
      return PostgresEngineVersion.VER_14_9;
    case "15.9":
      return PostgresEngineVersion.VER_15_9;
    case "16.8":
      return PostgresEngineVersion.VER_16_8;
    case "17.4":
      return PostgresEngineVersion.VER_17_4;
    default:
      throw new Error(`Unsupported Postgres version: ${version}`);
  }
}

export function getDBInstanceSize(
  size: string
): InstanceSize {
  switch (size.toLowerCase()) {
    case "micro":
      return InstanceSize.MICRO;
    case "small":
      return InstanceSize.SMALL;
    case "medium":
      return InstanceSize.MEDIUM;
    case "large":
      return InstanceSize.LARGE;;
    default:
      throw new Error(`Unsupported Postgres Instance size: ${size}`);
  }
}

export function getDBInstanceClass(cls: string): InstanceClass {
  switch (cls.toLowerCase()) {
    case "burstable2":
      return InstanceClass.BURSTABLE2;
    case "burstable3":
      return InstanceClass.BURSTABLE3;
    case "memory":
      return InstanceClass.MEMORY5;
    default:
      throw new Error(`Unsupported DB instance class: ${cls}`);
  }
}
  
