import { IQuiz, QuizQuestionType } from "./components/QuizDialog";
import {
  EquationOrientation,
  INumberBondWorksheetSettings,
  WorksheetTopic,
} from "./components/WorksheetGenerator";
import { AstroLessonContent } from "./lesson/[subdirectory]/LessonPageContents";

export interface IVideo {
  id: string;
  creatorId: string;
  url: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  startTime?: number;
  endTime?: number;
  comments: IVideoComment[];
  createdAt: string;
  updatedAt: string;
}

export interface IVideoComment {
  id: string;
  value: string;
  time: number;
}

const BACKEND_URLS = {
  development: "http://localhost:8081",
  preview:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/dev-safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/prod/safeplay-backend",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`
  );

const post = (route: string, body?: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
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
  static async createLesson(details: any) {
    return post("lesson", details).then((response: any) => response.json());
  }
  static async updateLesson(id: string, details: any) {
    return patch(`lesson/${id}`, details).then((response: any) =>
      response.json()
    );
  }
  static async updateLessonUrl(id: string, newUrl: string) {
    return patch(`lesson/updateLessonUrl/${id}`, { newUrl }).then(
      (response: any) => response.json()
    );
  }
  static async deleteLesson(id: string) {
    return dellete(`lesson/${id}`);
  }
  static async duplicateLesson(id: any, userId: string) {
    return post("lesson/dupli/cate", { id, userId }).then((response: any) =>
      response.json()
    );
  }
  static async getLesson(id: string) {
    return get(`lesson/${id}`).then((response: any) => response.json());
  }
  static async getFeaturedLessons() {
    return get(`lesson/feat/ured`).then((response: any) => response.json());
  }
  static async getLessonWithContents(id: string) {
    return get(`lesson/${id}/withContents`).then((response: any) =>
      response.json()
    );
  }
  static async getLessonFromUrl(url: string) {
    return post(`lesson/from/url`, { url }).then((response: any) =>
      response.json()
    );
  }

  static async getLessonFromUrlWithContents(url: string) {
    return post(`lesson/getLessonFromUrlWithContents`, { url }).then(
      (response: any) => response.json()
    );
  }

  static async getUserLessons(id: string) {
    //@ts-ignore
    return get(`lesson/user/${id}`).then((response: any) => response.json());
  }
  static async addToLesson(
    id: string,
    index: number,
    type: AstroLessonContent,
    contentId: string
  ) {
    return post(`lesson/add`, { id, index, type, contentId }).then(
      (response: any) => response.json()
    );
  }
  static async createVideo(details: any) {
    return post("video", details).then((response: any) => response.json());
  }
  static async getVideoDetails(id: string) {
    //@ts-ignore
    return get(`video/${id}`).then((response: any) => response.json());
  }
  static async createUser(auth0Id: string) {
    //@ts-ignore
    return post("video/user", { auth0Id }).then((response: any) =>
      response.json()
    );
  }
  static async getUser(auth0Id: string, auth0UserId: string) {
    //@ts-ignore
    return post(`video/getUser`, { auth0Id, auth0UserId }).then(
      (response: any) => response.json()
    );
  }
  static async getUserById(id: string) {
    //@ts-ignore
    return get(`video/getUserById/${id}`).then((response: any) =>
      response.json()
    );
  }
  static async getUserImages(id: string) {
    //@ts-ignore
    return get(`image/user/${id}`).then((response: any) => response.json());
  }
  static async getUserTexts(id: string) {
    //@ts-ignore
    return get(`text/user/${id}`).then((response: any) => response.json());
  }
  static async getUserLinks(id: string) {
    //@ts-ignore
    return get(`link/user/${id}`).then((response: any) => response.json());
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
  static async deleteVideo(id: string) {
    return dellete(`video/${id}`).then((response: any) => response);
  }
  static async deleteWorksheet(id: string) {
    return dellete(`canvas/worksheet/${id}`).then((response: any) => response);
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
  static async claimWorksheets(userId: string, ids: string[]) {
    return patch(`canvas/userWorksheets/${userId}/claim`, {
      ids,
    }).then((response: any) => response.json());
  }
  // static async getPaymentLink(email: string) {
  //   return get(`video/user/${email}/getPaymentLink`).then((response: any) =>
  //     response.json()
  //   );
  // }
  static async claimCheckoutSessionId(
    checkoutSessionId: string,
    userId: string
  ) {
    return post(`video/claimCheckoutSessionId`, {
      userId,
      checkoutSessionId,
    }).then((response: any) => {
      console.log(response);
      response.json();
    });
  }
  static async getS3ImageUploadParams(
    fileExtension: string,
    contentType: string
  ) {
    return post(`unsplash/sign`, {
      fileExtension,
      contentType,
    }).then((response: any) => response.json());
  }

  static async uploadToS3(signedUrl: string, uploadFile: any) {
    return fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": uploadFile.type },
      body: uploadFile,
    }).then((response: any) => response);
  }

  static async searchImages(query: string) {
    return post("unsplash/search", {
      query,
      count: 10,
    }).then((response: any) => response.json());
  }

  static async createEquationWorksheet(
    title: string,
    orientation: EquationOrientation,
    topic: WorksheetTopic,
    max: number,
    random: boolean,
    values: [number, number][],
    factor?: number,
    description?: string,
    creatorId?: string
  ) {
    return post("canvas/worksheet/equation", {
      title,
      description,
      creatorId,
      values,
      settings: {
        orientation,
        topic,
        factor,
        max,
        random,
      },
    }).then((response: any) => response.json());
  }
  static async updateEquationWorksheet(
    id: string,
    title: string,
    orientation: EquationOrientation,
    topic: WorksheetTopic,
    max: number,
    random: boolean,
    values: [number, number][],
    factor?: number,
    description?: string
  ) {
    return patch(`canvas/worksheet/equation/${id}`, {
      title,
      description,
      values,
      settings: {
        orientation,
        topic,
        factor,
        max,
        random,
      },
    }).then((response: any) => response.json());
  }
  static async createNumberBondWorksheet(
    title: string,
    orientation: EquationOrientation,
    sum: number,
    empty: INumberBondWorksheetSettings["empty"],
    values: number[],
    description?: string,
    creatorId?: string
  ) {
    return post("canvas/worksheet/numberBond", {
      title,
      description,
      creatorId,
      values,
      settings: { orientation, sum, empty },
    }).then((response: any) => response.json());
  }
  static async updateNumberBondWorksheet(
    id: string,
    title: string,
    orientation: EquationOrientation,
    sum: number,
    empty: INumberBondWorksheetSettings["empty"],
    values: number[],
    description?: string,
    creatorId?: string
  ) {
    return patch(`canvas/worksheet/numberBond/${id}`, {
      title,
      description,
      creatorId,
      values,
      settings: { orientation, sum, empty },
    }).then((response: any) => response.json());
  }
  static async getWorksheet(id: string) {
    return get(`canvas/worksheet/${id}`).then((response: any) =>
      response.json()
    );
  }
  static async getUserWorksheets(id: string) {
    //@ts-ignore
    return get(`canvas/userWorksheets/${id}`).then((response: any) =>
      response.json()
    );
  }
  // static async submitFreeTrialStartDate(id: string) {
  //   return get(`canvas/startFreeTrial/${id}`).then((response: any) =>
  //     response.json()
  //   );
  // }
  static async isBlocked(url: any) {
    return post("link/isBlocked", { url })
      .then((response: any) => response.json())
      .catch((error) => {
        console.log(error.status);
        if (error.status === 405) {
          return true;
        }
      });
  }
  static async getURLImagePreview(url: any) {
    return post("link/URLImagePreview", { url }).then(
      (response: any) => response?.json()
    );
  }
  static async createLink(details: any) {
    return post("link", details).then((response: any) => response.json());
  }
  static async deleteLink(id: string) {
    return dellete(`link/${id}`);
  }
  static async updateLink(id: string, details: any) {
    return patch(`link/${id}`, details).then((response: any) =>
      response.json()
    );
  }
  static async clearPediodCreations(id: string) {
    return get(`video/clearPediodCreations/${id}`).then((response: any) =>
      response.json()
    );
  }
  static async createImage(details: any) {
    return post("image", details).then((response: any) => response.json());
  }
  static async deleteImage(id: string) {
    return dellete(`image/${id}`).then((response: any) => response);
  }
  static async updateImage(id: string, details: any) {
    return patch(`image/${id}`, details).then((response: any) =>
      response.json()
    );
  }
  static async duplicateImage(id: string, lessonId: string, userId?: string) {
    return post(`image/dupli/cate`, { id, lessonId, userId });
  }
  static async duplicateLink(id: string, lessonId: string, userId?: string) {
    return post(`link/dupli/cate`, { id, lessonId, userId });
  }
  static async duplicateVideo(id: string, lessonId: string, userId?: string) {
    return post(`video/dupli/cate`, { id, lessonId, userId });
  }
  static async duplicateWorksheet(
    id: string,
    lessonId: string,
    userId?: string
  ) {
    return post(`canvas/dupli/cate`, { id, lessonId, userId });
  }
  static async duplicateText(id: string, lessonId: string, userId?: string) {
    return post(`text/dupli/cate`, { id, lessonId, userId });
  }
  static async duplicateQuiz(id: string, lessonId: string, userId?: string) {
    return post(`quiz/dupli/cate`, { id, lessonId, userId });
  }
  static async createText(details: any) {
    return post("text", details).then((response: any) => response.json());
  }
  static async updateText(id: string, details: any) {
    return patch(`text/${id}`, details).then((response: any) =>
      response.json()
    );
  }
  static async deleteText(id: string) {
    return dellete(`text/${id}`).then((response: any) => response);
  }
  static async createVideoComment(id: string, time: number, value: string) {
    return post("video/comment/create", { id, value, time }).then(
      (response: any) => response.json()
    );
  }
  static async setExternalDashboardTitle(id: string, title: string) {
    return patch(`video/user/${id}/externalDashboardTitle`, {
      title,
    }).then((response: any) => response.json());
  }
  static async switchOffTutorialVideo(
    userId: string,
    location: "dashboard" | "lesson"
  ) {
    return patch(`video/user/${userId}/switchOffTutorialVideo`, {
      location,
    }).then((response: any) => response.json());
  }
  static async copyAndMoveContent(
    id: string,
    lessonId: string,
    userId: string
  ) {
    return post(`video/copyAnd/moveContent`, {
      id,
      lessonId,
      userId,
    }).then((response: any) => response.json());
  }
  static async createQuiz(
    title: string,
    creatorId: string,
    questions: {
      type: QuizQuestionType;
      value: string;
      options: string[];
      correctOption?: number;
    }[],
    description?: string
  ) {
    return post("quiz", {
      title,
      description,
      creatorId,
      questions,
    }).then((response: any) => response.json());
  }
  static async updateQuiz(id: string, details: any) {
    return patch(`quiz/${id}`, details).then((response: any) =>
      response.json()
    );
  }
  static async deleteQuiz(id: string) {
    return dellete(`quiz/${id}`);
  }
}

export default ApiController;
