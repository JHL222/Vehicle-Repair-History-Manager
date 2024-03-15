const express = require('express');
const app = express();
let path = require('path');
let sdk = require('./sdk');

const PORT = 8001;
const HOST = '0.0.0.0';
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/init', function (req, res) {
   let a = req.query.a;
   let aval = req.query.aval;
   let b = req.query.b;
   let bval = req.query.bval;
   let args = [a, aval, b, bval];
   sdk.send(false, 'Init', args, res);
});

app.get('/query', function (req, res) {
   let a = req.query.a;
   let args = [a];
   sdk.send(true, 'Query', args, res);
});

app.use(express.static(path.join(__dirname, '../client')));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
