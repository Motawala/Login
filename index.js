const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
var fs = require('fs');
const mongoose = require('mongoose')
const router = express.Router();
const consolidate = require('consolidate')
const session = require('express-session')
const mongoDBsession = require('connect-mongodb-session')(session);
//Import MongoClient and URI
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kapatel:Kp2992002@cluster0.ygitbgz.mongodb.net/Testuser";
const userRoutes = require('./routes/user')
require('dotenv').config();


//Store the session key in mongodb
const store = new mongoDBsession({
  uri: uri,
  collection: "Session"
})


//Create Sessions 
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // Set the session age to 2 hours (in milliseconds)
  },
}))

//Create a monogdb session to save our login sessions

app.use(express.json());


// Serve static assets from the /public folder
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(path.join(__dirname, "auth_config.json"));
});

app.get('/dashboard', (req,res) =>{
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use('/user', userRoutes)

//Set the views(HTML)
app.engine('html', consolidate.swig)
app.set('views', path.join(__dirname, './src'));
app.set('view engine', 'html');
const hostname = '0.0.0.0'

// Listen on port 3000
app.listen(5000,  () => console.log("Application running on port 5000"));


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//Connect to Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB CONNECTED")
}).catch((error) => {
  console.log("UNABLE to connect to DB", error)
})



app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));





// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//Attempt to connect to the mongoDB Client
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);


module.exports = session;





