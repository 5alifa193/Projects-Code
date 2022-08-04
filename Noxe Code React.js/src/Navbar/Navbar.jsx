import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Navbar() {
  const [firstName, setFirstName] = useState('');

  const location = useLocation();

function getDetails(){
    let token = localStorage.getItem('user');
    if(token!==null){
      let myFirstName = jwtDecode(token).first_name;
      setFirstName(myFirstName);
    }
}
useEffect(()=>{getDetails()},[]);



  function logOut() {
    localStorage.clear();
  }


  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-transparent shadow-lg">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            Noxe
          </Link>

          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {location.pathname !== "/login" &&
            location.pathname !== "/register" ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <span className="nav-link text-info name-border">
                    {firstName}
                  </span>
                </li>
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/movies/1`} className="nav-link">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/tv-show/1"} className="nav-link">
                    TvShow
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/people"} className="nav-link">
                    People
                  </Link>
                </li>
                {/* <li className='nav-item'>
                        <Link to={'/about'} className='nav-link'>About</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={'/networks'} className='nav-link'>Networks</Link>
                    </li> */}
              </ul>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="me-3">
                {location.pathname !== "/login" &&
                location.pathname !== "/register" ? (
                  <input
                    className="form-control"
                    placeholder="search"
                    type="text"
                  />
                ) : (
                  ""
                )}
              </li>
              <li className="nav-item d-flex align-items-center">
                <a
                  href="https://www.linkedin.com/in/ahmed-khalifa-2a1669246/"
                  target="_blank"
                >
                  <i
                    className="fa-brands fa-linkedin-in mx-2 text-decoration-none text-white"
                    aria-hidden="true"
                  ></i>
                </a>
                <a
                  href="https://github.com/5alifa193"
                  target="_blank"
                >
                  <i className="fa-brands fa-github mx-2 text-decoration-none text-white"></i>
                </a>
                {/* <a href=""><i className="fab fa-youtube mx-2 text-decoration-none text-white"></i></a> */}
              </li>
              {location.pathname !== "/login" &&
              location.pathname !== "/register" ? (
                <div>
                  <li className="nav-item">
                    <Link
                      onClick={() => {
                        logOut();
                      }}
                      to="login"
                      className="nav-link"
                      href="#"
                    >
                      LogOut
                    </Link>
                  </li>
                </div>
              ) : (
                <>
                  <li className="nav-item active">
                    <Link to="login" className="nav-link" href="#">
                      Login <span className="visually-hidden">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="register" className="nav-link" href="#">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
