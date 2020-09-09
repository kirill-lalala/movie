import { MOVIE_API } from "./../../../API/index";

export const loadData = async (options = {}): Promise<any> => {
  try {
    return MOVIE_API.GET(options);
  } catch (e) {
    throw e;
  }
};
