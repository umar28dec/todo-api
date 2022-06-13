
const express = require("express");
require('dotenv').config();

const cors = require("cors");
const bodyParser = require("body-parser");
const db =require('./config/mongo-db-connection');

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const todoRoutes = require("./routes/todo.route");
app.use("/api", todoRoutes);


app.get('/',function(req,res){
    res.status(200).send(`Welcome to todo apis`);
});

app.listen(port, () => {
    console.log(`Server started, running on http://localhost:${port}`);
});
