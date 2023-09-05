import React, { useState, useEffect } from "react";


import { Header } from "../component/";

import "../assets/styles/globals.css";
const About = () => {
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
    <div className="about-container">
    <Header />
    <iframe src="https://srinivasan000.github.io" title="srinivasan000"></iframe>
    </div>
  );
};

export default About;
