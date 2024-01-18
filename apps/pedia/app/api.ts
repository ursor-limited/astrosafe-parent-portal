const BACKEND_URLS = {
  development: "http://localhost:8081",
  staging:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/dev/safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/dev/safeplay-backend", //"https://xdt8565hsf.execute-api.eu-west-1.amazonaws.com/prod/api",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

export const dynamic = "force-dynamic";

const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NODE_ENV]}/${route}`,
    { cache: "no-store" } // need this in order to show updated pages
  );

const patch = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NODE_ENV]}/${route}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

class ApiController {
  static async getPage(id: string) {
    //@ts-ignore
    return get(`pedia/${id}`).then((response: any) => response.json());
  }
  static async getCollectionPage(id: string) {
    return get(`pedia/collection/${id}`).then((response: any) =>
      response.json()
    );
  }
  static async updateCollectionTitle(id: string, title: string) {
    //@ts-ignore
    return patch(`pedia/collection/${id}/title`, { title }).then(
      (response: any) => response.json()
    );
  }
}

export default ApiController;
