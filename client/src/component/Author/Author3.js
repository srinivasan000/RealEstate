import React from "react";

const Author3 = ({ properties, author }) => {
  console.log(properties);
  return (
    <div className="author3-container">
      <div className="nav">
        <button
          id="all"
          onClick={() => {
            let all = document.querySelector("#allProperty");
            let own = document.querySelector("#ownProperty");
            document.querySelector("#all").style.background = "#333";
            document.querySelector("#own").style.background = "#634f5f";

            all.style.display = "flex";
            own.style.display = "none";
          }}
          style={{ background: "#333" }}
        >
          All Properties
        </button>
        <button
          id="own"
          onClick={() => {
            let all = document.querySelector("#allProperty");
            let own = document.querySelector("#ownProperty");
            all.style.display = "none";
            own.style.display = "flex";
            document.querySelector("#all").style.background = "#634f5f";
            document.querySelector("#own").style.background = "#333";
          }}
          style={{ background: "#634f5f" }}
        >
          Owned properties
        </button>
        <a href="/create"><button>Create Property</button></a>
      </div>
      <div className="flex" id="allProperty">
        {properties.map((property, i) => (
          <div className="card">
            <div className="card-img">
              <a href={`/detail?property=${property.productId}`}>
                <img src={property.image} alt={property.title} />
              </a>
            </div>
            <div className="card-txt">
              <div className="profile">
                {property.reviewers.map((el, i) => (
                  <a className="avatar" title={`${el.slice(0, 15)}...`}>
                    <img src={`/images/user-img-${i + 1}.jpg`} alt="" />
                  </a>
                ))}

                {property.reviewers.length !== 0 && (
                  <a href="#" className="authot-text">
                    Interested Users
                  </a>
                )}
              </div>
              <a href="#">
                <span className="product-name">
                  Title:{" "}
                  {property.title.length >= 25
                    ? `${property.title.slice(0, 22)}...`
                    : property.title}
                </span>
              </a>
              <span className="latest-bid">Category: {property.category}</span>
              <span className="last-bid"> Price: {property.price} MATIC</span>
              <span className="number">
                Comments: {property.reviewers.length}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div id="ownProperty" style={{ display: "none" }}>
        {author?.length == 0 ? (
          <p>zero properties owned</p>
        ) : (
          <div className="flex">
            {author?.map((property, i) => (
              <div className="card">
                <div className="card-img">
                  <a href={`/update?property=${property.productID}`}>
                    <img src={property.image} alt={property.title} />
                  </a>
                </div>
                <div className="card-txt">
                  <div className="profile">
                    {property.reviewers.map((el, i) => (
                      <a className="avatar" title={`${el.slice(0, 15)}...`}>
                        <img src={`/images/user-img-${i + 1}.jpg`} alt="" />
                      </a>
                    ))}

                    {property.reviewers.length !== 0 && (
                      <a href="#" className="authot-text">
                        Interested Users
                      </a>
                    )}
                  </div>
                  <a href="#">
                    <span className="product-name">
                      Title:{" "}
                      {property.title.length >= 25
                        ? `${property.title.slice(0, 22)}...`
                        : property.title}
                    </span>
                  </a>
                  <span className="latest-bid">
                    Category: {property.category}
                  </span>
                  <span className="last-bid">
                    {" "}
                    Price: {property.price} MATIC
                  </span>
                  <span className="number">
                    Comments: {property.reviewers.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Author3;
