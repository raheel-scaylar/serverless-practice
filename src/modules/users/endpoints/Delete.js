import dynamoClient from "../../../shared/lib/DynamoClient.js";
import response from "../../response.js";

const table = process.env.DYNAMODB_TABLE || "MyTable";

export const remove = async (event) => {
  const delId = event.pathParameters.id;
  const params = {
    TableName: table,
    Key: {
      id: delId,
    },
  };
  try {
    const dbResponse = await dynamoClient.DeleteItem(params, table);
    console.log(dbResponse);
    return response(200, dbResponse);
  } catch (error) {
    return response(500, error);
  }
};
