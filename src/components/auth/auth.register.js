import "./auth.register.css";
import { React, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { request } from "../query/auth";

function Register() {
  let navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
    watch,
  } = useForm();

  const [message, setMsg] = useState("");
  const [notify, setNotify] = useState("");

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async ({ username, password, email }) => {
    let data = {
      username: username.trim(),
      password: password.trim(),
      email: email.toLowerCase().trim(),
    };

    const res = await request({
      method: "POST",
      URL: "auth/sign-up",
      data: data,
    });

    if (res.status === "success") {
      navigate("/auth/sign-in");
    } else {
      setMsg(res.res_message);
      setNotify("status-fail");
    }
  };
  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="container-body">
        <div className="form-login">
          <div className="form-login--title">
            <h3>REGISTER ACCOUNT</h3>
          </div>
          <div className={notify} id="form-login-message">
            {message ? <p>{message}</p> : ""}

            {errors.username && (
              <p className="status-fail">{errors.username.message}</p>
            )}

            {errors.username
              ? ""
              : errors.email && (
                  <p className="status-fail">{errors.email.message}</p>
                )}

            {errors.username || errors.email
              ? ""
              : errors.password && (
                  <p className="status-fail">{errors.password.message}</p>
                )}

            {errors.username || errors.email || errors.password
              ? ""
              : errors.repassword && (
                  <p className="status-fail">{errors.repassword.message}</p>
                )}
          </div>
          <div className="form-login--body">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="register-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                    pattern: {
                      value:
                        /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i,
                      message: "Username is not valid",
                    },
                    minLength: {
                      value: 4,
                      message: "Username must be at least 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username has a maximum of 20 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    clearErrors("username");
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="register-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      message: "Email is invalid",
                    },
                  })}
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="register-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    clearErrors("password");
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="register-repassword">
                <Form.Label>Re-enter the password</Form.Label>
                <Form.Control
                  {...register("repassword", {
                    required: {
                      value: true,
                      message: "Re-password is required",
                    },
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  type="password"
                  placeholder="Enter your re-password"
                  onChange={(e) => {
                    clearErrors("repassword");
                  }}
                />
              </Form.Group>
              <div>
                <span>You already account? </span>
                <a href="/auth/sign-in">Sign in</a>
              </div>
              <Button variant="outline-primary" type="submit">
                SUBMIT
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
