const queryString = (params: any): string => {
  const query = Object.keys(params)
    .map((key: string) => key + "=" + params[key])
    .join("&");
  return query && `?${query}`;
};

const defaultQuery = {
  api_key: "4237669ebd35e8010beee2f55fd45546",
  language: "ru-RU",
};

export const MOVIE_API = {
  GET: async (query: object = {}) => {
    const queryParams = queryString({ ...defaultQuery, ...query });
    const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

    return await fetch(`${BASE_URL}${queryParams}`).then((res) => res.json());
  },
};
