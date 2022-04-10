import React from "react"
import Calendar from "./Calendar";
import NavBar from "./NavBar"

class MainPage extends React.Component {



  render() {
      if(localStorage.loginData === ""){
        // redirect to login
        window.location = '/login';
      }
      return (
        <div className="">
          <NavBar/>
          <Calendar/>
        </div>
    );
  };
}

export default MainPage;