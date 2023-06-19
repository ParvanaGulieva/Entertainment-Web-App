import React, { useState, useEffect } from "react";
import styles from "./TrendingSection.module.css";
import Movie from "../../components/Movie/Movie";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

let API_key = "&api_key=4057b88082a735245558f027a540f7df";
let base_url = "https://api.themoviedb.org/3";
let link = base_url + "/trending/all/day?language=en-US" + API_key;

const TrendingSection = ({ movieData, setMovieData }) => {
  const [loading, setLoading] = useState(true);
  const [randomMovieData, setRandomMovieData] = useState([]);

  useEffect(() => {
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

    fetchAPI();
  }, [setMovieData]);

  useEffect(() => {
    if (movieData.length > 0) {
      const shuffledMovies = movieData.sort(() => Math.random() - 0.5);
      setRandomMovieData(shuffledMovies.slice(0, 6));
    }
  }, [movieData]);

  return (
    <>
      <div className={styles.trendingGrid}>
        {movieData.length === 0 && loading ? (
          <p className={styles.headerL}>Loading...</p>
        ) : (
          <div className={styles.scrollContainer}>
            {randomMovieData.map((res, pos) => (
              <div className={styles.trendingItem} key={pos}>
                <Movie info={res} />
                <div className={styles.trendingDetailsThumbnail}>
                  <div className={styles.trendingDetails}>
                    <MovieDetails info={res} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingSection;
