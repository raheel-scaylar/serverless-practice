import dynamoClient from "../../../shared/lib/DynamoClient.js";
import response from "../../response.js";
import { uuid } from "uuidv4";

const table = process.env.DYNAMODB_TABLE || "MyTable";

export const create = async (event) => {
  try {
    const itemData = JSON.parse(event.body);
    const params = {
      TableName: table,
      Item: {
        id: uuid(),
        ...itemData,
      },
    };
    const dbResponse = await dynamoClient.CreateItem(params, table);
    return response(200, dbResponse);
  } catch (error) {
    return response(500, error);
  }
};
