import React from "react";
import Countdown from "react-countdown";
const DetailTwo = ({
  property,
  parsedReviews,
  setLikeReviews,
  likeReviews,
  likeReviewCall,
  buyingProperty,
  address,
  isLoading,
  buyLoading,
}) => {
  const timeComment = new Date(new Date() - Math.random() * 1e12);

  return (
    <div className="detailtwo-container">
      <div className="detailtwo-img">
        {isLoading ? (
          <h1>loading</h1>
        ) : (
          <img src={property?.images} alt="srini " />
        )}
      </div>
      <div className="detailtwo-content">
        <div className="title">
          <h1>{property?.title.slice(0, 20)}</h1>
          <div className="title-btn">
            <a
              href="#"
              onClick={() => {
                let comments = document.querySelector("#detailtwo-comments");
                let details = document.querySelector("#detailtwo-details");
                let intrested = document.querySelector("#detailtwo-intrested");
                comments.style.display = "block";
                details.style.display = "none";
                intrested.style.display = "none";
              }}
            >
              {parsedReviews?.length}
            </a>
            <a href="#">share</a>
            {property?.owner === address && (
              <a
                href="#updatePrice"
                onClick={() => {
                  let update_price = document.querySelector("#updatePrice");
                  update_price.style.display = "block";
                }}
              >
                update price
              </a>
            )}
          </div>
        </div>
        <div className="detailtwo-category">
          <h3>#{property?.productID} Portal , Info bellow</h3>
          <br />
          <p>Category : {property?.category}</p>
          <p>
            Owner : 
            <a href="">
              <b>{property?.owner.slice(0, 20)}...</b>
            </a>
          </p>
          <p>
            Collection :
            <a href="">
              <b>{property?.category}</b>
            </a>
          </p>
        </div>
        <hr />
        <div className="detailtwo-nav">
          <button
            onClick={() => {
              let comments = document.querySelector("#detailtwo-comments");
              let details = document.querySelector("#detailtwo-details");
              let intrested = document.querySelector("#detailtwo-intrested");
              comments.style.display = "block";
              details.style.display = "none";
              intrested.style.display = "none";
            }}
          >
            Comments
          </button>
          <button
            onClick={() => {
              let comments = document.querySelector("#detailtwo-comments");
              let details = document.querySelector("#detailtwo-details");
              let intrested = document.querySelector("#detailtwo-intrested");
              comments.style.display = "none";
              details.style.display = "block";
              intrested.style.display = "none";
            }}
          >
            Details
          </button>
          <button
            onClick={() => {
              let comments = document.querySelector("#detailtwo-comments");
              let details = document.querySelector("#detailtwo-details");
              let intrested = document.querySelector("#detailtwo-intrested");
              comments.style.display = "none";
              details.style.display = "none";
              intrested.style.display = "block";
            }}
          >
            Intrested Users
          </button>
        </div>
        <div id="detailtwo-comments">
          <h3>Comments...</h3>
          <div className="detailtwo-review">
            {parsedReviews?.map((review, i) => (
              <div
                key={i + 1}
                onClick={() =>
                  setLikeReviews({ ...likeReviews, reviewIndex: i })
                }
                className="review-index"
              >
                <div className="review-img">
                  <img src={`/images/user-img-${i + 1}.jpg`} alt="image" />
                </div>
                <div className="review-content">
                  <p>
                    {review?.reviewer.slice(0, 35)}...</p>
                    <p><span className="like" onClick={() => likeReviewCall()}>
                      &hearts;
                    </span>
                    {review?.likes}
                  </p>
                  <p>
                    {review?.Comment.length >= 50
                      ? `${review?.Comment.slice(0, 60)}...`
                      : review?.Comment}
                  </p>
                  <p>{i + 1 + 0.5} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="detailtwo-details">
          <h3>Details...</h3>
          <div className="detail">
            <p>
              Owner : 
              <a href="">
                <b>{property?.owner}</b>
              </a>
            </p>
            <p>Title : {property?.title}</p>
            <p>Description: {property?.description}</p>
            <p>Address : {property?.address}</p>
            <p>Price : {property?.price} MATIC</p>
            <p>ProductID : {property?.productID}</p>
            <p>
              Category : <a href="">{property?.category}</a>
            </p>
          </div>
        </div>
        <div id="detailtwo-intrested">
          <h3>Intrested Users...</h3>
          <div>
            {parsedReviews?.map((intrest, i) => (
              <div className="intrested">
                <div>
                  <img src={`/images/user-img-${i + 1}.jpg`} alt="img" />
                </div>
                <div className="intrested-content">
                  <p>{intrest?.reviewer.slice(0, 40)}...</p>
                  <p>{i + 1} hourse ago </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detailtwo-buy">
          <p>Price : {property?.price}</p>
          <p>Total Comments : {parsedReviews?.length}</p>
          <p>Intrest : {parsedReviews?.length}</p>
          <p>
            Time Left : <Countdown date={Date.now() + 374343992323} />
          </p>

          <button onClick={() => buyingProperty()}>
            {buyLoading ? (
              <p>loading...</p>
            ) : (
              `${property?.price} MATIC Buy Property`
            )}
          </button>
          <a href="#createReview">
            <button>Add Comment</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailTwo;
