import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
// import Login from "./pages/Login";
// import Upload from "./pages/Upload";
import axios from "axios";
import { useEffect } from "react";
import { getPostListDB } from "./redux/modules/post";
import { useDispatch } from "react-redux";
import Detail from "./pages/Detail";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostListDB());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts/:id" element={<Detail />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/upload" element={<Upload />} /> */}
      </Routes>
    </div>
  );
}

export default App;
