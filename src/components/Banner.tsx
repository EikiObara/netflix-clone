import { useEffect, useState } from "react";

import requests from "../utils/request";
import axios from "../utils/axios";

import "./Banner.scss";
import Nav from "./Nav";

type movieProps = {
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
};

const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.feachNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  function truncate(str: any, n: number) {
    if(str !== undefined){
      return str.length > n ? str?.substr(0, n - 1) + "..." : str;
    }
  }

  const base_url = process.env.REACT_APP_TMDB_URL;

  const banner_url = base_url && movie?.backdrop_path ? base_url + movie?.backdrop_path : null;

  if(banner_url){
    return (
      <>
      <Nav />
      <header
        className="Banner"
        style={{
          backgroundSize: "contain",
          backgroundImage: `url("${banner_url}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="Banner-contents">
          <h1 className="Banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="Banner-buttons">
            <button className="Banner-button">Play</button>
            <button className="Banner-button">My List</button>
          </div>
          <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="Banner-fadeBottom" />
      </header>
      </>
    )
  }else{
    return(
      <>
      Loading ...
      </>
    )
  }
};


export default Banner;