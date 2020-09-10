import React, { FunctionComponent, useCallback } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
// import * as S from "./styles";

type MovieProps = {};

type State = {
  poster_path: string;
  original_title: string;
  overview: string;
  config: any;
};

const getImageSrc = (config: any, path: string) => {
  if (config) {
    const { images } = config;
    const { base_url, poster_sizes } = images;
    return `${base_url}${poster_sizes[4]}${path}`;
  }
  return "";
};

const Movie: FunctionComponent<MovieProps> = () => {
  const history = useHistory();
  const { state } = useLocation<State>();
  const { poster_path, original_title, overview, config } = state;

  const src = getImageSrc(config, poster_path);

  const onButtonClick = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={src} alt={original_title} />
        <div className="card-body">
          <h5 className="card-title">{original_title}</h5>
          {overview && <p className="card-text">{overview}</p>}
          <button className="btn btn-primary" onClick={onButtonClick}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
