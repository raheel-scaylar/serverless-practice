const { TableName, dynamoClient } =
  require("../dynamo-document-client/DynamoDocumentClient")();
module.exports = class CrudClient {
  static CreateItem = async (context) => {
    const recievedItem = JSON.parse(context.body);
    const params = {
      TableName,
      Item: recievedItem,
    };
    await dynamoClient.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: "Data inserted successfully",
      }),
    };
  };
  static ReadItem = async (context) => {
    const dbResponse = await dynamoClient.scan({ TableName }).promise();
    const items = dbResponse.Items;
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: items,
      }),
    };
  };
  static UpdateItem = async (context) => {
    const paramId = JSON.parse(context.pathParameters.id);
    const updateValue = JSON.parse(context.body).fname;

    const params = {
      TableName: "MyTable",
      Key: { id: `${paramId}` },
      ExpressionAttributeValues: { ":val": updateValue },
      UpdateExpression: "set fname = :val",
    };

    await dynamoClient.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: "Item updated successfully",
      }),
    };
  };
  static DeleteItem = async (context) => {
    const paramId = JSON.parse(context.pathParameters.id);
    const params = { TableName: "MyTable", Key: { id: `${paramId}` } };
    await dynamoClient.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: "Item deleted successfully",
      }),
    };
  };
};
