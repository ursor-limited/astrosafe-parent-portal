const BACKEND_URLS = {
  development: "http://localhost:8081",
  staging:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/dev/safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend", //"https://xdt8565hsf.execute-api.eu-west-1.amazonaws.com/prod/api",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NODE_ENV]}/${route}`
  );

class ApiController {
  static async getPage(id: string) { //@ts-ignore
    console.log(`${BACKEND_URLS[process.env.NODE_ENV]}/${route}`)
    return get(`pedia/${id}`).then(
      (response: any) => response.json()
    );
  }
  static async getCollectionPage(id: string) {
    return get(`pedia/collection/${id}`).then(
      (response: any) => response.json()
    );
  }
}

export default ApiController;
