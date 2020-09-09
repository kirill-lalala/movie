import { MOVIE_API, GENRE_API } from "./../../../API/index";

export const loadData = async (options = {}): Promise<any> => {
  try {
    return MOVIE_API.GET(options);
  } catch (e) {
    throw e;
  }
};

export const loadGenres = async () => {
  try {
    if (!localStorage.getItem("genres")) {
      const { genres } = await GENRE_API.GET();
      localStorage.setItem("genres", JSON.stringify(genres));
    }
  } catch (e) {
    throw e;
  }
};
