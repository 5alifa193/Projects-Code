import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setError] = useState([]);
  const [message, setMsg] = useState("");

  function addUser(eve) {
    let myUser = { ...user };
    myUser[eve.target.id] = eve.target.value;
    setUser(myUser);
  }

  function navigateToLogin() {
    navigate("/login");
  }

  async function sendUser(eve) {
    eve.preventDefault();
    setValidation();
    let myResponce = await axios.post(
      "https://route-egypt-api.herokuapp.com/signup",
      user
    );

    if (setValidation() === true) {
      if (myResponce.data.message === "success") {
        setMsg(myResponce.data.message);
        setError([]);
        navigateToLogin();
      } else if (
        myResponce.data.message ===
        "citizen validation failed: email: email already registered"
      ) {
        setMsg("email already registered");
        setError([]);
      }
    } else {
      setMsg("");
    }
  }
  function setValidation() {
    const valid = Joi.object({
      first_name: Joi.string().min(3).max(15).required(),
      last_name: Joi.string().min(3).max(15).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,18}$")),
    });
    let validation = valid.validate(user, { abortEarly: false });
    if (validation.error !== undefined) {
      setError(validation.error.details);
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <div className="container">
        <h2 className="my-3">Registeration form</h2>
        {errors.map((err, i) => {
          if (err.message.includes("pattern")) {
            err.message = "password must be atleast 3 and max 30 charachters";
          }
          return (
            <p key={i} className="text-danger">
              {err.message}
            </p>
          );
        })}
        <form className="w-100" action="" type="submit">
          <label className="my-2" htmlFor="">
            firstName:
          </label>
          <input
            placeholder="required"
            className="form-control w-100"
            id="first_name"
            type="text"
            onChange={(eve) => {
              addUser(eve);
            }}
          />
          <label className="my-2" htmlFor="">
            lastName:
          </label>
          <input
            placeholder="required"
            className="form-control w-100"
            id="last_name"
            type="text"
            onChange={(eve) => {
              addUser(eve);
            }}
          />
          <label className="my-2" htmlFor="">
            Age:
          </label>
          <input
            placeholder="optional"
            className="form-control w-100"
            type="number"
          />
          <label className="my-2" htmlFor="">
            email:
          </label>
          <input
            placeholder="required"
            className="form-control w-100"
            id="email"
            type="text"
            onChange={(eve) => {
              addUser(eve);
            }}
          />
          <label className="my-2" htmlFor="">
            Password:
          </label>
          <input
            placeholder="required"
            className="form-control w-100"
            id="password"
            type="password"
            onChange={(eve) => {
              addUser(eve);
            }}
          />
          <p className="text-info">{message}</p>
          <div className="d-flex align-items-center justify-content-between">
            <Link
              to={"/login"}
              className="text-decoration-none text-white"
              href="#"
            >
              Have an accoun ? Login
            </Link>
            <button
              onClick={(eve) => {
                sendUser(eve);
              }}
              className="btn btn-info mt-3 float-end text-white"
            >
              register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
