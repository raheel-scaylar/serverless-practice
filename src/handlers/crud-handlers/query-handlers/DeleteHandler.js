const itemsClient = require("../client/CrudClient");

module.exports.deleteItem = async (event) => {
  try {
    return itemsClient.DeleteItem(event);
  } catch (error) {}
};
