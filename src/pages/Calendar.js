import React, {useEffect} from "react";
import "./styles/Calendar.scss"

let availability = []
let alltimes = ["08:00am", "08:30am","09:00am", "09:30am","10:00am", "10:30am", "11:00am", "11:30am", "12:00pm",
"12:30pm", "01:00pm", "01:30pm", "02:00pm", "02:30pm", "03:00pm",
"03:30pm", "04:00pm", "04:30pm", "05:00pm", "05:30pm", "06:00pm",
"07:30pm", "08:00pm", "08:30pm", "09:00pm"
]
let days_of_week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function generate_matrix(){
  for(var i = 0; i < 7 ; i++){
    // Later change for getting info from the database
    availability.push([])
    for(var z = 0; z < alltimes.length ; z++){
      availability[i].push(1)
    }
  }
}

const getDate= (time, day_of_the_week)  => {
  var ind_day = days_of_week.indexOf(day_of_the_week)
  var ind_time = alltimes.indexOf(time)
  var id = ind_day.toString()+ind_time.toString()
  // console.log(id)
  var cell = document.getElementById(id)
  //red, green
  var colors = ["rgba(233, 169, 169, 0.797)","rgb(220, 255, 220)"]


  cell.style.backgroundColor = "rgb(220, 255, 220)"
  availability[ind_day][ind_time] = (availability[ind_day][ind_time]+1)%2
  // console.log(availability)
}

function Table (day_of_the_week) {
  var ind_day = days_of_week.indexOf(day_of_the_week)
  
  return(
    <div>
    {
      alltimes.map((i) => (
            
            <tr key={i}>
              <td className="eachday" val={i} id = {ind_day.toString()+ alltimes.indexOf(i).toString()} onClick={() => getDate(i, day_of_the_week)} key={i}>{i}</td>
            </tr>
      ))
    }
  </div>
)
}


const Calendar = () => {
  generate_matrix()
  return (
    <div className="table_settings">
      <div className="table table-bordered ">
        {/* <thead> */}
          {/* <tr> */}
            <th scope="col">Sunday</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
            <th scope="col">Saturday</th>
          {/* </tr> */}
        {/* </thead> */}
        <tbody>
        <td>
          {Table("Sunday")}
        </td>
        <td>
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
        <td>
          {Table("Friday")}
        </td>
        <td>
          {Table("Saturday")}
        </td>
        </tbody>
      </div>
    </div>
  );
};

export default Calendar;