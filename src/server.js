
const express = require("express");
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream') // version 2.x
require('dotenv').config();

const cors = require("cors");
const bodyParser = require("body-parser");
const db =require('./config/mongo-db-connection');

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// create a rotating write stream
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(process.env.LOG_PATH || process.env.PWD, 'log')
})
app.use(morgan('combined', { stream: accessLogStream }))

const todoRoutes = require("./routes/todo.route");
app.use("/api", todoRoutes);

app.get('/',function(req,res){
    res.status(200).send(`Welcome to todo apis`);
});

app.listen(port, () => {
    console.log(`Server started, running on http://localhost:${port}`);
});
