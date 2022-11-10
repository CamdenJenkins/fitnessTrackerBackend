import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./components/RoutinesComponent";
import ActivitiesComponent from "./components/ActivitiesComponent";
import UsersComponent from "./components/UsersComponent";
import NavBar from "./components/NavBar";
import MakeRoutines from "./components/MakeRoutines";
import MakeActivities from "./components/MakeActivities";
import SingleRoutineView from "./components/SingleRoutine";
import EditRoutine from "./components/EditRoutine";

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
        <Route path="/routines/:routineId" element={<SingleRoutineView />} />
        <Route path="/edit/:routineId" element={<EditRoutine />} />
      </Routes>
    </div>
  );
}

export default App;
