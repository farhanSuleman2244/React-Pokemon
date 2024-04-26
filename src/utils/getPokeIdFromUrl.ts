export const getPokeIdFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf("/") - 1);
};
