import React, { useState, useEffect } from "react";
import "./transactions.css";
import { getRequest, postRequest } from "../../api/requests";
import { useStateValue } from "../../contextAPI/StateProvider";
import LoadingGif from "../../assets/walletLoading.gif";
import { exportCSVFile } from "../../helpers/csv.helper";

const Content = () => {
  const [{ isLoading, userData }, dispatch] = useStateValue();
  const user = JSON.parse(localStorage.getItem("user"));
  const [ transactions, setTransactions ] = useState([])
  const [ skip, setSkip ] = useState(0)
  const [ sort, setSort ] = useState("")
  const [ sortType, setSortType ] = useState("")

  useEffect(() => {
    dispatch({
      type: "SET_IS_LOADING",
      data: true,
    });
    if(user.walletId) getData();
  }, [skip, sort, sortType]);

  const getData = async () => {
    const res = await getRequest(`/transactions?walletId=${user.walletId}&skip=${skip * 10}&limit=10&sort=${sort}&sortType=${sortType}`);
    if (res) {
      dispatch({
        type: "SET_IS_LOADING",
        data: false,
      });
      setTransactions(res.transactions)
    } else {
      alert("Network error occured");
    }
  };

  const sortByDate = () => {
    setSort("createdAt")
    setSortType(sortType === "inc" ? "dec" : "inc")
  }
  const sortByAmount = () => {
    setSort("amount")
    setSortType(sortType === "inc" ? "dec" : "inc")
  }

  const getCsv = async() => {
    const data = await getRequest(`/transactions?walletId=${user.walletId}`);
    const fileTitle = "transactions"
    exportCSVFile(undefined, data.transactions, fileTitle)
  }

  return (
    <div className="content__flex">
      {!isLoading ? (
        <>
        <div className="sort__transactions">
          <p onClick={() => sortByDate()}>
            Sort by date
          </p>
          <p onClick={() => sortByAmount()}>
            Sort by amount
          </p>
          <button style={{ marginBottom: 10 }} className="btn btn-primary" onClick={() => getCsv()}>
            Get CSV
          </button>
        </div>
        <div className="transactions__parent">
          { transactions.map((transaction) => {
            return (
              <div className="transaction__card">
                <div className="name__type">
                  <p>Amount: {transaction.amount}</p>
                  <p>Type: {transaction.type}</p>
                </div>
                <p>{transaction.createdAt.split("T")[0]}</p>
              </div>
            )
          }) }
        </div>
        <div className="prev__next">
          { skip != 0 ? (
            <button onClick={() => setSkip(skip - 1)} type="button" className="btn btn-primary">
            Previous
          </button>
          ) : ""}
          <button disabled={transactions.length !== 10} onClick={() => setSkip(skip + 1)} type="button" className="btn btn-primary">
            Next
          </button>
        </div>
        </>
      ) : (
        <div className="custom__loading">
          <img src={LoadingGif} alt="LoadingGif" />
        </div>
      )}
    </div>
  );
};

export default Content;
