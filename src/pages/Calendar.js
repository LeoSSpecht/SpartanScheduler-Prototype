import React from "react";
import "./styles/Calendar.scss"

let availability = []
let alltimes = ["08:00am", "08:30am","09:00am", "09:30am","10:00am", "10:30am", "11:00am", "11:30am", "12:00pm",
"12:30pm", "01:00pm", "01:30pm", "02:00pm", "02:30pm", "03:00pm",
"03:30pm", "04:00pm", "04:30pm", "05:00pm", "05:30pm", "06:00pm",
"07:30pm", "08:00pm", "08:30pm", "09:00pm"
]
let days_of_week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

let names = ["Steve Jobs", "Bill Gates", "Leonardo Specht", "Sparty", "Joel Nataren"]

var chosen_times = []

function generate_matrix(){
  for(var i = 0; i < 7 ; i++){
    // Later change for getting info from the database
    availability.push([])
    for(var z = 0; z < alltimes.length ; z++){
      availability[i].push(0)
    }
  }
}
async function get_user(){
  var link = "http://localhost:3001/get_users"
  const res = await fetch(link, {
    method: "GET",
  headers: {
    "Content-Type": "application/json"
  }  
  })

  var users = []
  var data = await res.json();
  data["users"].forEach(doc => {
    users.push(doc);
  });
  names = users
}

const getDate= (time, day_of_the_week)  => {
  var ind_day = days_of_week.indexOf(day_of_the_week)
  var ind_time = alltimes.indexOf(time)
  var id = ind_day.toString()+ind_time.toString()
  var colors = ["rgba(233, 169, 169, 0.797)","rgb(220, 255, 220)"]
  // console.log("id is" + id)
  var cell = document.getElementById(id);
  var new_status = (availability[ind_day][ind_time]+1)%2
  availability[ind_day][ind_time] = new_status
  cell.style.backgroundColor = colors[new_status];

}

function Table (day_of_the_week) {
  
  var ind_day = days_of_week.indexOf(day_of_the_week)
  return(
    <div>
    {
      alltimes.map((i) => (
            <tr className="eachday" key={i}>
              <td className="eachday" col="red" val={i} id = {ind_day.toString()+ alltimes.indexOf(i).toString()} onClick={() => getDate(i, day_of_the_week)} key={i}>{i}</td>
            </tr>
      ))
    }
  </div>
)
}

function call_save(){
  var link = "http://localhost:3001/save_data"
  var user = JSON.parse(localStorage.loginData).name;
  var date = "2022-01-02"
  const res = fetch(link, {
    method: "POST",
    body: JSON.stringify({
    times: availability,
    type: "tutor",
    user_id: user,
    first_date:date
  }),
  headers: {
    "Content-Type": "application/json"
  }  
  })
}

async function load_calendar(tutor_name){
  var link = "http://localhost:3001/load_calendar"
  var user = tutor_name;
  var date = "2022-01-02"
  const res = await fetch(link, {
    method: "POST",
    body: JSON.stringify({
    user_id: user,
    first_date:date
  }),
  headers: {
    "Content-Type": "application/json"
  }  
  })
  var data = await res.json();
  for(var day = 0; day < data["time"].length; day++){
    // Check why length is so big
    for(var time = 0; time < 25; time++){
      var id = day.toString()+time.toString();
      var colors = ["rgba(233, 169, 169, 0.797)","rgb(220, 255, 220)"]
      var cell = document.getElementById(id);
      cell.style.backgroundColor = colors[data["time"][day][time]];
    }
  }
}

const Calendar = () => {
  generate_matrix()
  return (
    <div className="row">
      <div className="dropdown col-3 student_dropdown" id = "student_dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Tutors List
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {names.map((name) => {
              return <li><a className="dropdown-item" href="#" onClick={() => load_calendar(name)}>{name}</a></li>;
          })}
        </ul>
      </div>
      <div className="table_settings col-6">
        <div className="table table-bordered ">
            <th scope="col">Sunday</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
            <th scope="col">Saturday</th>
          <tbody>
          <td className= "m-0" >
            {Table("Sunday")}
          </td>
          <td m-0>
            {Table("Monday")}
          </td>
          <td>
            {Table("Tuesday")}
          </td>
          <td>
            {Table("Wednesday")}
          </td>
          <td>
            {Table("Thursday")}
          </td>
          <td className="m-0">
            {Table("Friday")}
          </td>
          <td>
            {Table("Saturday")}
          </td>
          </tbody>
        </div>
      </div>
      <div className="col-1">
      </div>
      <div className="col-2 justify-content-center">
        <button type="button" className="btn mt-5 btn-outline-primary" onClick={call_save}>Save</button>
      </div>
    </div>
  );
};

export default Calendar;