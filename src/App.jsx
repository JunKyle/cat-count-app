import "./App.scss";
import Home from "./Home";
import AddCat from "./AddCat";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addCat" element={<AddCat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
