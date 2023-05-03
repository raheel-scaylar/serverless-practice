module.exports = () => {
  const AWS = require("aws-sdk");
  AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "access_id",
    secretAccessKey: "access_key",
    apiVersion: "v0.0.1",
  });
  const TableName = process.env.DYNAMODB_TABLE || "MyTable";
  const dynamoClient = new AWS.DynamoDB.DocumentClient();
  return { TableName, dynamoClient };
};
