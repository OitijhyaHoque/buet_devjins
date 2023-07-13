const oracledb = require('oracledb');

// Oracle database connection details
const dbConfig = {
  user: 'UNIVERISTY',
  password: '69420',
  connectString: 'CONNECT_STRING',
};

// Perform the database insertion
async function insertData(name, address, n_id) {
  let connection;

  try {
    // Create a connection pool
    connection = await oracledb.getConnection(dbConfig);

    // Insert data into a table
    const sql = 'INSERT INTO your_table (name, address, n_id) VALUES (:name, :address, :n_id)';
    const bindParams = { name, address, n_id };
    const options = { autoCommit: true };
    const result = await connection.execute(sql, bindParams, options);

    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}

// Handle form submission
app.post('/submit', (req, res) => {
  // Retrieve form data
  const name = req.body.name;
  const email = req.body.email;

  // Insert data into Oracle database
  insertData(name, email);

  // Send a response to the client
  res.send('Data submitted successfully!');
});