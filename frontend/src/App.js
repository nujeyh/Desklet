import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Upload from "./pages/Upload";

import { loginCheck } from "./redux/modules/user";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.is_login);

  useEffect(() => {
    dispatch(loginCheck());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        {isLogin ? (
          <>
            <Route path="/upload" element={<Upload />} />
            <Route path="/edit/:id" element={<Upload />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="/" element={<Main />} />
        <Route path="/posts/:id" element={<Detail />} />
        <Route
          path="*"
          element={<h1>요청하신 페이지를 찾을 수 없습니다.</h1>}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
