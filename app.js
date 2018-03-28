var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

const cors = require('cors');

var app = express();
let socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);

socketServer.listen(3002, function(){
    console.log('Socket server listening on : 3002');
});

const {datastore} = require('nedb-promise');
let allData = datastore({ filename: './data/allData.db', autoload: true });
global.allData = allData;
global.ios = io;

async function populate(){
    let x = await allData.insert({username:"reejh",password:"31edko9j1",domain:"test",fp_id:"4"});
    console.log(x);
}

populate();

const test = require('./routes/test')(io);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/users', users);
app.use('/identify',test.identify);
app.use('/hello',test.hello);
app.use('/enroll',test.enrollUser);
app.use('/addDomain',test.addDomain);

module.exports = app;
