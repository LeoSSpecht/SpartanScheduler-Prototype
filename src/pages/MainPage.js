import React from "react"
import Calendar from "./Calendar";
import NavBar from "./NavBar"

class MainPage extends React.Component {

  state = {
    name: "Joel"
  }

  // componentDidMount() {
  //   fetch("http://localhost:3001/name")
  //     .then(res => res.json())
  //     .then(data => this.setState({ name: data.name }))
  // }

  render() {
      return (
        <div className="">
          <NavBar/>
          <Calendar/>
        </div>
    );
  };
}

export default MainPage;