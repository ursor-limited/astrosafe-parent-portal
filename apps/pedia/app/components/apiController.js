import axios from "axios";
import axiosRetry from "axios-retry";

const BACKEND_URLS = {
  development: "http://localhost:8081",
  staging:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/dev/safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend", //"https://xdt8565hsf.execute-api.eu-west-1.amazonaws.com/prod/api",
};

const api = axios.create({
  baseURL: BACKEND_URLS[process.env.REACT_APP_BUILD_ENV],
});

axiosRetry(api, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  // // this should automatically not retry POST, and only retry if necessary
  // retryCondition: (error) => {
  //     // if retry condition is not specified, by default idempotent requests are retried
  //     // [408, 500, 502, 503, 504, 522, 524]
  //     return error.response.status === 503;
  // },
});

api.interceptors.request.use(function (config) {
  return new Promise((resolve) => {
    config.headers.Email = window.localStorage
      .getItem("email")
      ?.replaceAll('"', "");
    config.headers.Authorization = `Bearer ${window.localStorage
      .getItem("accessToken")
      ?.replaceAll('"', "")}`; // get rid of the enclosing quotation marks
    resolve(config);
  });
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    // if not  network error or
    // Request aborted
    //Sentry.captureException(error);
    throw error;
  }
);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ApiController {
  static async getPage(id) {
    const response = await api.get(`/pedia/${id}`);
    return response.data;
  }
  static async getCollectionPage(id) {
    const response = await api.get(`/pedia/collection/${id}`);
    return response.data;
  }
}

export default ApiController;