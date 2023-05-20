import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/header";
import Content from "../../components/content/content";
import { useStateValue } from "../../contextAPI/StateProvider";
import Footer from "../../components/footer/footer";

const Home = () => {
    const history = useHistory();
    const token = localStorage.getItem("token");
    if (!token) {
        history.replace("/");
    }

    return (
        <div className="home">
            <Header />
            <Content />
            <Footer />
        </div>
    );
};

export default Home;
