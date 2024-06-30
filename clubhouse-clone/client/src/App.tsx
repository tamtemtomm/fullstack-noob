import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { MainPage } from './pages/main'
import { SignIn } from './pages/sign-in'
import { Room } from './pages/room'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/"  element={<MainPage/>}/>
        <Route path="/sign-in"  element={<SignIn/>}/>
        <Route path="/room"  element={<Room/>}/>
      </Routes>
    </Router>
  )
}

export default App
