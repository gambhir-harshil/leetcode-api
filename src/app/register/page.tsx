"use client";
import Link from "next/link";
import React, { useState } from "react";
type Props = {};

const Register = (props: Props) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  
  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(inputs);
    const res = await fetch("/api/auth/register", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(inputs),
    });
    const resJson = await res.json();
    console.log(resJson);
  };

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="auth bg-registerSpace">
      <div className="auth__backdrop">
        <div className="auth__container ">
          <h1 className="auth__heading ">Let&apos;s start the grind!</h1>
          <form
            action="submit"
            className="register__form flex flex-col mt-4 gap-4"
          >
            <input
              className="auth__input"
              type="text"
              placeholder="Leetcode Username"
              name="username"
              onChange={handleChange}
            />
            <input
              className="auth__input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="auth__input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              className="auth__input"
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirm"
              onChange={handleChange}
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
            <button onClick={submitHandler} className="auth__btn">
              Register
            </button>
          </form>
        </div>
        <p className="text-white text-center">
          Already a member?{" "}
          <Link href={"/login"} className="text-[#2972FF] font-[500]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
