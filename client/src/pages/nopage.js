import React, { useState, useEffect } from "react";


import { Header, Footer, Copyright } from "../component/";

import "../assets/styles/globals.css";
const Nopage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      setLoading(false);
    };
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="nopage-container">
    <Header />
    <div className="nopage">
      <h1>Error Code:404</h1>
      <p>Page Not Found</p>
    </div>
      <Footer/>
      <Copyright/>
    </div>
  );
};

export default Nopage;
