import React, { useState, useEffect } from "react";
import "./header.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../contextAPI/StateProvider";
import commaNumber from "comma-number"

const Header = () => {
  const history = useHistory();
  const [{ userData }, dispatch] = useStateValue();

  const handleLogout = () => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    setTimeout(() => {
      localStorage.clear();
      history.replace("/");
    }, 2000);
  };

  return (
    <div className="header__main">
      <div onClick={() => history.push('home')} className="balance__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Wallet_Flat_Icon.svg"
          alt="wallet icon"
        />
        <p>{"Current Balance: " + commaNumber(userData.currentBalance)}</p>
      </div>
      <div>
        <center><p>{userData.name}</p></center>
        <p>{userData.walletId}</p>
      </div>
      <button
        onClick={() => handleLogout()}
        type="button"
        className="btn btn-danger"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
