import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuth}) => {
  let navigate = useNavigate()

  const signInWIthGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true)
      setIsAuth(true)
      navigate("/")
    });
  };

  return (
    <div className="loginPage">
      <p>Sign In With Google</p>
      <button className="login-with-google-btn" onClick={signInWIthGoogle}></button>
    </div>
  );
};

export default Login;
