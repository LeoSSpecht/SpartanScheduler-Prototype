import React, { useState } from "react";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import "./styles/Calendar.scss"

const Calendar = () => {

  return (
    <div className="table_settings">
      <div className="table table-bordered ">
        <thead>
          <tr>
            <th scope="col">Sunday</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
          </tr>
        </thead>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Calendar;