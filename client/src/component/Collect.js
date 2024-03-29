import React from "react";

const Collect = ({category, isLoading})=>{

    return(
        <div className="collect-container">
         <div className="top"><a href="#">&uarr;</a></div>
            {
                isLoading ? (<p>Loading....</p>):(
                (
                    <div className="flex">
                   {category?.map((property, i) => (
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
                    Title:
                    {property.title.length >= 25
                      ? `${property.title.slice(0, 22)}...`
                      : property.title}
                  </span>
                </a>
                <span className="latest-bid">
                  Category: {property.category}
                </span>
                <span className="last-bid">Price: {property.price} MATIC</span>
                <span className="number">
                  Comments: {property.reviewers.length}
                </span>
              </div>
            </div>
                        
                        
                ))
                   }</div>
                )
                )
        }
        </div>
    );
}

export default Collect;