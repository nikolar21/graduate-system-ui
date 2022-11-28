const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const mockFilesLocation = './data';
const port = process.env.MOCK_SERVE_PORT;
const reactAppEnv = process.env.REACT_APP_ENV;

if (reactAppEnv && reactAppEnv === 'mock') app.use(cors({origin: ['http://localhost:3000', 'http://192.168.0.168:3000']}));

app.get('/listUsers', (req, res) => {
  fs.readFile( `${mockFilesLocation}/users.json`, 'utf8', function (err, data) {
    res.send( data );
  });
});

app.post('/api/users', (req, res) => {
  fs.readFile(`${mockFilesLocation}/register.json`, `utf8`, (err, data) => {
    console.log(data);
    res.send({"message": "Successfully created user"});
  });
});

app.post('/api/auth/login', (req, res) => {
  fs.readFile(`${mockFilesLocation}/login.json`, `utf8`, (err, data) => {
    console.log(data);
    res.send( data );
  });
});

app.get('/api/projects', (req, res) => {
  fs.readFile(`${mockFilesLocation}/get-projects.json`, `utf8`, (err, data) => {
    console.log(data);
    res.send( data );
  });
});

app.get("/api/mentors", (req, res) => {
  fs.readFile(`${mockFilesLocation}/get-mentors.json`, `utf8`, (err, data) => {
    console.log(data);
    res.send( data );
  });
});

app.post("/api/mentors", (req, res) => {
  res.send([]);
});

app.get("/download/higgs-boson.pdf", (req, res) => {
  res.setHeader('Content-Type', 'application/octet-stream');
  res.sendFile(`./download-files/higgs-boson.pdf`, {root: __dirname});
  res.status(200);
});

app.get("/api/projects/1", (req, res) => {
  fs.readFile(`${mockFilesLocation}/get-project-1.json`, `utf8`, (err, data) => {
    console.log(data);
    res.send( data );
  });
});

app.get("/api/projects/1", (req, res) => {
  fs.readFile(`${mockFilesLocation}/get-project-2.json`, `utf8`, (err, data) => {
    console.log(data);
    res.send( data );
  });
});

app.listen(port, function () {
  console.log(`Mock server listening on port ${port}`)
});