import "./auth.register.css";
import { React, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { request } from "../query/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
  } = useForm();
  const [message, setMsg] = useState("");
  const [notify, setNotify] = useState("");

  const redirectPage = () => {
    navigate("/auth/register");
  };

  const onSubmit = async ({ username, password }) => {
    let value = {
      username: username.trim(),
      password: password.trim(),
    };
    const res = await request({
      method: "POST",
      URL: "auth/sign-in",
      data: value,
    });
    if (res.status === "success") {
      localStorage.setItem("access_token", res.token);
      navigate("/account/information");
    } else {
      setMsg(res.res_message);
      setNotify("status-fail");
    }
  };

  return (
    <div className="container">
      <div className="container-body">
        <div className="form-login">
          <div className="form-login--title">
            <h3>SIGN IN</h3>
          </div>
          <div className={notify} id="form-login-message">
            {message ? <p>{message}</p> : ""}
            {errors.username && (
              <p className="status-fail">{errors.username.message}</p>
            )}
            {errors.username
              ? ""
              : errors.password && (
                  <p className="status-fail">{errors.password.message}</p>
                )}
          </div>
          <div className="form-login--body">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
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
                      message: "Username has at least 8 characters",
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
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password has at least 8 characters",
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    clearErrors("password");
                  }}
                />
              </Form.Group>
              <div>
                <span>New user? </span>
                <a onClick={redirectPage} href="/auth/register">
                  Create an account
                </a>
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

export default SignIn;
