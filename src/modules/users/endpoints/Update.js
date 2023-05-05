import dynamoClient from "../../../shared/lib/DynamoClient.js";
import response from "../../response.js";

const table = process.env.DYNAMODB_TABLE || "MyTable";

export const update = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const attributes = {};
    const params = {
      TableName: "",
      Key: { id: "" },
      AttributeUpdates: "",
      ReturnValues: "",
    };

    if (data.fname) {
      attributes.fname = {
        Action: "PUT",
        Value: data.fname,
      };
    }
    if (data.age) {
      attributes.age = {
        Action: "PUT",
        Value: data.age,
      };
    }
    if (data.gender) {
      attributes.gender = {
        Action: "PUT",
        Value: data.gender,
      };
    }

    params.AttributeUpdates = { ...attributes };
    params.Key.id = event.pathParameters.id;
    params.ReturnValues = "UPDATED_NEW";
    params.TableName = table;

    const dbResponse = await dynamoClient.UpdateItem(params, table);
    return response(200, dbResponse);
  } catch (error) {
    return response(500, error);
  }
};
