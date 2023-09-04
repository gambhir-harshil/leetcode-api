"use client";
import React, { useState } from "react";
import "./register.styles.css";
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
    console.log(resJson)
  };

  return (
    <div className="register h-screen bg-black flex flex-col">
      <div className="flex justify-between px-16 pt-4">
        <div className="flex">
          <span className="text-white font-bold text-3xl tracking-[0.5rem]">
            FNTF
          </span>
          <Image src={rocket} alt="rocket" className="h-12 w-12" />
        </div>
        <button className="bg-blue-600 px-8 py-2 text-white text-lg font-semibold rounded-xl">
          Login
        </button>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="register__container flex flex-col gap-4">
          <h1 className="register__heading text-white text-5xl font-semibold text-center">
            Welcome aboard!
          </h1>
          <p className="text-gray-400 text-center font-semibold text-lg">
            Please enter your details.
          </p>
          <form
            action="submit"
            className="register__form flex flex-col mt-4 gap-4"
          >
            <input
              className="register__input"
              type="text"
              placeholder="Username*"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="register__input"
              type="email"
              placeholder="Email*"
            />
            <input
              className="register__input"
              type="password"
              placeholder="Password*"
            />
            <input
              className="register__input"
              type="password"
              placeholder="Confirm password*"
            />
            <div className="flex gap-2">
              <input
                className="accent-gray-400"
                type="checkbox"
                name="rememberMe"
              />
              <label className="text-gray-200 font-medium" htmlFor="rememberMe">
                Would you like to be reminded of the daily problems?
              </label>
            </div>
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
              className="bg-blue-600 py-2 text-white text-lg font-semibold rounded-3xl mt-2"
            >
              Begin your journey!
            </button>
            <p className="text-gray-400 text-center">
              Not your first time? <span className="text-white">Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
