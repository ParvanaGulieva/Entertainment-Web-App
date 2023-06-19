import React, { useState, useContext } from "react";
import styles from "./Movie.module.css";
import bookmark from "../../assets/icon-bookmark-empty.svg";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import play from "../../assets/icon-play.svg";
import BookmarkContext from "../../context/BookmarkContext";

const Movie = ({ info }) => {
  let img_path = "https://image.tmdb.org/t/p/w500";

  const { addToBookmark, removeFromBookmark, bookmarkedList } =
    useContext(BookmarkContext);

  const isBookmarked = bookmarkedList.some((item) => item.id === info.id);
  const [bookmarkChecked, setBookmarkChecked] = useState(isBookmarked);

  const handleAddToBookmark = (item) => {
    if (isBookmarked) {
      removeFromBookmark(item.id);
      setBookmarkChecked(false);
    } else {
      addToBookmark(item);
      setBookmarkChecked(true);
    }
  };

  return (
    <div className={styles.movieCard}>
      <img
        className={styles.movie}
        src={img_path + info.poster_path}
        alt="movie image"
      />
      <div
        className={styles.bookmark}
        onClick={() => handleAddToBookmark(info)}
      >
        <img src={bookmarkChecked ? bookmarkFull : bookmark} alt="bookmark" />
      </div>
      <div className={styles.thumbnail}>
        <div className={styles.play}>
          <img src={play} alt="play" />
          <p className={styles.headingXS}>Play</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
