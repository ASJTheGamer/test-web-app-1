const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.text())
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

let idCounter; // Declare the idCounter variable

fs.readFile('users.json', (err, data) => {
  if (err) {
    console.log(err);
    idCounter = 1; // Set the idCounter to 1 if there is an error reading the file
  } else {
    const users = JSON.parse(data);
    idCounter = users.length + 1; // Set the idCounter to the number of ids in the file plus 1
  }
});

let users = []; // Declare the users array outside of the readFile callback

fs.readFile('users.json', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    users = JSON.parse(data); // Update the users array with data from the file
  }
});

app.get('/users', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading JSON file');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/userp', (req, res) => {
  const newUser = {
    id: idCounter++,
    name: req.body.name
  
  }
  // Append the new user to the users array
  users.push(newUser);
  fs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error writing JSON file');
    } else {
      res.send('JSON file written successfully');
    }
  });
});

app.post('/getext', (req, res) =>{
    res.send("POST sent!")
})

app.listen(port, function(err) {
  if(err) console.log(err);
  console.log(`Example app listening on port ${port}`)
})