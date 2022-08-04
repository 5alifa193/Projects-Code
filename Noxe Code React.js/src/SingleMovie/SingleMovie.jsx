import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SingleMovie() {
  let movieID = useParams().movieID;

  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  async function getMovie() {
    let responce = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=77cd5b8f1921dcb43b3f798d9670e6de&language=en-US`
    );
    setMovie(responce.data);
    setGenres(responce.data.genres);
  }

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="container">
            <img
              className="w-100 singleMovie"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="hero"
            />
          </div>
        </div>
        <div className="col-md-8 g-5">
          <h3>{movie.title}</h3>
          <h4 className="mt-3">{movie.tagline}</h4>
          <div className="container">
            <div className="mt-3">
              {genres.map((gener, i) => {
                return (
                  <button key={i} className="btn btn-info text-white me-2">
                    {gener.name}
                  </button>
                );
              })}
            </div>
            <div className="mt-3">
              <p>
                <span className="text-info">Vote:</span> {movie.vote_average}/10
              </p>
              <p>
                <span className="text-info">Vote Count:</span>{" "}
                {movie.vote_count}
              </p>
              <p>
                <span className="text-info">Popularity:</span>{" "}
                {movie.popularity}
              </p>
              <p>
                <span className="text-info">Release date:</span>{" "}
                {movie.release_date}
              </p>
            </div>
            <div>
              <p>
                <span className="text-info">Description:</span> {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
