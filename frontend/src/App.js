import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { getPostListDB } from "./redux/modules/post";
import { useDispatch } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Upload from "./pages/Upload";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostListDB());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts/:id" element={<Detail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/edit/:id" element={<Upload />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
