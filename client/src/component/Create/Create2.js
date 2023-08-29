import React, { useState, useEffect } from "react";
import { ethers } from "ethers";


// internal import
import { Create3 } from "./";
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
const Create2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [file, setFile] = useState(null);

  const {
    address,
    contract,
    connect,
    createPropertyFunction,
  } = useStateContext();

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
    setIsLoading(true);
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        await createPropertyFunction({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
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
      <label for="price">
        Property Price :
        <input
          type="number"
          required
          id="price"
          placeholder="Price"
          onChange={(e) => handleFormFieldChange("price", e)}
        />
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


      <Create3 data={form} />

      <button onClick={() => handleSubmit()}>Create</button>
      {/* <button onClick={()=>console.log(form)}>console</button> */}
    </div>
  );
};

export default Create2;
