import React, { useState, useEffect, useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
  useContractEvents,
  // new hooks
  useDisconnect,
  useConnectionStatus,
  useSigner,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    // "0x68b4eEEb6db76F89c6377e5477166cdC03d74C64"
    "0xfb07a7354981df46045395478bb068479900cb6d"
  );
  const address = useAddress();
  const connect = useMetamask();

  // frontend
  const disconnect = useDisconnect();
  const signer = useSigner();

  // state variable
  const [userBlance, setUserBlance] = useState();

  // functions
  //1. listProperty
  const { mutateAsync: listProperty } = useContractWrite(
    contract,
    "listProperty"
  );
  const createPropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;
    try {
      const listingPrice = await contract.call("listingPrice");
      const data = await contract.call("listProperty",[
          address,
          price,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
      ]);
      
      console.info("contract call successs", data);
      window.location.reload();
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  //2. updateproperty()
  const { mutateAsync: updateProperty } = useContractWrite(
    contract,
    "updateProperty"
  );
  const updatePropertyFunction = async (form) => {
    const {
      productId,
      propertyTitle,
      description,
      category,
      images,
      propertyAddress,
    } = form;
    try {
      const data = await updateProperty({
        args: [
          address,
          productId,
          propertyTitle,
          category,
          images,
          propertyAddress,
          description,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  //3.updatePrice()
  const { mutateAsync: updatePrice } = useContractWrite(
    contract,
    "updatePrice"
  );
  const updatePriceFunction = async (form) => {
    const { productID, price } = form;
    try {
      const data = await updatePrice({
        args: [address, productID, ethers.utils.parseEther(price)],
      });
      console.info("contract upodateprice successs", data);
    } catch (err) {
      console.error("contract updateprice failure", err);
    }
  };

  // 4.BuyProperty()
  const { mutateAsync: buyProperty } = useContractWrite(
    contract,
    "buyProperty"
  );
  const buyPropertytFunction = async (buying) => {
    const { productID, amount } = buying;
    const money = ethers.utils.parseEther(amount);
    try {
      const data = await contract.call("buyProperty", [productID, address], {
        value: money.toString(),
      });
      console.info("contract call successs", data);
      window.location.reload();
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // REVIEW function
  // 5.addreview()
  const { mutateAsync: addReview } = useContractWrite(contract, "addReview");
  const addReviewFunction = async (form) => {
    const { productID, rating, comment } = form;
    try {
      const data = await addReview({
        args: [productID, rating, comment, address],
      });
      console.info("contract addReviewFunction successs", data);
      window.locartion.reload();
    } catch (err) {
      console.error("contract addReviewFunction failure", err);
    }
  };

  // 6.likeReview()
  const { mutateAsync: likeReview } = useContractWrite(contract, "likeReview");
  const likeReviewFunction = async (form) => {
    const { productID, reviewIndex } = form;
    try {
      const data = await likeReview({
        args: [productID, reviewIndex, address],
      });
      console.info("contract likereview successs", data);
      window.location.reload();
    } catch (err) {
      console.error("contract likereview failure", err);
    }
  };

  //   get property data section

  // 7. getALLproiperty()
  const getPropertiesData = async () => {
    try {
      // get all market properties
      const properties = await contract.call("getAllProperties");

      // listing price
      const listingPrice =await contract.call("listingPrice");
      const chargePrice = ethers.utils.formatEther(listingPrice.toString());

      // get user balance
      const balance = await signer?.getBalance();

      const userBlance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";

      setUserBlance(userBlance);

      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productId: property.productID.toNumber(),
        reviewers: property.reviewers,
        image: property.images,
        address: property.address,
      }));
      return parsedProperties;
    } catch (error) {
      console.log("Error while loading data", error);
    }
  };

  // 8.getHighestedProduct()
  const { data: getHighestRatedProduct } = useContractRead(
    contract,
    "getHighestRatedProduct"
  );

  // 9.getProductReview()
  const getProductReviewsFunction = async (productId) => {
    try {
      const getProductReviews = await contract.call("getProductReviews", [
        productId,
      ]);

      const parsedReviews = getProductReviews?.map((review, i) => ({
        reviewer: review.reviewer,
        likes: review.likes.toNumber(),
        Comment: review.comment,
        rating: review.rating,
        productID: review.productId.toNumber(),
        reviewIndex: review.reviewIndex.toNumber(),
      }));
      return parsedReviews;
    } catch (err) {
      console.log("fail getProductReview", err);
    }
  };

  // 10.getProperty()
  const getPropertyFunction = async (id) => {
    const productID = id * 1;
    try {
      const propertyItem = await contract.call("getProperty", [productID]);

      const property = {
        productID: propertyItem?.[0].toNumber(),
        owner: propertyItem?.[1],
        title: propertyItem?.[3],
        category: propertyItem?.[4],
        description: propertyItem?.[7],
        price: ethers.utils.formatEther(propertyItem?.[2].toString()),
        address: propertyItem?.[6],
        images: propertyItem?.[5],
      };
      return property;
    } catch (err) {
      console.log("faill single getpropertyfunction", err);
    }
  };

  // 11.getUserProperty()
  const getUserPropertiesFunction = async () => {
    try {
      const properties = await contract.call("getUserProperties", [address]);

      const parsedProperties = properties.map((property, i) => ({
        owner: property.owner,
        title: property.propertyTitle,
        description: property.description,
        category: property.category,
        price: ethers.utils.formatEther(property.price.toString()),
        productID: property.productID.toNumber(),
        reviewers: property.reviewers,
        reviews: property.reviews,
        image: property.images,
        address: property.propertyAddress,
      }));
      return parsedProperties;
    } catch (err) {
      console.log("failled on getUserPropertyfunction", err);
    }
  };

  // 12.getUserReviews()
  const getUserReviewsFunction = () => {
    try {
      const { data: getUserReviews } =  useContractRead(
      contract, 
      "getUserReviews",
      [address]
      );
      return getUserReviews;
    } catch (err) {
      console.log("failed on getUserReviews", err);
    }
  };

  // 13.totalProperty()
  const totalPropertyFunction = async () => {
    try {
      const totalProperty = await contract.call("propertyIndex");
      return totalProperty;
    } catch (err) {
      console.log("error totalproprty index", err);
    }
  };

  // 14.totalReview()
  const totalReviewsFunction = async () => {
    try {
      const totalReviews = await contract.call("reviewsCounter");
      return totalReviews.toNumber();
    } catch (err) {
      console.log("failed totalreviewsCount function", err);
    }
  };

  // HOW TO READ DATA WITH IN EVENTS
  // GET SPECIFIC EVENT
  const { data: event } = useContractEvents(contract, "propertyListed");
  // GET ALL EVENTS
  const { data: allEvents } = useContractEvents(contract);
  //set default
  const { data: eventWithoutListener } = useContractEvents(
    contract,
    undefined,
    { subscribe: false }
  );

  //  console.log(event);
  //  console.log(allEvents);
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertytFunction,
        // review
        addReviewFunction,
        likeReviewFunction,
        getProductReviewsFunction,
        getPropertyFunction,
        getUserPropertiesFunction,
        getUserReviewsFunction,
        totalPropertyFunction,
        totalReviewsFunction,
        getHighestRatedProduct,
        // contract datas
        getPropertiesData,
        userBlance,
        disconnect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
