import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Movies from "./pages/Movies/Movies";
import TVseries from "./pages/TVseries/TVseries";
import Bookmarked from "./pages/Bookmarked/Bookmarked";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BookmarkProvider>
          <BrowserRouter>
            <ToastContainer
              theme="dark"
              toastStyle={{ backgroundColor: "#161d2f" }}
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route index element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-series" element={<TVseries />} />

              <Route
                path="/bookmarked"
                element={
                  <ProtectedRoute>
                    <Bookmarked />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </BookmarkProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
