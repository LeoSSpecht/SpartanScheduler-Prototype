// api/server.js

const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require('dotenv');
const path = require('path');
const { OAuth2Client } = require('google-auth-library')

dotenv.config();
app.use(cors())
app.use(express.json())

app.get("/", function(req, res) {
  res.send("It's working!")
})

app.get("/name", function(req, res) {
  res.send({"name": "Leo and Joel are gods"}) // Should be json format
})

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post("/api/v1/auth/google",async (req, res) =>{
  const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const { token }  = req.body;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  const { name, email } = ticket.getPayload();    

  upsert(users, { name, email});
  res.status(201);
  res.json({ name, email});
})


app.listen(3001, () => {
  console.log("app listening on port 3001")
})
