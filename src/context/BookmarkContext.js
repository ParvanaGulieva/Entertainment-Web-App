import React, { createContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedList, setBookmarkedList] = useState([]);

  useEffect(() => {
    const savedBookmarkedItems = localStorage.getItem("bookmarkedItems");
    if (savedBookmarkedItems) {
      setBookmarkedList(JSON.parse(savedBookmarkedItems));
    }
  }, []);

  useEffect(() => {
    if (bookmarkedList.length > 0) {
      localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedList));
    } else {
      localStorage.removeItem("bookmarkedItems");
    }
  }, [bookmarkedList]);

  const addToBookmark = (item) => {
    setBookmarkedList([...bookmarkedList, item]);
  };

  const removeFromBookmark = (id) => {
    setBookmarkedList(bookmarkedList.filter((item) => item.id !== id));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedList,
        addToBookmark,
        removeFromBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
