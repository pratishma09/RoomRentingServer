const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const cors = require("cors");

app.use(cors());
app.use(express.json()); 

require('dotenv').config()

app.get("/", (req, res) => {
  res.send("Welcome to express");
})

// Setting up middlewares
app.use(express.json()); 
app.use("/uploads",express.static("./uploads"));  

app.use((err, req, res, next) => {
  console.log(err.message);
})


// routes for backend
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/rooms"));

require("./db/conn");  //above app.listen
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})