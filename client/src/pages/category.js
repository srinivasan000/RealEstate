import React,{ useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

// internal import
import Collect from "../component/Collect";
import { Header, Footer, Copyright } from "../component/";

import { useStateContext } from "../context";
const Category = () =>
{
    const location = useLocation();
    const query = queryString.parse(location.search);
    // console.log(query);
    // console.log(location);
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState([]);

    const { address, contract, getPropertiesData } =useStateContext();

     // get data
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);

  // console.log(properties);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <h1>Loading...</h1>
      </div>
    );
  }
//   category
  const category = [];
  
  if (!isLoading)
  {
    properties.map((el, i) =>
    {
      if (el.category === query.name)
      {
        category.push(el)
      }
    })
  }
    return (
        <div className="category-container">
          <Header />
        <h1 className="category-title" id="top">{query.name} properties</h1>
        <Collect category={category} isLoading={isLoading} />
        <Footer />
        <Copyright/>
        </div>
    )
}

export default Category;