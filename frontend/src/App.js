import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" />
      </Routes>
    </div>
  );
}

export default App;
