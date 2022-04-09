import React from "react"
import Calendar from "./Calendar";
import LoginPage from  "./LoginPage"
import NavBar from "./NavBar"

class MainPage extends React.Component {

  state = {
    name: "Joel"
  }

  // componentDidMount() {
  // }

  render() {
      return (
        <div className="">
          <NavBar/>
          <Calendar/>
          <LoginPage/>
        </div>
    );
  };
}

export default MainPage;