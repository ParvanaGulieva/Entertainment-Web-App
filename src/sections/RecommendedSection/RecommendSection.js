import React, { useState, useEffect } from "react";
import styles from "./RecommendSection.module.css";
import Movie from "../../components/Movie/Movie";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

let API_key = "&api_key=4057b88082a735245558f027a540f7df";
let base_url = "https://api.themoviedb.org/3";
let link = base_url + "/trending/all/day?language=en-US" + API_key;

const RecommendSection = ({ movieData, setMovieData }) => {
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(link);
      const data = await res.json();
      if (data) {
        setMovieData(data.results);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className={styles.movieGrid}>
      {movieData.length === 0 ? (
        <p className={styles.headerL}>Loading...</p>
      ) : (
        movieData.map((res, pos) => {
          return (
            <div className={styles.movieItem} key={pos}>
              <div className={styles.movieImage}>
                <Movie info={res} />
              </div>
              <MovieDetails info={res} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecommendSection;
