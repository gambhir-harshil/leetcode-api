import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="auth">
      <div className="auth__backdrop">
        <div className="auth__container">
          <h1 className="auth__heading">Welcome back!</h1>
          <form
            action="submit"
            className="register__form flex flex-col mt-4 gap-4"
          >
            <input className="auth__input" type="text" placeholder="Username" />
            <input
              className="auth__input"
              type="password"
              placeholder="Password"
            />
            <div className="flex justify-between">
              <div className="flex gap-2">
                <input
                  className="accent-gray-400"
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
              <span className="text-blue-700">Forgot password?</span>
            </div>
            <button className="auth__btn">Login</button>
          </form>
        </div>
        <p className="text-gray-400 text-center">
          Not a Member? <span className="text-blue-700">Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
