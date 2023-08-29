import React from "react";

const Collection = ({ housing, rental, farmhouse, office, commercial, country }) => {
  const topCollection = [
    { name: "Housing", link: "/housing", item: housing },
    { name: "Office", link: "/office", item: office },
    { name: "Farmhouse", link: "/farmhouse", item: farmhouse },
    { name: "Rental", link: "/rental", item: rental },
    { name: "Commercial", link: "/commercial", item: commercial },
    { name: "Country", link: "/country", item: country },
  ];

  return (
    <div className="collection-container">
      <h1>Top Collection</h1>
      <div className="collection-flex">
        {topCollection.map((collection, i) => (
          <div className="collection" key={i + 1}>
            <a href={`/category${collection.link}?name=${collection.name}`}>
              <img src={`/images/img-${i + 1}.jpg`} alt="image" />
              <p>{collection.name}</p>
              <p>{collection.item}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
