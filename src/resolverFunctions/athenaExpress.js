import aws from "aws-sdk";
import { AthenaExpress } from "athena-express";
const awsCredentials = {
    region: "us-east-1",
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSAccessKeyId,
};
aws.config.update(awsCredentials);
const athenaExpressConfig = {
    aws,
    formatJson: true,
    s3: "s3://volstox-results/",
    db: "volstox_db",
    waitForResults: true, // optional
    getStats: true,
    ignoreEmpty: false,
    skipResults: false,
};
const athenaExpress = new AthenaExpress(athenaExpressConfig);

export default athenaExpress;