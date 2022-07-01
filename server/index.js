import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true })); //limit is for images, extended is for console deprecated warnings
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); //TODO: why is needed?

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

const CONNECTION_URL=`mongodb+srv://blogger:${process.env.DB_PASSWORD}@my-blog-cluster.qjell.mongodb.net/?retryWrites=true&w=majority`;
mongoose
.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})//useNewUrlParser, useUnifiedTopology are for warning messages to remove
.then(()=>{
  app.listen(port, () => {
    console.log(`server runs on http://localhost:${port}`);
  });

})
.catch((error)=>{
  console.error(error.message);
})

