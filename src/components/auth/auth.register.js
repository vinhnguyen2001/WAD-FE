import "./auth.register.css";
import { React, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function Register() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (inputmethod, pathURL, delivery) => {
    axios({
      method: inputmethod,
      // url: `http://localhost:4000/${pathURL}`,
      url: `https://clone-app-hcmus.herokuapp.com/${pathURL}`,
      data: delivery,
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setMessage(res.res_message);

        if (res.status === "success") {
          setNotification("form-login--message status-success");
        } else {
          setNotification("form-login--message status-fail");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (username === "" || rePassword === "" || password === "") {
      setNotification("form-login--message status-fail");
      return setMessage("Please fill out all the fields");
    }

    if (rePassword !== password) {
      setNotification("form-login--message status-fail");
      return setMessage("Passwords do not match");
    }

    var data = {};
    data["username"] = username;
    data["password"] = password;

    handleSubmit("post", "auth/sign-up", data);
  };

  return (
    <div className="container">
      <div className="container-body">
        <div className="form-login">
          <div className="form-login--title">
            <h3>REGISTER ACCOUNT</h3>
          </div>
          <div className={notification}>
            <p>{message}</p>
          </div>
          <div className="form-login--body">
            <Form onSubmit={handleClick}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={username}
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setNotification("");
                    setMessage("");
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setNotification("");
                    setMessage("");
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRePassword">
                <Form.Label>Re-enter the password</Form.Label>
                <Form.Control
                  value={rePassword}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setRePassword(e.target.value);
                    setNotification("");
                    setMessage("");
                  }}
                />
              </Form.Group>
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
