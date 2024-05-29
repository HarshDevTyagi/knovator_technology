require("./config/db");

const express=require("express");
const bodyParser = require('body-parser');
const cors=require("cors");
const routes=require("./routes");


const app=express();

app.use(cors());
app.use(bodyParser());
app.use("/api/v1",routes);

module.exports=app;
