const itemsClient = require("../client/CrudClient");
module.exports.getItems = async (event) => {
  try {
    return itemsClient.ReadItem();
  } catch (error) {}
};
