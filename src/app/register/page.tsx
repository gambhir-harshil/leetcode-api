"use client";
import Link from "next/link";
import RegisterForm from "./registerForm";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="auth bg-registerSpace">
      <div className="auth__backdrop">
        <div className="auth__container ">
          <h1 className="auth__heading ">Let&apos;s start the grind!</h1>
          <RegisterForm />
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
