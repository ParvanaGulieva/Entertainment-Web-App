import React, { useState, useEffect } from "react";
import styles from "./TVseries.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Movie from "../../components/Movie/Movie";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

let API_key = "&api_key=4057b88082a735245558f027a540f7df";
let base_url = "https://api.themoviedb.org/3";
let link = base_url + "/trending/all/week?language=en-US" + API_key;

const TVseries = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(link);
      const data = await res.json();
      if (data.results) {
        const filteredData = data.results.filter(
          (item) => item.media_type === "tv"
        );
        setMovieData(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  let dataSearch = movieData.filter((item) => {
    if (item.title || item.name || item.original_title || item.original_name) {
      const title =
        item.title || item.name || item.original_title || item.original_name;
      return title
        .toString()
        .toLowerCase()
        .includes(searchQuery.toString().toLowerCase());
    }
    return false;
  });

  const searchResultsCount = dataSearch.length;

  return (
    <section className={styles.homePage}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.search}>
        <Search
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
        />
      </div>
      <div className={styles.recommended}>
        {searchQuery ? (
          <h2 className={styles.headerL}>
            Found {searchResultsCount} result{searchResultsCount > 1 ? "s" : ""}{" "}
            for '{searchQuery}'
          </h2>
        ) : (
          <h2 className={styles.headerL}>TV Series</h2>
        )}
        <div className={styles.movieGrid}>
          {movieData.length === 0 && loading ? (
            <p className={styles.headerL}>Loading...</p>
          ) : (
            dataSearch.map((res, pos) => {
              return (
                <div className={styles.movieItem} key={pos}>
                  <div className={styles.movieImg}>
                    <Movie info={res} />
                  </div>
                  <MovieDetails info={res} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default TVseries;
