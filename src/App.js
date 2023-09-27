import "./App.css";
import { Outlet } from "react-router-dom";
import SideBar from "./components/common/SideBar/SideBar";

function App() {
  return (
    <div className="App">

      {/*  */}
      <SideBar />
      <Outlet />
    </div>
  );
}

export default App;
