import React from "react";

const DetailEight = ({
  createReview,
  handleFormFieldChange,
  commentLoading,
}) => {
  return (
    <div className="detaileight-container" id="createReview">
      <h1>Give Review</h1>
      <p>Kindly provide your review for better user experiance.</p>
      <h3>YOUR Comment : </h3>
      <textarea
        name=""
        id=""
        className=""
        cols="30"
        rows="5"
        onChange={(e) => handleFormFieldChange("comment", e)}
      ></textarea>
      <p>
        your feedback will help other user of the property to provide better
        service
      </p>
      <button onClick={() => createReview()}>
        {commentLoading ? "loading..." : "Add Review"}
      </button>
    </div>
  );
};

export default DetailEight;
