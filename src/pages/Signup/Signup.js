import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Signup.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { userSchema } from "../../Validation/UserValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const [error, setError] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      reset({
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
      toast.success("Account was successfuly created");
    } catch (e) {
      setError(e.message);
      toast.error("Register failed. Please try again.");
    }
  };

  // console.log(errors);

  return (
    <div className={styles.signupPage}>
      <img src={logo} alt="logo" />
      <div className={styles.signup}>
        <p className={styles.headingL}>Sign Up</p>
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
          <Input
            placeholder="Confirm password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />
          <Button text="Create an account" />
        </form>
        <p className={styles.bodyM}>
          Don’t have an account?
          <span>
            <Link to="/login"> Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
