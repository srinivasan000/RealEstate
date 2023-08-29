import React, { useState, useEffect } from "react";

// internal import
import {
  Author1,
  Author2,
  Author3,
  Author4,
  Author5,
} from "../component/Author/";
import { Header, Footer, Copyright } from "../component/";
import { useStateContext } from "../context";
const Author = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [author, setAuthor] = useState();

  const {
    address,
    contract,
    getPropertiesData,
    getUserPropertiesFunction,
  } = useStateContext();

  // fetch data
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    const authorData = await getUserPropertiesFunction();

    setAuthor(authorData);
    setProperties(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="author-container">
      <Header />
      <Author1 />
      <Author2 address={address} author={author} />
      <Author3 properties={properties} author={author} />
      <Author4 />
      <Author5 />
      <Footer />
      <Copyright />
    </div>
  );
};
export default Author;
