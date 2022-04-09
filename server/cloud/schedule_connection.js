const {BigQuery} = require('@google-cloud/bigquery');

function insertHandler(err, apiResponse) {
    if (err) {
        console.log("Something went wrong");
      }
  }

async function insert_line() {
    // Creates a client
    var bigqueryClient = new BigQuery();
    // Create the dataset
    var dataset = bigqueryClient.dataset("ss");
    var table = dataset.table("schedules");

    const line = {"user_name":"joel", "schedule_day":"2022-01-01", "schedule":"01011"};
    table.insert(line,insertHandler);
  }

async function get_line() {
    // Creates a client
    var bigqueryClient = new BigQuery();
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
        params: {current_date: '2022-01-01'},
      };
    
    // const [rows] = await bigquery.query(options);
    const [rows] = await table.query(options)
    console.log('Rows:');
    rows.forEach(row => console.log(row));
  }