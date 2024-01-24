const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 4000;
const { connection } = require("./config/db");

const { authenticate } = require("./middleware/authenticate");

const userRouter = require("./routes/user.routes");
const photographerRouter = require("./routes/movie.route");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/movies", photographerRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log(error);
    console.log("Couldn't connect to MongoDB Atlas");
  }
  console.log("Listening at port:", port);
});
