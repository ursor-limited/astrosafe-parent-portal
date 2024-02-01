export interface IVideo {
  id: string;
  creatorId: string;
  url: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  startTime?: number;
  endTime?: number;
  createdAt: string;
}

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

const post = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NODE_ENV]}/${route}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

const patch = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NODE_ENV]}/${route}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    }
  );

// const api = axios.create({
//   //@ts-ignore
//   baseURL: BACKEND_URLS[process.env.REACT_APP_BUILD_ENV],
// });

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     Sentry.captureException(error);
//     throw error;
//   }
// );

// axiosRetry(api, {
//   retries: 3, // number of retries
//   retryDelay: (retryCount: number) => {
//     console.log(`retry attempt: ${retryCount}`);
//     return retryCount * 2000; // time interval between retries
//   },
// });

class ApiController {
  static async createVideo(details: any) {
    return post("video", details).then((response: any) => response.json());
  }
  static async getVideoDetails(id: string) {
    //@ts-ignore
    return get(`video/${id}`).then((response: any) => response.json());
    //return api.get(`/video/${id}`).then((response: any) => response.data);
  }
  static async getUserVideos(id: string) {
    //@ts-ignore
    return get(`video/user/${id}`).then((response: any) => response.json());
    //return api.get(`/video/${id}`).then((response: any) => response.data);
  }
  static async updateVideo(id: string, details: Partial<IVideo>) {
    return patch(`video/${id}`, details).then((response: any) =>
      response.json()
    );
    //return api.get(`/video/${id}`).then((response: any) => response.data);
  }

  static async getYoutubeVideoDetails(id: string) {
    return get(`video/youtubeVideoDetails/${id}/description`).then(
      (response: any) => response.json()
    );
  }
  // static async updateVideo(id: string, details: Partial<IVideo>) {
  //   return api
  //     .patch(`/video/${id}`, details)
  //     .then((response: any) => response.data);
  // }
}

export default ApiController;
