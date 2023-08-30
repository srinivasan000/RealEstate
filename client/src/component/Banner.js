import React from "react";

const Banner = (props) => {
  const category = [
    { name: "Housing", link: "/housing", worth: 4264.2383 },
    { name: "Office", link: "/office", worth: 5264.2383 },
    { name: "Farmhouse", link: "/farmhouse", worth: 2264.2383 },
    { name: "Rental", link: "/rental", worth: 3364.2383 },
    { name: "Commercial", link: "/commercial", worth: 1064.2383 },
    { name: "Country", link: "/country", worth: 8264.2383 },
  ];

  return (
    <div className="banner-container">
      <div className="flex">
        {category.map((el, i) => (
          <div className="card">
            <div className="card-img">
              <a href={`/category${el.link}?name=${el.name}`}>
                <img src={`/images/img-${i + 1}.jpg`} alt="img" />
              </a>
            </div>
            <div className="card-txt">
              <a href={`/category${el.link}?name=${el.name}`}>{el.name}</a>
              <a href={`/category${el.link}?name=${el.name}`}>
                {el.worth} MATIC
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
