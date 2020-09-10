import { MOVIE_API, GENRE_API } from "./../../../API/index";

export interface Genre {
  id: number;
  name: string;
}

const loadData = async (options = {}): Promise<any> => {
  try {
    return MOVIE_API.GET(options);
  } catch (e) {
    throw e;
  }
};

export const loadGenres = async () => {
  if (!localStorage.getItem("genres")) {
    const { genres } = await GENRE_API.GET();
    localStorage.setItem("genres", JSON.stringify(genres));
    return genres;
  }
  return JSON.parse(localStorage.getItem("genres") as string);
};

export const loadMoviesData = async (params: object) => {
  return await loadData(params);
};
