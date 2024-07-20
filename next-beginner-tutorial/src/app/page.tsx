"use client"
import { FormEvent, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();
  }
  return (
    <div>
      <div>
        <h1>Enter Your Name</h1>
        <form action=""><input type="text" placeholder="Type your name..." onChange={(e)=>e.target.value}/>
        <button type="submit">Predict Data</button></form>
      </div>
    </div>
  );
}
