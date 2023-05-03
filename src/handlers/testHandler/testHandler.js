"use strict";

module.exports.testHandlerFunction = async (event) => {
  const response = {
    message: JSON.stringify({
      name: "Raheel",
      age: 21,
      output: event,
    }),
  };
  return response;
};
