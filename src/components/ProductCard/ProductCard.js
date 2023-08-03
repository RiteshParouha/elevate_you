import React from "react";
import Rating from "@mui/material/Rating";
import styles from "./ProductCard.module.css";
import {BsFillCartPlusFill} from "react-icons/bs";

const ProductCard = ({ image, title, price, rating }) => {
  /**This function is actualy used to render all the product card in landing page
   * @param {String} image which store image url.
   * @param {String} title to store products title.
   * @param {Number} price to store products price
   * @param {Number} rating to store products rating
   */

  return (
    <div className={styles.cardContainer}>
      <div>
        <img src={image} alt={title} width={"200px"} height={"250px"} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>{`$${price}`}</p>
        {rating && (
          <Rating name="read-only" value={rating} precision={0.5} readOnly />
        )}
        <button className={styles.cartButton}>Add to cart <span><BsFillCartPlusFill/></span></button>
      </div>
    </div>
  );
};

export default ProductCard;
