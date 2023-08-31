import React, { useState, useEffect } from "react";

// internal impoprt
import { getTopCreators } from "../../utils/";
const Active1 = ({ properties, totalReviews, popular }) => {
  const creators = getTopCreators(properties);
  return (
    <div className="active1-container">
      <h1 id="top">All Activities</h1>
       <div className="top"><a href="#top">&uarr;</a></div>
      <div className="activity">
        <div className="left">
          {properties?.map((activity, i) => (
            <div className="items">
              <div className="img">
                {" "}
                <a href={`/detail?property=${activity.productId}`}>
                  <img src={activity?.image} alt="image" />
                </a>{" "}
              </div>
              <div className="img-text">
                <p>Title: {activity?.title.slice(0, 25)}...</p>
                <p>Owner: {activity?.owner.slice(0, 25)}...</p>
                <p>
                  {i + 1}:30 PM on {i + 3}th june,
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="right">
          <h2>Analytic</h2>
          <div className="flex">
          <button>Total Property : {properties.length}</button>
          <button>Users : {creators.length}</button>
          <button>Reviews: {totalReviews}</button>
</div>
          <h2>Category</h2>
          <div className="flex">
          <a href="/category/housing?name=Housing">
            <button>Housing</button>
          </a>
          <a href="/category/office?name=Office">
            <button>Office</button>
          </a>
          <a href="/category/farmhouse?name=Farmhouse">
            <button>Farmhouse</button>
          </a>
          <a href="/category//rental?name=Rental">
            <button>Rental</button>
          </a>
          <a href="/category/commercial?name=Commercial">
            <button>Commercial</button>
          </a>
          <a href="/category/country?name=Country">
            <button>Country</button>
          </a>
</div>
          <h2>Popular Property</h2>
          <div className="flex">
             <a href={`/detail?property=${popular}`}>
            <button>Popular</button>
          </a>
         </div>
        </div>
      </div>
    </div>
  );
};
export default Active1;
