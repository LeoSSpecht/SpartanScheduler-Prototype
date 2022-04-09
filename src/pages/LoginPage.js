import React from "react"
import {GoogleLogin} from "react-google-login"
import { useState } from 'react';
// import  { Navigate } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

function LoginPage({history}){
  // localStorage.clear()
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleLogin = async googleData => {
    const res = await fetch("http://localhost:3001/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    

    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
    window.location = '/';
  }

  return(
    <div className="login-page row justify-content-center">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        // onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
    ></GoogleLogin>
    </div>
    );

}
export default LoginPage;