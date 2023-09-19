"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../../components/Loader";
import {
  LoginPayloadType,
  RegisterPayloadType,
  useAuth,
} from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const { login } = useAuth();

  const router = useRouter();

  const submitHandler = async (data: LoginPayloadType) => {
    try {
      await login(data);
      router.push('/leaderboard');
    } catch (err) {
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
            onSubmit={handleSubmit(submitHandler)}
            className="register__form flex flex-col mt-4 gap-4"
          >
            <input
              className="auth__input"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            <span className="auth__error">{errors.email?.message}</span>
            <input
              className="auth__input"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <span className="auth__error">{errors.password?.message}</span>
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
            <button type="submit" className="auth__btn">
              Login {isSubmitting && <Loader color="white" size={13} />}
            </button>
          </form>
        </div>
        <p className="text-gray-400 text-center">
          Not a Member?{" "}
          <Link href={"/register"} className="text-[#2972FF] font-[500]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
