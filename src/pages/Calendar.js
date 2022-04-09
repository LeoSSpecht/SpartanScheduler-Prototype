import React, {useEffect} from "react";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import "./styles/Calendar.scss"


const getDate= (time, day_of_the_week)  => {
  console.log(day_of_the_week, time)
}

function Table (day_of_the_week) {

  return(
    <div>
    {
      ["08:00am", "08:30am","09:00am", "09:30am","10:00am", "10:30am", "11:00am", "11:30am", "12:00pm",
      "12:30pm", "01:00pm", "01:30pm", "02:00pm", "02:30pm", "03:00pm",
      "03:30pm", "04:00pm", "04:30pm", "05:00pm", "05:30pm", "06:00pm",
      "07:30pm", "08:00pm", "08:30pm", "09:00pm"
      ].map((i) => (
            <tr key={i}>
              <td className="eachday" val={i} onClick={() => getDate(i, day_of_the_week)} key={i}>{i}</td>
            </tr>
      ))
    }
  </div>
)
}

const Calendar = () => {

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