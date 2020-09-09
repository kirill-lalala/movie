export interface Genre {
  id: number;
  name: string;
}

export const getGenres = (): Array<Genre> =>
  JSON.parse(localStorage.getItem("genres") as string);
