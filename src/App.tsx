import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Settings from "./Pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
