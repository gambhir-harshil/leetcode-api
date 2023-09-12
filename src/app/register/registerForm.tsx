import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type Props = {};

const RegisterForm = (props: Props) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const submitHandler = async (data: any) => {
    const res = await fetch("/api/auth/register", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });
    
    if (res.ok) {
        reset();
    }
  };

  return (
    <form
      action="submit"
      onSubmit={handleSubmit(submitHandler)}
      className="register__form flex flex-col mt-4 gap-4"
    >
      <div className="auth__group">
        <input
          className="auth__input"
          type="text"
          placeholder="Leetcode Username"
          name="username"
          {...register("username")}
        />
        <span className="auth__error">{errors.username?.message}</span>
      </div>
      <div className="auth__group">
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          {...register("email")}
        />
        <span className="auth__error">{errors.email?.message}</span>
      </div>
      <div className="auth__group">
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          {...register("password")}
        />
        <span className="auth__error">{errors.password?.message}</span>
      </div>
      <div className="auth__group">
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirm"
          {...register("passwordConfirm")}
        />
        <span className="auth__error">{errors.passwordConfirm?.message}</span>
      </div>
      <div className="flex gap-2">
        <input className="accent-gray-400" type="checkbox" name="rememberMe" />
        <label className="text-gray-200 font-medium" htmlFor="rememberMe">
          Remember me
        </label>
      </div>
      <button type="submit" className="auth__btn">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
