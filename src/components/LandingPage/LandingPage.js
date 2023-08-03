import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./LandngPage.module.css";
import heroImage from "../../assets/hero_image.png";
import { BsSearch } from "react-icons/bs";
import Footer from "../Footer/Footer";
const LandingPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  /**
   * This is the main function that shows all the content of the page
   * @param {Array} data to store all the products data
   * @param {Array} filteredData store the data after filtering it based on search results and category selection
   */

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  /**This function is used to fetch all the product data from the given api.
   * @returns {Promise} it returns a promise which can be resolved to get desired data.
   */

  const fetchApi = async () => {
    let response;
    try {
      response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  /** This function is used to get the fetched data and store it into data and filtered data */

  const funcToSetData = async () => {
    let responseData = await fetchApi();
    setData(responseData);
    setFilteredData(responseData);
  };

  useEffect(() => {
    funcToSetData();
  }, []);

  /** This function is used to handle serach operation.
   *  @param {String} value stores the search value that user types.
   */

  const handleSearch = (value) => {
    let tempData = data.filter((product) =>
      product.title.toLowerCase().match(value.toLowerCase())
    );
    setFilteredData(tempData);
  };

  /** This function is used to handle the chnages made in select box for category selection
   * @param {string} value stores the desired value for each selection made.
   */

  const handleChange = (value) => {
    if (value === "") {
      setFilteredData(data);
      return;
    }
    let tempData = data.filter(
      (product) => product.category.toLowerCase().split(" ")[0] === value
    );
    setFilteredData(tempData);
  };

  return (
    <div style={{ minHeight: "100vh" , maxWidth:"100%" }}>
      <div className={styles.searchContainer}>
        <div className={styles.inputIcon}>
          <input
            className={styles.inputContainer}
            type="text"
            placeholder="Search For Product"
            onChange={(event) => {
              handleSearch(event.target.value);
            }}
          />
          <span className={styles.icon}>
            <BsSearch />
          </span>
        </div>
      </div>
      <div className={styles.heroSection}>
        <img className={styles.heroImage} src={heroImage} alt="Hero_Image" />
        <div className={styles.heroText}>
          <h1>Online Shopping</h1>
          <h1>Makes Life Easy And Fancy</h1>
        </div>
      </div>
      <div className={styles.selectContainer}>
        <label style={{ marginRight: "5px" }} htmlFor="selectBox">
          Category
        </label>
        <select
          id="selectBox"
          className={styles.selectBox}
          placeholder="Select Category"
          onChange={(event) => {
            handleChange(event.target.value);
          }}
        >
          <option value="">All</option>
          <option value="men's">Mens</option>
          <option value="women's">Womens</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jwellery</option>
        </select>
      </div>
      <div className={styles.cardContainer}>
        <Grid container spacing={2}>
          {filteredData?.map((ele) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Item>
                <ProductCard
                  key={ele.id}
                  image={ele.image}
                  title={ele.title}
                  price={ele.price}
                  rating={ele.rating.rate}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
