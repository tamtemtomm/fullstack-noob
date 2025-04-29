import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/main/Main';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import CreatePost from './pages/create-post/CreatePost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' Component={Main}/>
          <Route path='/login' Component={Login}/>
          <Route path='/createpost' Component={CreatePost}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
