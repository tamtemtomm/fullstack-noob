import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import "../styles/Chat.css";

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room));
    onSnapshot(queryMessages, (snapshot) => {
      console.log("New Messages");
    });
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    addDoc(messageRef, {
      text: newMessage,
      user: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(event) => {
            setNewMessage(event.target.value);
          }}
          value={newMessage}
        ></input>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
