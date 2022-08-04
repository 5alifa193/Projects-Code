import axios from "axios";
import React, { useEffect, useState } from "react";
import home from "../Home/home.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function TvShow() {
  let btn = document.querySelectorAll(".number");
  let lastBtn = document.querySelector("#lastBtn");

  const navigate = useNavigate();

  const [movies2, setMovies2] = useState([]);
  const [rate2, setRate2] = useState([]);
  const [loading , setLoading] = useState(true);

  let params = useParams().show;

  async function getTV() {
    let responceTV = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=77cd5b8f1921dcb43b3f798d9670e6de&page=${params}`
    );
    if(responceTV.status===200){
      setLoading(false);
    }
    let myArrayTV = responceTV.data.results;

    //  to make rate fixed
    let rateArray = [];
    for (let i = 0; i < myArrayTV.length; i++) {
      const element = myArrayTV[i].vote_average;
      let rate = element.toFixed(1);
      rateArray.push(rate);
    }
    setMovies2(myArrayTV);
    setRate2(rateArray);
  }

  function next(eve) {
    let page = eve.target.innerHTML;
    params = page;
    navigate(`/tv-show/${page}`);
    setLoading(true);
    getTV();
  }

  function nextPage() {
    for (let i = 0; i < btn.length; i++) {
      if (lastBtn.innerHTML !== "99") {
        btn[i].innerHTML++;
      }
    }
  }
  function prevPage() {
    for (let i = 0; i < btn.length; i++) {
      if (lastBtn.innerHTML !== "5") {
        btn[i].innerHTML--;
      }
    }
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
    getTV();
  }, []);
  return (
    <>
      {loading?<div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fs-1"></i>
      </div>:<div className="container py-5">
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
                    src={
                      movie.poster_path !== null
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "https://ih1.redbubble.net/image.1027712254.9762/fposter,small,wall_texture,product,750x1000.u2.jpg"
                    }
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
      </div>}
      <div className="row col-md-6 m-auto justify-content-center mb-5">
          {/* <button className='btn btn-outline-info col-md-1 me-2'><i className="fa-solid fa-angles-left"></i></button> */}
          <button
            onClick={() => {
              prevPage();
            }}
            className="btn btn-outline-info col-md-1 me-2"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button
            onClick={(eve) => {
              next(eve);
            }}
            id="firstBtn"
            className="number btn btn-outline-info col-md-1 me-2"
          >
            1
          </button>
          <button
            onClick={(eve) => {
              next(eve);
            }}
            className="number btn btn-outline-info col-md-1 me-2"
          >
            2
          </button>
          <button
            onClick={(eve) => {
              next(eve);
            }}
            className="number btn btn-outline-info col-md-1 me-2"
          >
            3
          </button>
          <button
            onClick={(eve) => {
              next(eve);
            }}
            className="number btn btn-outline-info col-md-1 me-2"
          >
            4
          </button>
          <button
            onClick={(eve) => {
              next(eve);
            }}
            id="lastBtn"
            className="number btn btn-outline-info col-md-1 me-2"
          >
            5
          </button>
          <button
            onClick={() => {
              nextPage();
            }}
            id="nextOne"
            className="btn btn-outline-info col-md-1 me-2"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          {/* <button className='btn btn-outline-info col-md-1 me-2'><i className="fa-solid fa-angles-right"></i></button> */}
        </div>
    </>
  );
}
