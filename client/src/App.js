import React, { useState, useEffect } from "react";

// internal
import {
  Header,
  Banner,
  Live,
  TopSeller,
  Collection,
  Footer,
  Copyright,
} from "./component";
import { useStateContext } from "./context";
import { getTopCreators } from "./utils";

const App = () => {
  // state variable
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setproperties] = useState([]);

  const { address, contract, getPropertiesData } = useStateContext();

  // get data
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
    setproperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);

  // console.log(properties);
  // DEVIDE CATEGORY
  const housing = [];
  const rental = [];
  const farmhouse = [];
  const office = [];
  const commercial = [];
  const country = [];

  if (!isLoading) {
    properties.map((el, i) => {
      if (el.category === "Housing") {
        housing.push(el);
      } else if (el.category === "Rental") {
        rental.push(el);
      } else if (el.category === "Farmhouse") {
        farmhouse.push(el);
      } else if (el.category === "Office") {
        office.push(el);
      } else if (el.category === "Commercial") {
        commercial.push(el);
      } else if (el.category === "Country") {
        country.push(el);
      }
    });
  }

  // get creator and amount
  const creators = getTopCreators(properties);
  // console.log(creators);
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
    <div className="app-container">
      <Header />
      <Banner />
      <Live properties={properties} />
      <TopSeller creators={creators} />
      <Collection
        housing={housing?.length}
        rental={rental?.length}
        farmhouse={farmhouse?.length}
        office={office?.length}
        commercial ={commercial?.length}
        country={country?.length} 
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default App;
