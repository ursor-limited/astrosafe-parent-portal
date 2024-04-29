// Import necessary modules
const axios = require('axios');

// AWS Lambda handler function
exports.handler = async (event) => {
  // Parse payload from Lambda event
  const payload = JSON.parse(event.body);
  
  if (payload.env === 'dev') {
    console.log("dev env")
    // const devApiResponse = await axios.post('https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend/sendDailyEmails');
  } else if (payload.env === 'prod') {
    console.log("prod env")
    // const prodApiResponse = await axios.post('https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend/sendDailyEmails');
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid payload' })
    };
  }
  
  return {
    statusCode: response.statusCode,
    body: response.body
  };
};
