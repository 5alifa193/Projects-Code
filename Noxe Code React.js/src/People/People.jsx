import axios from "axios";
import React, { useEffect, useState } from "react";
import home from "../Home/home.module.css";
import { Link } from "react-router-dom";

export default function People() {
  const [person, setPerson] = useState([]);

  async function getPerson() {
    let responcePerson = await axios.get(
      "https://api.themoviedb.org/3/trending/person/day?api_key=77cd5b8f1921dcb43b3f798d9670e6de"
    );
    let myArrayPerson = responcePerson.data.results;

    setPerson(myArrayPerson);
    console.log(responcePerson.data.results);
  }

  useEffect(() => {
    getPerson();
  }, []);
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 position-relative d-flex flex-column justify-content-center">
            <h3 className={home.line}>
              Trending <br /> People <br />
            </h3>
            <p className="text-secondary">
              The Daily Trending Actor and actress
            </p>
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
