//Defining core variables for the server to start

const express = require('express')
const app = express()
const cors = require('cors')
var mongoose = require("mongoose")

const port = process.env.PORT || 3000

const usernameDB = process.env.DB_USER
const passwordDB = process.env.DB_PASS

const bodyParser = require('body-parser')

var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://"+ usernameDB +":" + passwordDB + "@playerfinder-shard-00-00-umz1y.mongodb.net:27017,playerfinder-shard-00-01-umz1y.mongodb.net:27017,playerfinder-shard-00-02-umz1y.mongodb.net:27017/test?ssl=true&replicaSet=PlayerFinder-shard-0&authSource=admin&retryWrites=true&w=majority"

app.use('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//enable CORS pre-flight 
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./API/Routes/routes')
routes(app)

app.use(function (req, res) {
  res.status(200).send('WELCOME TO PLAYER FINDER')
})

app.listen(port)

//Be sure that the DB is alive
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting')
  } else {
    console.log('Succeeded connected')
  }
})

console.log('WELCOME TO PLAYER FINDER')

