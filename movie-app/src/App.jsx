import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import Movies from './components/Movies';
import Watchlist from './components/Watchlist';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">
            <NavLink to="/" className="nav-link">
              Movie App
            </NavLink>
          </div>
          <div className="navbar-links">
            <NavLink to="/" className="nav-link">
              Movies
            </NavLink>
            <NavLink to="/watchlist" className="nav-link">
              Watchlist
            </NavLink>
          </div>
          <div className="navbar-login">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
