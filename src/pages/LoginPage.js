import React from "react"

function LoginPage() {
  return (
    <div className="login-page row justify-content-center">
      <div class="input-field">
        <input id="emailSesion" type="email" required/>
        <label for="emailSesion">E-mail:</label>
      </div>
      <button>Login</button>
    </div>
  );
}

export default LoginPage;