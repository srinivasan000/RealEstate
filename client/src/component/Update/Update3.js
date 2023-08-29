import React from "react";

const Update3 = ({ data }) => {
  return (
    <div className="create3-container">
      <img src={data.images} alt="images" />
      <h1>PropertyTitle : {data.propertyTitle}</h1>
      <p>Description : {data.description}</p>
      <p>Address : {data.propertyAddress}</p>
      <p>Category : {data.category}</p>
    </div>
  );
};

export default Update3;
