import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Settings from "./Pages/Settings";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
