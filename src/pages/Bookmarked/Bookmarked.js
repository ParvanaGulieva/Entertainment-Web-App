import React, { useContext, useState } from "react";
import styles from "../Movies/Movies.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Search from "../../components/Search/Search";
import Movie from "../../components/Movie/Movie";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import BookmarkContext from "../../context/BookmarkContext";

const BookmarkedPage = () => {
  const { bookmarkedList } = useContext(BookmarkContext);

  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const bookmarkedMovies = bookmarkedList.filter(
    (item) => item.media_type === "movie"
  );

  const bookmarkedTV = bookmarkedList.filter(
    (item) => item.media_type === "tv"
  );

  let dataSearch = bookmarkedList.filter((item) => {
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
          <>
            <h2 className={styles.headerL}>
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
          <div className={styles.bookmarkCategory}>
            {bookmarkedMovies.length > 0 && (
              <div>
                <h2 className={styles.headerL}>Bookmarked movies</h2>
                <div className={styles.movieGrid}>
                  {bookmarkedMovies.map((res, pos) => {
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
              </div>
            )}
            {bookmarkedTV.length > 0 && (
              <div>
                <h2 className={styles.headerL}>Bookmarked TV series</h2>
                <div className={styles.movieGrid}>
                  {bookmarkedTV.map((res, pos) => {
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
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookmarkedPage;
