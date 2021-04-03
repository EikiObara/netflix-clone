import { useEffect, useState } from "react";
import YouTube from "react-youtube";

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

interface Options {
  height: string,
  width: string,
  playerVars: {
    autoplay: 0 | 1 | undefined;
  }
}

const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results.filter((v: Movie, _: any) => v.backdrop_path));
    }
    fetchData();
  }, [fetchUrl]);

  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  }

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
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
        {trailerUrl && <YouTube videoId="alOmUGSUwTI" opts={opts} />}
      </div>
    )
  }else{
    return(
      <></>
    )
  }
}

export default Row;
