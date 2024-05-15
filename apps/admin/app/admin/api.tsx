
const BACKEND_URLS = {
  development: "http://localhost:8081",
  preview:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend",
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
      cache: "no-store",
    }
  );

const patch = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

const dellete = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "DELETE",
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
 
  static async listAllUsers() {
    return post(`video/listUsers`, {}).then((response: any) =>
      response.json()
    );
  }

  static async getUserLessons(id: string) {
    //@ts-ignore
    return get(`lesson/user/${id}`).then((response: any) => response.json());
  }

  static async getTotalVideoCounts() {
    return post(`video/getTotalVideoCounts`, {}).then((response: any) =>
      response.json()
    );
  }

  static async getVideoCreatedAtDict() {
    return post(`video/getCreatedAtDict`, {}).then((response: any) =>
      response.json()
    );
  }


  static async getTotalLessonCounts() {
    return post(`lesson/getTotalLessonCounts`, {}).then((response: any) =>
      response.json()
    );
  };
  
  static async getLessonCreatedAtDict() {
    return post(`lesson/getCreatedAtDict`, {}).then((response: any) =>
      response.json()
    );
  }


  
  
}

export default ApiController;
