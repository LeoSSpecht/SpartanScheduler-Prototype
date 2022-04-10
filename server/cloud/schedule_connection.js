const {BigQuery} = require('@google-cloud/bigquery');
var bigqueryClient = new BigQuery();

function insertHandler(err, apiResponse) {
    if (err) {
        console.log(err);
      }
  }

async function insert_line() {
    // Creates a client
    
    // Create the dataset
    var dataset = bigqueryClient.dataset("ss");
    var table = dataset.table("schedules");

    const line = {"user_name":"joel", "schedule_day":"2022-01-01", "schedule":"01011"};
    table.insert(line,insertHandler);
  }

async function get_line() {
    // Creates a client
    // Create the dataset
    var dataset = bigqueryClient.dataset("ss");
    var table = dataset.table("schedules");

    const sqlQuery = 
    `SELECT user_name, schedule_day, schedule
    FROM schedules
    WHERE schedule_day = @current_date
    `
    const options = {
        query: sqlQuery,
        params: {current_date: '2022-01-02'},
      };
    
    // const [rows] = await bigquery.query(options);
    const [rows] = await table.query(options)
    console.log('Rows:');
    rows.forEach(row => console.log(row));
  }

  async function save_times(lines) {
    // Creates a client
    var bigqueryClient = new BigQuery();
    var dataset = bigqueryClient.dataset("ss");
    var table = dataset.table("schedules");
    table.insert(lines,insertHandler);
    console.log("inserted");
  }

  async function check_if_date_exist(date,name) {
    var dataset = bigqueryClient.dataset("ss");
    var table = dataset.table("schedules");
    const sqlQuery = 
    `SELECT user_name, schedule_day, schedule
    FROM schedules
    WHERE schedule_day = @current_date AND user_name = @user
    `
    const options = {
        query: sqlQuery,
        params: {current_date: date, user: name},
      };
    const [rows] = await table.query(options)
    if(rows.length != 0){
      return false;
    }
    else{
      return true;
    }
  }

  async function delete_existing_rows(date,name){
    var dataset = bigqueryClient.dataset("ss");
    var table = dataset.table("schedules");
    var initial_date = new Date(date);
    var finalDate = new Date(initial_date.setDate(initial_date.getDate() + 6))
    const sqlQuery = 
    `DELETE FROM schedules
    WHERE schedule_day = @init_date AND user_name = @user
    `    
    const options = {
        query: sqlQuery,
        params: {init_date: date, user: name},
      };
    const [rows] = await table.query(options)
    console.log("deleted")
  }
  module.exports = {get_line,insert_line,save_times,check_if_date_exist,delete_existing_rows};