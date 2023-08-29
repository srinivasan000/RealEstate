import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import queryString from "query-string";


// internal import
import { Update3 } from "./";
import { useStateContext } from "../../context";
import { checkIfImage } from "../../utils";

const categories = [
  "Housing",
  "Office",
  "Farmhouse",
  "Rental",
  "Commercial",
  "Country",
];
const Update2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState();
  const [properties, setProperties] = useState([]);
  const [fileName, setFileName] = useState();

  const {
    address,
    contract,
    connect,
     getPropertyFunction,
    updatePropertyFunction,
  } = useStateContext();

 const location = useLocation();
 const query = queryString.parse(location.search);

 console.log(query.property);
  // get property data
  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getPropertyFunction(query.property);
    setProperty(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract]);

  console.log(property);

  const [form, setForm] = useState({
    propertyTitle: "",
    description: "",
    category: "",
    images: "",
    propertyAddress: "",
  });

  const handleFormFieldChange = (fileName, e) => {
    setForm({ ...form, [fileName]: e.target.value });
  };

  const handleSubmit = async () => {
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await updatePropertyFunction({
          ...form,
             productId:property.productID,
        });
        setIsLoading(false);
      } else {
        alert("Provide Valid image URL");
        setForm({ ...form, images: "" });
      }
    });
  };


  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <h1>Loading...</h1>
      </div>
    );
  }
  
  return (
    <div className="create2-container">
    
      <label for="name">
        PropertyTitle :
        <input
          type="text"
          id="name"
          required
          placeholder="propertyTitle"
          onChange={(e) => handleFormFieldChange("propertyTitle", e)}
        />
      </label>

      <label for="url">
        Image :
        <input
          type="text"
          id="url"
          required
          placeholder="images"
          onChange={(e) => handleFormFieldChange("images", e)}
        />
      </label>
      <label for="category">
        Category :
        <select
          required
          style={{
            background: "#eee",
            border: "none",
            outline: "none",
            height: "60px",
            borderRadius: "10px",
            fontSize: "20px",
            width: "100%",
          }}
        >
          <option>select category</option>
          {categories.map((el, i) => (
            <option
              key={i + 1}
              onClick={() =>
                setForm({
                  ...form,
                  category: el,
                })
              }
              value={el}
            >
              {el}
            </option>
          ))}
        </select>
      </label>

      <label for="description">
        Description :
        <textarea
          type="text"
          id="description"
          required
          placeholder="description"
          cols="30"
          rows="5"
          onChange={(e) => handleFormFieldChange("description", e)}
        ></textarea>
      </label>
      <label for="address">
        Property Address :
        <input
          type="texr"
          required
          id="address"
          placeholder="propertyAddress"
          onChange={(e) => handleFormFieldChange("propertyAddress", e)}
        />
      </label>


      <Update3 data={form} />

      <button onClick={() => handleSubmit()}>Update Property Data</button>
      {/* <button onClick={()=>console.log(form)}>console</button> */}
    </div>
  );
};

export default Update2;
