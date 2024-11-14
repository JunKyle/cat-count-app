import "./App.scss";
import Home from "./Home";
import EditEncounter from "./EditEncounter";
import Login from "./Login";
import SignUp from "./SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/editEncounter" element={<EditEncounter />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
