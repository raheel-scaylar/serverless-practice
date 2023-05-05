import dynamoClient from "../../../shared/lib/DynamoClient.js";
import response from "../../response.js";

const table = process.env.DYNAMODB_TABLE || "MyTable";

export const read = async (event) => {
  try {
    const dbResponse = await dynamoClient.ReadItems({}, table);
    return response(200, dbResponse.Items);
  } catch (error) {
    return response(500, error);
  }
};
