import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/header";
import Transactions from "../../components/transactions/transactions";
import Footer from "../../components/footer/footer";

const Home = () => {
    const history = useHistory();
    const token = localStorage.getItem("token");
    if (!token) {
        history.replace("/");
    }

    return (
        <div className="transactions">
            <Header />
            <Transactions />
            <Footer />
        </div>
    );
};

export default Home;
