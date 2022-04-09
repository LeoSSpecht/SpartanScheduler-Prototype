import React from "react"

import "./styles/LoginPage.scss"

function LoginPage() {
  return (
    <div className="login-page row justify-content-center">
      <div class="input-field card">
        {/* <label for="emailSesion">Email:</label> */}
        <input id="emailSesion" type="email" placeholder="Email" required/>
        <input id="emailSesion" type="password" placeholder="Password" required/>
      </div>
      <button>Login</button>
    </div>
  );
}

export default LoginPage;