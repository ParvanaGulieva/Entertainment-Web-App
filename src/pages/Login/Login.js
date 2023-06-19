import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { loginSchema } from "../../Validation/UserValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [error, setError] = useState("");
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      reset({
        email: "",
        password: "",
      });
      navigate("/");
      toast.success("Login successful!");
    } catch (e) {
      setError(e.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <img src={logo} alt="logo" />
      <div className={styles.login}>
        <p className={styles.headingL}>Login</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Email address"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
          <Button text="Login to your account" />
        </form>
        <p className={styles.bodyM}>
          Don’t have an account?
          <span>
            <Link to="/signup"> Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
