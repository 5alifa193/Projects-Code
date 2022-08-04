import axios from "axios";
import React, { useEffect, useState } from "react";
import home from "./home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  let page = "1";

  const [movies, setMovies] = useState([]);
  const [rate, setRate] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [rate2, setRate2] = useState([]);
  const [person, setPerson] = useState([]);


  const [loading , setLoading] = useState(true);
  // const imgPath = 'https://image.tmdb.org/t/p/original';

  // This API Responce is for the Movies
  async function getMovies() {

    let responce = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=77cd5b8f1921dcb43b3f798d9670e6de&page=${page}`
    );

    if(responce.status===200){
      setLoading(false);
    }

    let myArray = responce.data.results;

    //  to make rate fixed
    let rateArray = [];
    for (let i = 0; i < myArray.length; i++) {
      const element = myArray[i].vote_average;
      let rate = element.toFixed(1);
      rateArray.push(rate);
    }
    myArray.splice(10, 20);
    setMovies(myArray);
    setRate(rateArray);
  }

  // This Responce is for the TV Shows

  async function getTV() {
    let responceTV = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=77cd5b8f1921dcb43b3f798d9670e6de&page=${page}`
    );
    let myArrayTV = responceTV.data.results;

    //  to make rate fixed
    let rateArray = [];
    for (let i = 0; i < myArrayTV.length; i++) {
      const element = myArrayTV[i].vote_average;
      let rate = element.toFixed(1);
      rateArray.push(rate);
    }
    myArrayTV.splice(10, 20);
    setMovies2(myArrayTV);
    setRate2(rateArray);
  }
  // This Responce for Trending People
  async function getPerson() {
    let responcePerson = await axios.get(
      `https://api.themoviedb.org/3/trending/person/day?api_key=77cd5b8f1921dcb43b3f798d9670e6de&page=${page}`
    );
    let myArrayPerson = responcePerson.data.results;

    myArrayPerson.splice(10, 20);
    setPerson(myArrayPerson);
  }

  function rateColor(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  useEffect(() => {
    getMovies();
    getTV();
    getPerson();


  }, []);

  // function singleMovie(eve){
  //   console.log(eve.target.attributes.id.value)
  // }

  return (
    <>
      {/* Trending Movies to Watch Now */}
      {/* <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fs-1"></i>
      </div> */}
      {loading?<div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fs-1"></i>
      </div>:<div className="container py-5">
        <div className="row">
          <div className="col-md-4 position-relative d-flex flex-column justify-content-center">
            <h3 className={home.line}>
              Trending <br /> Movies <br /> to Watch Now
            </h3>
            <p className="text-secondary">Most watched movies by days</p>
            <hr className="" />
          </div>
          {movies.map((movie, i) => {
            return (
              <div key={i} className="col-md-2">
                <div className="position-relative movie-width overflow-hidden singleMovie">
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div
                    className={`position-absolute top-0 end-0 p-2 rate ${rateColor(
                      movie.vote_average
                    )}`}
                  >
                    {rate[i]}
                  </div>
                  <Link
                    to={`/singlemovie/${movie.id}`}
                    id={movie.id}
                    className="position-absolute p-3 description-bg text-decoration-none text-white"
                  >
                    {movie.overview}
                  </Link>
                </div>
                <p>{movie.title}</p>
              </div>
            );
          })}
        </div>
      </div>}

      {/* Trending TV Show To Watch */}
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 position-relative d-flex flex-column justify-content-center">
            <h3 className={home.line}>
              Trending <br /> TV-Shows <br /> to Watch Now
            </h3>
            <p className="text-secondary">Most watched TV-Shows by days</p>
            <hr className="" />
          </div>
          {movies2.map((movie, i) => {
            return (
              <div key={i} className="col-md-2">
                <div className="position-relative movie-width overflow-hidden singleMovie">
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.name}
                  />
                  <div
                    className={`position-absolute top-0 end-0 p-2 rate ${rateColor(
                      movie.vote_average
                    )}`}
                  >
                    {rate2[i]}
                  </div>
                  <Link
                    to={`/singletvshow/${movie.id}`}
                    id={movie.id}
                    className="position-absolute p-3 description-bg text-decoration-none text-white"
                  >
                    {movie.overview}
                  </Link>
                </div>
                <p>{movie.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending People ....  */}
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 position-relative d-flex flex-column justify-content-center">
            <h3 className={home.line}>
              Trending <br /> People <br />
            </h3>
            <p className="text-secondary">Daily Trending Actor and actress</p>
            <hr className="" />
          </div>
          {person.map((person, i) => {
            return (
              <div key={i} className="col-md-2">
                <div className="position-relative movie-width overflow-hidden singleMovie">
                  <img
                    className="w-100"
                    src={
                      person.profile_path !== null
                        ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                        : "https://ih1.redbubble.net/image.1027712254.9762/fposter,small,wall_texture,product,750x1000.u2.jpg"
                    }
                    alt={person.profile_path}
                  />
                  {/* <div  onClick={(eve)=>{singleMovie(eve)}} className='position-absolute p-3 description-bg text-decoration-none text-white'>
          {person.overview}
        </div> */}
                </div>
                <p>{person.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
