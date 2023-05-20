import React, { useState, useEffect } from "react";
import "./content.css";
import { getRequest, postRequest } from "../../api/requests";
import { useStateValue } from "../../contextAPI/StateProvider";
import LoadingGif from "../../assets/walletLoading.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const Content = () => {
  const [{ isLoading, userData }, dispatch] = useStateValue();
  const user = JSON.parse(localStorage.getItem("user"));
  const [ walletId, setWalletId ] = useState("")
  const [ type, setType ] = useState("CREDIT")
  const [ description, setDescription ] = useState("")
  const [ amount, setAmount ] = useState("")
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    if(user?.walletId) getData();
  }, []);

  const getData = async () => {
    const res = await getRequest(`/wallet/${user.walletId}`);
    if (res) {
      const updatedData = { ...JSON.parse(JSON.stringify(user)) }
      updatedData.currentBalance = res.currentBalance
      dispatch({
        type: "SET_IS_LOADING",
        data: false,
      });
      dispatch({
        type: "SET_USER_DATA",
        data: updatedData,
      });
    } else {
      alert("Network error occured");
    }
  };

  const handleSubmit = async() => {
    if (!walletId.length || !amount || !type.length || !description.length) {
      alert("Please check inputs again")
      return
    }
    if ( type === "CREDIT" && amount > userData.currentBalance ) {
      alert("Not enough balance")
      return
    }
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    const data = {
      amount,
      description,
      type
    }
    const res = await postRequest(`/transact/${walletId}`, data);
    if (res) {
      setWalletId("")
      setType("")
      setDescription("")
      setAmount("")
      dispatch({
        type: "SET_IS_LOADING",
        data: false,
      });
      toast("Transaction Done!")
      getData()
    } else {
      toast("Transaction Failed")
    }
  }

  return (
    <div className="content__flex">
      {!isLoading ? (
        <div className="transact__parent">
          <h3>Transact</h3>
          <div className="transact__input">
            <input
              onChange={(e) => setWalletId(e.target.value)}
              type="text"
              placeholder="Enter Wallet ID here"
              value={walletId}
              className="form-control"
            />
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Enter Amount here"
              value={amount}
              min={0}
              className="form-control"
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter Description"
              value={description}
              className="form-control"
            />
            <select onChange={(e) => setType(e.target.value)} class="form-select" aria-label="Default select example">
              <option value="CREDIT">CREDIT</option>
              <option value="DEBIT">DEBIT</option>
            </select>
            <button onClick={() => handleSubmit()} type="button" className="btn btn-primary">
              Pay
            </button>
          </div>
          <button onClick={() => history.push("/transactions")} type="button" className="btn btn-dark">
            See all transactions
          </button>
        </div>
      ) : (
        <div className="custom__loading">
          <img src={LoadingGif} alt="LoadingGif" />
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Content;
