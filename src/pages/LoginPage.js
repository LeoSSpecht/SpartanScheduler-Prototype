import React from "react"
import {signIn} from './firebase_login';
function LoginPage(){
  return (
    <div>
      <button onClick={signIn}> Log in with Google </button>
    </div>
  )
}
export default LoginPage;