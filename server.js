const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;

// Configure Oracle database connection
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'your_connect_string',
};

// Create a pool of connections
oracledb.createPool(dbConfig)
  .then(() => {
    console.log('Connected to Oracle database');
  })
  .catch((error) => {
    console.error('Error connecting to Oracle database:', error);
  });

// Middleware to parse the request body
app.use(express.urlencoded({ extended: false }));

// Route for form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Perform any necessary validation or sanitization

  const insertQuery = 'INSERT INTO UserTable (name, address, n_id) VALUES (:name, :email, :message)';
  const insertParams = {
    name: name,
    email: email,
    message: message
  };

  oracledb.getConnection()
    .then((connection) => {
      connection.execute(insertQuery, insertParams)
        .then(() => {
          console.log('Data saved to the Oracle database');
          res.status(200).send('Data saved to the database.');
          connection.close();
        })
        .catch((error) => {
          console.error('Error saving data to Oracle database:', error);
          res.status(500).send('An error occurred while saving the data.');
          connection.close();
        });
    })
    .catch((error) => {
      console.error('Error getting Oracle database connection:', error);
      res.status(500).send('An error occurred while saving the data.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
