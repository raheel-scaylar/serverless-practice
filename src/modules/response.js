const response = (status = 200, body = {}) => {
  return {
    statusCode : status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
};

export default response;
