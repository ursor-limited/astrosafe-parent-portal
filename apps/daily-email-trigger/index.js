// Import necessary modules
const axios = require("axios");

const BACKEND_URLS = {
  development: "http://localhost:8081",
  preview:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend",
};

// AWS Lambda handler function
exports.handler = async (event) => {
  // Parse payload from Lambda event
  await axios.post(`${BACKEND_URLS[event.env]}/email/sendDailyEmails`);
  return {
    statusCode: 200,
    // body: JSON.stringify({ error: "Invalid payload" }),
  };

  return {
    statusCode: 400,
    //body: response.body
  };
};
