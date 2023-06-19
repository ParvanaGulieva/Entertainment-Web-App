import React from "react";
import styles from "./MovieDetails.module.css";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTV from "../../assets/icon-category-tv.svg";
import logo from "../../assets/favicon-32x32.png";

const MovieDetails = (movie) => {
  const dateString = movie.info.release_date || movie.info.first_air_date;
  const title =
    movie.info.title ||
    movie.info.name ||
    movie.info.original_title ||
    movie.info.original_name;
  const date = new Date(dateString);

  return (
    <div className={styles.movieDetails}>
      <ul>
        <li>{date.getFullYear().toString()}</li>
        <li>
          <div className={styles.category}>
            <img
              src={movie.info.media_type === "movie" ? iconMovie : iconTV}
              alt="category"
            />
            <p>
              {movie.info.media_type.charAt(0).toUpperCase() +
                movie.info.media_type.slice(1)}
            </p>
          </div>
        </li>
        <li>{parseFloat(movie.info.vote_average).toFixed(1)} / 10</li>
      </ul>
      <p className={styles.headingXS}>{title}</p>
    </div>
  );
};

export default MovieDetails;
