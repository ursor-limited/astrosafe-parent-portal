import {
  EquationOrientation,
  IWorksheetQuestion,
} from "./worksheet/[id]/Worksheet";

export interface IVideo {
  id: string;
  creatorId: string;
  url: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  startTime?: number;
  endTime?: number;
  createdAt: string;
}

const BACKEND_URLS = {
  development: "http://localhost:8081",
  preview:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`
  );

const post = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

const patch = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
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
    console.log("envvv", process.env.VERCEL_ENV);
    //@ts-ignore
    return get(`video/${id}`).then((response: any) => response.json());
  }
  static async createUser(auth0Id: string) {
    //@ts-ignore
    return post("video/user", { auth0Id }).then((response: any) =>
      response.json()
    );
  }
  static async getUser(auth0Id: string) {
    //@ts-ignore
    return get(`video/user/${auth0Id}`).then((response: any) =>
      response.json()
    );
  }
  static async getUserVideos(id: string) {
    //@ts-ignore
    return get(`video/user/${id}/videos`).then((response: any) =>
      response.json()
    );
  }
  static async getNumberOfUserVideos(id: string) {
    //@ts-ignore
    return get(`video/user/${id}/nVideos`).then((response: any) =>
      response.json()
    );
  }
  static async updateVideo(id: string, details: Partial<IVideo>) {
    return patch(`video/${id}`, details).then((response: any) =>
      response.json()
    );
  }
  static async getYoutubeVideoDetails(id: string) {
    return get(`video/youtubeVideoDetails/${id}/description`).then(
      (response: any) => response.json()
    );
  }
  static async claimVideos(creatorId: string, videoIds: string[]) {
    return post("video/claim", { creatorId, videoIds }).then((response: any) =>
      response.json()
    );
  }
  static async getPaymentLink(auth0Id: string) {
    return get(`video/user/${auth0Id}/getPaymentLink`).then((response: any) =>
      response.json()
    );
  }
  static async getS3ImageUploadParams(
    fileExtension: string,
    contentType: string
  ) {
    return post(`/img/sign`, {
      fileExtension,
      contentType,
    }).then((response: any) => response.json());
  }

  static async uploadToS3(signedUrl: string, uploadFile: any) {
    return fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": uploadFile.type },
      body: uploadFile,
    }).then((response: any) => response.json());
  }
  static async createWorksheet(
    title: string,
    orientation: EquationOrientation,
    number: number,
    multipliers: number[]
  ) {
    return post("canvas/worksheet", {
      title,
      orientation,
      number,
      multipliers,
    }).then((response: any) => response.json());
  }
  static async getWorksheet(id: string) {
    return get(`canvas/worksheet/${id}`).then((response: any) =>
      response.json()
    );
  }
}

export default ApiController;