import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import HearHome from './components/HearHome';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      <header >
          <HearHome />
      </header>
      <main>
        <SideBar />
      </main>
      <Outlet />
    </div>
  );
}

export default App;
