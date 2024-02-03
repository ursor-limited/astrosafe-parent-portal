import { PediaAge } from "./p/[urlId]/PediaPageContents";

const BACKEND_URLS = {
  development: "http://localhost:8081",
  staging:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/dev/safeplay-backend",
  production:
    "https://tse16z5923.execute-api.eu-west-1.amazonaws.com/dev/safeplay-backend", //"https://xdt8565hsf.execute-api.eu-west-1.amazonaws.com/prod/api",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

export const dynamic = "force-dynamic";

const get = (route: string, query?: Record<string, string>) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NODE_ENV]}/${route}${
      query ? `?${new URLSearchParams(query)}` : ""
    }`,
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
      cache: "no-store",
    }
  );

const post = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NODE_ENV]}/${route}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

class ApiController {
  static async getCollectionArticles(collectionId: string) {
    //@ts-ignore
    return get(`pedia/collection/${collectionId}/articles`).then(
      (response: any) => response.json()
    );
  }
  static async getArticleAndCollection(
    articleId: string,
    collectionId: string
  ) {
    //@ts-ignore
    return get(
      `pedia/article/${articleId}`,
      collectionId ? { collectionId } : undefined
    ).then((response: any) => response.json());
  }
  static async getAllArticles(authorId?: string) {
    //@ts-ignore
    return get(`pedia/allArticles`, authorId ? { authorId } : undefined).then(
      (response: any) => response.json()
    );
  }
  static async getAllCollections(authorId?: string) {
    //@ts-ignore
    return get(
      `pedia/allCollections`,
      authorId ? { authorId } : undefined
    ).then((response: any) => response.json());
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
  static async createArticle(title: string) {
    //@ts-ignore
    return post("pedia/article", { title }).then((response: any) =>
      response.json()
    );
  }
  static async createCollection(articleTitles: string[], authorId: string) {
    //@ts-ignore
    return post("pedia/collection", { articleTitles, authorId }).then(
      (response: any) => response.json()
    );
  }
  static async createCollectionArticles(id: string) {
    //@ts-ignore
    return post(`pedia/collection/createArticles`, { id }).then(
      (response: any) => response.json()
    );
  }
  static async regenerateTextBlock(textBlockId: string) {
    //@ts-ignore
    return post("pedia/regenerate/textBlock", { textBlockId }).then((response: any) =>
      response.json()
    );
  }
  static async regenerateMainImage(articleId: string) {
    //@ts-ignore
    return post("pedia/regenerate/mainImage", { articleId }).then((response: any) =>
      response.json()
    );
  }
  static async updateArticle(articleId: string, details: any) {
    //@ts-ignore
    return patch(`pedia/article/${articleId}`, details).then((response: any) =>
      response.json()
    );
  }
}

export default ApiController;
