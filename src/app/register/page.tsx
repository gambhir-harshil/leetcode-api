"use client";
import React, { useState } from "react";
import rocket from "../../assets/rocket.png";
import Image from "next/image";

type Props = {};

const Register = (props: Props) => {
  const [username, setUsername] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/user", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const resJson = await res.json();
    console.log(resJson);
  };

  return (
    <div className="auth">
      <div className="auth__backdrop">
        <div className="auth__container ">
          <h1 className="auth__heading ">
            Let's start the grind!
          </h1>
          <form
            action="submit"
            className="register__form flex flex-col mt-4 gap-4"
          >
            <input
              className="auth__input"
              type="text"
              placeholder="Leetcode Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="auth__input"
              type="email"
              placeholder="Email"
            />
            <input
              className="auth__input"
              type="password"
              placeholder="Password"
            />
            <div className="flex gap-2">
              <input
                className="accent-gray-400"
                type="checkbox"
                name="rememberMe"
              />
              <label className="text-gray-200 font-medium" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button
              onClick={submitHandler}
              className="auth__btn"
            >
              Register
            </button>
          </form>
        </div>
        <p className="text-gray-400 text-center">
          Already a member? <span className="text-blue-700 font-bold">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
