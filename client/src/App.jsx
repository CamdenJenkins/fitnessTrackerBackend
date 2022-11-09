import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./components/RoutinesComponent";
import ActivitiesComponent from "./components/ActivitiesComponent";
import UsersComponent from "./components/UsersComponent";
import NavBar from "./components/NavBar";
import MakeRoutines from "./components/MakeRoutines";
import MakeActivities from "./components/MakeActivities";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/routines" element={<RoutinesComponent />} />
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/makeroutine" element={<MakeRoutines />} />
        <Route path="/makeactivity" element={<MakeActivities />} />
        <Route path="/:method" element={<UsersComponent />} />
      </Routes>
    </div>
  );
}

export default App;
