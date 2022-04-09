import React from "react"
import Calendar from "./Calendar";
import LoginPage from  "./LoginPage"

class MainPage extends React.Component {

  state = {
    name: "Joel"
  }

  // componentDidMount() {
  // }

  render() {
      return (
        <div className="">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid sa">
              <div className="">
                <a className="navbar-brand h1" href="#mainpage">Spartan Scheduler</a>
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/booking"> Booking </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Dashboard</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Something here</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Calendar/>
          <LoginPage/>
        </div>
    );
  };
}

export default MainPage;

