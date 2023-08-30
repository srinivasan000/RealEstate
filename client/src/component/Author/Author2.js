import React from "react";

const Author2 = ({ address, author }) => {
  return (
    <div className="author2-container">
      <img
        src={`/images/user-img-${Math.floor(Math.random() * 7 + 1)}.jpg`}
        alt={`${address?.slice(0, 25)}...`}
      />
      <p><b>{address?.slice(0, 25)}...</b></p>
      <p>Owned Properties : {author?.length}</p>
       <div className="top"><a href="#">&uarr;</a></div>
    </div>
  );
};
export default Author2;
