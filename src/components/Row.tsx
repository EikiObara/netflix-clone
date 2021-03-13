import { useEffect, useState } from "react";

import axios from "../utils/axios";

import "./Row.scss";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

interface Movie {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results.filter((v: Movie, _: any) => v.backdrop_path));
    }
    fetchData();
  }, [fetchUrl]);

  const base_url = process.env.REACT_APP_TMDB_URL;

  if(movies.length > 0){
    return (
      <div className="Row">
        <h2>{title}</h2>
        <div className="Row-posters">
          {movies.map((movie, i) => (
            <img
              key={movie.id}
              className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
      </div>
    )
  }else{
    return(
      <div></div>
    )
  }
}

export default Row;
