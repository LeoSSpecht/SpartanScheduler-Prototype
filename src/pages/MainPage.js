import React from "react"


class MainPage extends React.Component {

  state = {
    name: "Joel"
  }

  componentDidMount() {
    fetch("http://localhost:3001/name")
      .then(res => res.json())
      .then(data => this.setState({ name: data.name }))
  }

  render() {
      return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
      {/* <div className="container" id= "mainpage"> */}
          <div class="container-fluid">
            <a class="navbar-brand" href="#mainpage">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#"> {this.state.name} </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled">Disabled</a>
                </li>
              </ul>
            </div>
          </div>
      {/* </div> */}
      </nav>
    );
  };
}

export default MainPage;

