import React from "react";

const DetailSeven = ({
  property,
  setUpdatePropertyPrice,
  updatePropertyPrice,
  updatePriceLoading,
  updatepropertyPrice,
}) => {
  return (
    <div
      className="detail7-container"
      id="updatePrice"
      style={{ display: "none" }}
    >
      <div className="seven">
        <h1>Update Property Price</h1>
        <p>
          Hey {property?.owner.slice(0, 25)}... kindly update Your Property
          price
        </p>
        <h3>Price : </h3>
        <input
          type="number"
          name="message"
          placeholder={`Old price : ${property.price} MATIC`}
          onChange={(e) =>
            setUpdatePropertyPrice({
              ...updatePropertyPrice,
              price: e.target.value,
            })
          }
        />
        <button onClick={() => updatepropertyPrice()}>
          {updatePriceLoading ? "Loading..." : "Updat Price"}
        </button>
      </div>
    </div>
  );
};

export default DetailSeven;
