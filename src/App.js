import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

function App() {
  return (
    <>
    <Router>
      <div style={{display: 'flex'}}>
      <Navbar />
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/profile' Component={Profile} />
        <Route path='/message' Component={Messages} />
        <Route path='/setting' Component={Settings} />

      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
