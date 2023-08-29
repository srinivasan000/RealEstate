import React from "react";

const Create3 = ({ data }) => {
  return (
    <div className="create3-container">
      <img src={data.images} alt="images" />
      <h1>PropertyTitle : {data.propertyTitle}</h1>
      <p>Description : {data.description}</p>
      <p>Address : {data.propertyAddress}</p>
      <p>Price :{data.price}</p>
      <p>Category : {data.category}</p>
    </div>
  );
};

export default Create3;
