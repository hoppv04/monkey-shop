import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import instance from "../apis";
import { useAuth } from "../contexts/AuthContext";
import { UserI } from "../interfaces/User";
import { loginSchema, registerSchema } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const { login: contextLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserI>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const nav = useNavigate();

  const handleSubmitAuth = async (data: UserI) => {
    try {
      if (isLogin) {
        const res = await instance.post("/auth/login", data);
        contextLogin(res.data.accessToken, res.data.user);
      } else {
        const res = await instance.post("auth/register", {
          email: data.email,
          password: data.password,
        });
        alert(res.data.message);
        nav("/login");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "Error!");
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center mt-5">
      <form
        className="w-50 border p-4 rounded shadow-sm"
        onSubmit={handleSubmit(handleSubmitAuth)}
      >
        {isLogin ? (
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <h2 className="m-0">Login</h2>
            <Link className="btn btn-secondary" to={"/register"}>
              Register
            </Link>
          </div>
        ) : (
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <h2 className="m-0">Register</h2>
            <Link className="btn btn-secondary" to={"/login"}>
              Login
            </Link>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors?.email && (
            <p className="text-danger">{errors?.email?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-danger">{errors?.password?.message}</p>
          )}
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="form-control"
              {...register("confirmPass")}
            />
            {errors?.confirmPass && (
              <p className="text-danger">{errors?.confirmPass?.message}</p>
            )}
          </div>
        )}
        <button className="btn btn-primary w-100">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
