import React from "react";

const TopSeller = ({ creators }) => {
  return (
    <div className="topseller-container">
      <h1>Top Sellers</h1>
      <div className="row">
        {creators.map((seller, i) => (
          <div className="topseller" key={i + 1}>
            <div className="topseller-img">
              <a href="author.html">
                <img src={`/images/user-img-${i + 1}.jpg`} alt="" />
              </a>
            </div>
            <div className="topseller-txt">
              <a href="author.html">
                <h3>{seller.owner.slice(0, 10)}...</h3>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSeller;
