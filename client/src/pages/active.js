import React, { useState, useEffect } from "react";

// inteernal imports
import Active1 from "../component/Active/Active1";
import {Header, Footer, Copyright} from "../component/";
import {useStateContext} from "../context";




const Active = ()=>{
    // state var
    const [isLoading,setIsLoading]=useState(false);
    const [properties,setProperties]=useState([]);
    const [totalReviews,setTotalReviews]=useState();
    
    const {
         address,
        contract,
          getPropertiesData,
            totalReviewsFunction,
        getHighestRatedProduct,
    }=useStateContext();

      // get data
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertiesData();
      const reviewLength = await totalReviewsFunction();
      setTotalReviews(reviewLength);
    setProperties(data);
    setIsLoading(false);
  };
//   console.log(properties);
// console.log(totalReviews);
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

    return(<div className="active-container">
    <Header/>
    <Active1 properties={properties} totalReviews={totalReviews} popular={getHighestRatedProduct?.toNumber()} />
    <Footer />
    <Copyright />
    </div>)
}
export default Active;