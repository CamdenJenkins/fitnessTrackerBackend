import "./App.css";
import useRoutines from "./hooks/useRoutines";
import { Routes, Route } from "react-router-dom";

import RoutinesComponent from "./components/RoutinesComponent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/routines" element={<RoutinesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
