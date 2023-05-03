const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  accessKeyId: "access_id",
  secretAccessKey: "access_key",
  apiVersion: "v0.0.1",
});

const TableName = "MyTable";

const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.hello = async (event) => {
  try {
    // Get request
    if (event.httpMethod == "GET") {
      const dbResponse = await dynamo.scan({ TableName }).promise();
      const items = dbResponse.Items;
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: items,
        }),
      };
      // Post request
    } else if (event.httpMethod == "POST") {
      const recievedItem = JSON.parse(event.body);
      const params = {
        TableName,
        Item: recievedItem,
      };
      await dynamo.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: "Data inserted successfully",
        }),
      };

      // Put request
    } else if (event.httpMethod == "PUT") {
      const paramId = JSON.parse(event.pathParameters.id);
      const updateValue = JSON.parse(event.body).fname;

      const params = {
        TableName: "MyTable",
        Key: { id: `${paramId}` },
        ExpressionAttributeValues: { ":val": updateValue },
        UpdateExpression: "set fname = :val",
      };

      await dynamo.update(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: "Item updated successfully",
        }),
      };
      // Delete request
    } else if (event.httpMethod == "DELETE") {
      const paramId = JSON.parse(event.pathParameters.id);
      const params = { TableName: "MyTable", Key: { id: `${paramId}` } };
      await dynamo.delete(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: "Item deleted successfully",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: error,
      }),
    };
  }
};
