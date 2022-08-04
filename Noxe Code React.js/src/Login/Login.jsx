import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { post } from "jquery";

export default function Login() {
  const navigate = useNavigate();

  const [userData, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginMessage, setMessage] = useState("");
  function getData(eve) {
    let myData = { ...userData };
    myData[eve.target.id] = eve.target.value;
    setUser(myData);
  }

  function navigatetoHome() {
    navigate("/");
  }

  async function sendUser(eve) {
    eve.preventDefault();
    let responce = await axios.post(
      "https://route-egypt-api.herokuapp.com/signin",
      userData
    );
    let loginInfo = responce.data.message;
    setMessage(loginInfo);
    if (loginInfo === "success") {
      localStorage.setItem("user", responce.data.token);
      navigatetoHome();
    }
    console.log(responce);
  }

  return (
    <>
      <div className="container mt-5">
        <h2 className="my-3">Login Form</h2>
        <form type="submit" className="w-100" action="">
          <label className="my-2" htmlFor="">
            email:
          </label>
          <input
            id="email"
            onChange={(eve) => {
              getData(eve);
            }}
            className="form-control w-100"
            type="email"
          />
          <label className="my-2" htmlFor="">
            Password:
          </label>
          <input
            id="password"
            onChange={(eve) => {
              getData(eve);
            }}
            className="form-control w-100"
            type="password"
          />
          <p
            className={loginMessage === "success" ? "text-info" : "text-danger"}
          >
            {loginMessage}
          </p>
          <div className="mt-3">
            <Link
              to={"/register"}
              className="text-decoration-none text-white"
              href="#"
            >
              don't have account? register
            </Link>
            <button
              onClick={(eve) => {
                sendUser(eve);
              }}
              className="btn btn-info float-end text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
