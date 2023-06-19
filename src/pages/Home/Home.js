import React, { useState } from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import RecommendSection from "../../sections/RecommendedSection/RecommendSection";
import TrendingSection from "../../sections/TrendingSection/TrendingSection";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import Movie from "../../components/Movie/Movie";

const Home = () => {
  const [movieData, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      {searchQuery ? (
        <>
          <h2 className={styles.headerLsearch}>
            Found {searchResultsCount} result
            {searchResultsCount > 1 ? "s" : ""}
            for '{searchQuery}'
          </h2>
          <div className={styles.movieGrid}>
            {dataSearch.map((res, pos) => {
              return (
                <div className={styles.movieItem} key={pos}>
                  <div className={styles.movieImg}>
                    <Movie info={res} />
                  </div>
                  <MovieDetails info={res} />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className={styles.homeTrending}>
            <h2 className={styles.headerL}>Trending</h2>
            <div className={styles.trendingSection}>
              <TrendingSection
                movieData={movieData}
                setMovieData={setMovieData}
              />
            </div>
          </div>
          <div className={styles.recommended}>
            <h2 className={styles.headerL}>Recommended for you</h2>
            <RecommendSection
              movieData={movieData}
              setMovieData={setMovieData}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
