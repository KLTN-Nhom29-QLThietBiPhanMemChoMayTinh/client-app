import logo from "./logo.svg";
import "./App.css";
import { Outlet,NavLink } from "react-router-dom";
import SideBar from "./components/SideBar";
import HearHome from "./components/HearHome";

function App() {
  return (
    <div className="App">

      <HearHome />

      {/*  */}
      <SideBar />
      <Outlet />
    </div>
  );
}

export default App;
