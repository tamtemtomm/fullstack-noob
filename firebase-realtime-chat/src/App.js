import { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Chat from "./components/Chat"

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <>
      {room ? (
        <div> <Chat room={room}/> </div>
      ) : (
        <div className="room">

          <label>Enter the room name</label>
          <input ref={roomInputRef}/>
          <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
    </>
  );
}

export default App;
