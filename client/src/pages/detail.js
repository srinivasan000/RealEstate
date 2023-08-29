import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

// internal import
import { Header, Footer, Copyright } from "../component/";
import {
  DetailOne,
  DetailTwo,
  DetailThree,
  DetailFour,
  DetailFive,
  DetailSix,
    DetailSeven,
  DetailEight,
} from "../component/Detail";
import { useStateContext } from "../context";

const Detail = () => {
  // state variable
  const [property, setProperty] = useState();
  const [parsedReviews, setParsedReviews] = useState();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePriceLoading, setUpdatePriceLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  const {
    address,
    contract,
    buyPropertytFunction,
    addReviewFunction,
    likeReviewFunction,
    getProductReviewsFunction,
    getPropertyFunction,
    getPropertiesData,
    updatePriceFunction,
  } = useStateContext();
  // get url params query
  const location = useLocation();
  const query = queryString.parse(location.search);
  // get property data
  const fetchProperty = async () => {
    const data = await getPropertyFunction(query.property);
    const dataReviews = await getProductReviewsFunction(query.property);
    const dataProperties = await getPropertiesData();

    setProperties(dataProperties);
    setProperty(data);
    setParsedReviews(dataReviews);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);

  // add review
  const [review, setReview] = useState({
    productID: "",
    rating: 4,
    comment: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setReview({ ...review, [fieldName]: e.target.value });
  };

  const createReview = async () => {
    setCommentLoading(true);
    const data = await addReviewFunction({
      ...review,
      productID: property.productID,
    });
    setCommentLoading(false);
  };

  // like review
  const [likeReviews, setLikeReviews] = useState({
    productID: "",
    reviewIndex: "",
  });
  const likeReviewCall = async () => {
    const data = await likeReviewFunction({
      ...likeReviews,
      productID: property.productID,
    });
  };

  // buy property
  const buying = {
    productID: property?.productID,
    amount: property?.price,
  };
  const buyingProperty = async () => {
    setBuyLoading(true);
    const data = await buyPropertytFunction(buying);
    setBuyLoading(false);
  };
  //   update price
  const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
    productID: property?.productID,
    price: "",
  });
  const updatepropertyPrice = async () => {
    setUpdatePriceLoading(true);
    await updatePriceFunction({
      ...updatePropertyPrice,
      productID: property?.productID,
    });
    setUpdatePriceLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="detail-container">
      <Header />
      <DetailOne />
      <DetailTwo
        property={property}
        parsedReviews={parsedReviews}
        setLikeReviews={setLikeReviews}
        likeReviews={likeReviews}
        likeReviewCall={likeReviewCall}
        buyingProperty={buyingProperty}
        address={address}
        isLoading={isLoading}
        buyLoading={buyLoading}
      />
      <DetailThree properties={properties} />
      <DetailFour />
      <DetailFive />
      <DetailSix />
      <DetailSeven
        property={property}
        setUpdatePropertyPrice={setUpdatePropertyPrice}
        updatePropertyPrice={updatePropertyPrice}
        updatePriceLoading={updatePriceLoading}
        updatepropertyPrice={updatepropertyPrice}
      />
      <DetailEight
        createReview={createReview}
        handleFormFieldChange={handleFormFieldChange}
        commentLoading={commentLoading}
      />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Detail;
