const itemsClient = require("../client/CrudClient");

module.exports.postItem = async (event) => {
  try {
    return itemsClient.CreateItem(event);
  } catch (error) {}
};
