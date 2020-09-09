const queryString = (params: any): string => {
  const query = Object.keys(params)
    .map((key: string) => key + "=" + params[key])
    .join("&");
  return query && `?${query}`;
};

const BASE_URL = "https://api.themoviedb.org/3/";

const defaultQuery = {
  api_key: "4237669ebd35e8010beee2f55fd45546",
};

export const MOVIE_API = {
  GET: async (query: object = {}) => {
    const queryParams = queryString({ ...defaultQuery, ...query });
    const URL = `${BASE_URL}discover/movie`;

    return await fetch(`${URL}${queryParams}`).then((res) => res.json());
  },
};

export const CONFIGURATION_API = {
  GET: async () => {
    const queryParams = queryString(defaultQuery);
    const URL = `${BASE_URL}configuration`;

    return await fetch(`${URL}${queryParams}`).then((res) => res.json());
  },
};
