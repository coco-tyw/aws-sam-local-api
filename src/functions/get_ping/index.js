exports.handler = (event, context, callback) => {
  const result = {
    status: 200,
    message: 'OK!!!!!'
  };

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(result)
  });
};