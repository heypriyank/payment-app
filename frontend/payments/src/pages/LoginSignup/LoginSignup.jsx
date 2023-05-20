import React, { useState } from "react";
import "./LoginSignup.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { useStateValue } from "../../contextAPI/StateProvider";
import { baseURL } from "../../api/axios";

const LoginSignup = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  if (token) {
    history.replace("/home");
  }

  const [{}, dispatch] = useStateValue();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const checkEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      if (email.length !== 0) {
        alert("Please Enter a valid email");
        setEmail("");
      }
    }
  };

  const passwordCheck = (password, confirmPassword) => {
    const min = 8;
    const max = 20;
    const regex = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      return false;
    }

    if (password.length < min || password.length > max) {
      alert("Password should be in the range of 8-20 characters");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      return false;
    }
    if (!regex.test(password)) {
      alert("Password should be alphanumeric with one special character");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      return false;
    }

    return true;
  };

  const buttonAction = () => {
    setIsLoading(true);
    if (isLogin) {
      const data = {
        email,
        password,
      };

      axios
        .post(`${baseURL}/auth/login`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data._doc));
          dispatch({ type: "SET_USER_NAME", data: res.data._doc.name });
          dispatch({ type: "SET_USER_DATA", data: res.data._doc });
          history.replace("/home");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert("Invalid Credentials");
            setIsLoading(false);
          }
        });
    } else {
      const check = passwordCheck(password, confirmPassword);
      if (check) {
        const data = {
          email,
          password,
          name,
          currentBalance: balance
        };

        axios
          .post(`${baseURL}/auth/setup`, data, {
            headers: { "Content-type": "application/json" },
          })
          .then((res) => {
            setIsLoading(false);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch({ type: "SET_USER_DATA", data: res.data });
            history.replace("/home");
          })
          .catch((err) => {
            setIsLoading(false);
            alert(err.response.data.message);
          });
      }
    }
  };

  return (
    <div className="login__card__parent">
      <div className="login__card">
        <div className="login__card__image">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Wallet_Flat_Icon.svg"
            alt="Twitter logo"
          />
        </div>
        <div className="inputs">
          <input
            onBlur={(e) => {
              checkEmail(e.target.value);
            }}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            value={password}
          />
          {!isLogin ? (
            <>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
              />
              <input
                onChange={(e) => setBalance(e.target.value)}
                type="number"
                min={0}
                placeholder="Initial Balance (Optional)"
                value={balance}
              />
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                min={0}
                placeholder="Name"
                value={name}
              />
            </>
          ) : null}
          <button
            onClick={() => buttonAction()}
            disabled={
              !(isLogin
                ? email.length && password.length
                : email.length && password.length && confirmPassword.length && name.length)
            }
            type="button"
            className="btn"
          >
            {!isLoading ? (
              isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )
            ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
          <p
            style={{ marginTop: isLogin ? "5vh" : "1vh" }}
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
