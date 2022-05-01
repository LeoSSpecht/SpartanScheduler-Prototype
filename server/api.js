// api/server.js
const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require('dotenv');
const path = require('path');
const { OAuth2Client } = require('google-auth-library')

var things = require("./cloud/firebase");
const { Logger } = require("sass");

dotenv.config();
app.use(cors())
app.use(express.json())

app.get("/", function(req, res) {
  res.send("It's working!")
})

app.get("/name", function(req, res) {
  res.send({"name": "Chris and Joel are gods"}) // Should be json format
})

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post("/api/v1/auth/google",async (req, res) =>{
  const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const token  = req.body.token;
  const type = req.body.type;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  const { name, email } = ticket.getPayload();    
  //register user in google cloud

  upsert(users, { name, email});
  res.status(200);
  res.json({ name, email});
})

app.post("/load_calendar", async(req,res)=>{
  var data = req.body;
  var username = data.user_id
  var first_day = new Date(data.first_date)
  var all_dates = []
  for(var i = 0; i < 7; i++){
    var cur_date = new Date(first_day.setDate(first_day.getDate() + 1));
    var formattedMonth = ((cur_date.getMonth()+1).toString()).padStart(2,"0")
    var formattedDay = ((cur_date.getDate().toString()).toString()).padStart(2,"0")
    var date_string = cur_date.getFullYear().toString()+ "-"+formattedMonth +"-" +formattedDay
    all_dates.push(date_string)
  }
  var times = await things.load_times(username,all_dates);
  // console.log(times)
  res.status(200);
  res.json({"time": times})
})

app.post("/save_data",async (req, res) =>{

    var data = req.body;
    var week = data.times
    var first_day = new Date(data.first_date)
    var formattedMonth = ((first_day.getMonth()+1).toString()).padStart(2,"0")
    var formattedDay = ((first_day.getDate().toString()).toString()).padStart(2,"0")
    var username = data.user_id
    var final_body =[]

    // Creates data to append or update
    for(var i = 0; i < 7; i++){
      var cur_date = new Date(first_day.setDate(first_day.getDate() + 1));
      var formattedMonth = ((cur_date.getMonth()+1).toString()).padStart(2,"0")
      var formattedDay = ((cur_date.getDate().toString()).toString()).padStart(2,"0")
      var date_string = cur_date.getFullYear().toString()+ "-"+formattedMonth +"-" +formattedDay
      var schedule = week[i].join('')

      final_body.push({
        // "user_name":username,
        "schedule_day":date_string,
        "schedule":schedule
      })
    }

    // if(things.check_if_date_exist(first_day_formatted,username)){
    //   // Have to update
    //   for(var i = 0; i < final_body.length; i++){
    //     var date_to_delete = final_body[i].schedule_day
    //     things.update_existing_rows(date_to_delete,username)
    //   }
    // }
    // else{
      things.save_times(final_body,username)
      console.log("inserted")
    // }
    res.status(200);

})

app.get("/get_users", async(req,res) => {
  var users = await things.load_users();
  res.status(200);
  res.json({"users": users})

})
app.listen(3001, () => {
  console.log("app listening on port 3001")
})
