import React, { useState } from "react";
import styles from "./Search.module.css";
import icon from "../../assets/icon-search.svg";

const Search = ({ searchQuery, handleInputChange }) => {
  return (
    <div className={styles.searchGroup}>
      <img src={icon} alt="search-icon" />

      <input
        type="text"
        placeholder="Search for movies or TV series"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
