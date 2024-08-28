export const noCookiefy = (url: string) =>
  url.replace('youtube.com', 'youtube-nocookie.com');

export const deNoCookiefy = (url: string) => url.replace('-nocookie', '');
