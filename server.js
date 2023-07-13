const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const oracledb = require('oracledb');

app.use(express.static(__dirname));

// Oracle database connection details
const dbConfig = {
  user: 'VACCINATION',
  password: '69420',
  connectString: 'localhost:1521/orclpdb',
};

// Perform the database insertion
async function insertData(name, address, n_id) {
  let connection;

  let retvalue = false;

  try {
    // Create a connection pool
    connection = await oracledb.getConnection(dbConfig);

    // Insert data into a table
    const sql = 'INSERT INTO UserTable (name, address, n_id) VALUES (:name, :address, :n_id)';
    const bindParams = { name, address, n_id };
    const options = { autoCommit: true };
    const result = await connection.execute(sql, bindParams, options);

    console.log(result);
    retvalue = true;

  } catch (error) {
    console.error(error);
    retvalue = false;
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
        return retvalue;
      } catch (error) {
        console.error(error);
        return retvalue;
      }
    }
  }
}

// Handle form submission
app.post('/submit', async (req, res) => {
  // Retrieve form data
  const name = req.body.name;
  const address = req.body.address;
  const n_id = req.body.n_id;

  // Insert data into Oracle database
  let insertionSuccess = await insertData(name, address, n_id);
  if (insertionSuccess) {
    res.send('Data submitted successfully!');
  } else {
    res.send('Registraion failed!');
  }

  // Send a response to the client
  
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
