import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' Component={Main}/>
          <Route path='/login' Component={Login}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
