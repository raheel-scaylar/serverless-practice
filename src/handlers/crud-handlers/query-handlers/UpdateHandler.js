const itemsClient = require("../client/CrudClient");

module.exports.putItem = async (event) => {
  try {
    return itemsClient.UpdateItem(event);
  } catch (error) {}
};
