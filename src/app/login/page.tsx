"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";

type Props = {};

const Login = (props: Props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const res = await fetch("/api/auth/login", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(inputs),
      });
      const resJson = await res.json();
    } catch(err) {
      console.log(err);
    }
  };
  
  return (
    <div className="auth bg-loginSpace">
      <div className="auth__backdrop">
        <div className="auth__container">
          <h1 className="auth__heading">Welcome back!</h1>
          <form
            action="submit"
            className="register__form flex flex-col mt-4 gap-4"
          >
            <input
              className="auth__input"
              type="text"
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
            <div className="flex justify-between h-12">
              <div className="flex items-end gap-2">
                <input
                  className="accent-gray-400 mb-[5px]"
                  type="checkbox"
                  name="rememberMe"
                />
                <label
                  className="text-gray-200 font-medium"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
              <div className="flex items-top">
                <span className="text-[#2972FF] text-sm">Forgot password?</span>
              </div>
            </div>
            <button onClick={submitHandler} className="auth__btn">Login</button>
          </form>
        </div>
        <p className="text-gray-400 text-center">
          Not a Member? <Link href={'/register'} className="text-[#2972FF] font-[500]">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
