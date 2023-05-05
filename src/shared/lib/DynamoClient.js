import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  accessKeyId: "access_id",
  secretAccessKey: "access_key",
});

const table = process.env.DYNAMODB_TABLE || "MyTable";
const dynamo = new AWS.DynamoDB.DocumentClient();

const Client = {
  CreateItem: (params, tableName = table) =>
    dynamo.put({ ...params, TableName: tableName }).promise(),
  ReadItems: (params, tableName = table) =>
    dynamo.scan({ TableName: tableName }).promise(),
  UpdateItem: (params, tableName = table) =>
    dynamo.update({ ...params, TableName: tableName }).promise(),
  DeleteItem: (params, tableName = table) =>
    dynamo.delete({ ...params, TableName: tableName }).promise(),
};

export default Client;
