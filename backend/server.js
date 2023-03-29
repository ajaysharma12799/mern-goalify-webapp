const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/error.middleware");
const connectDB = require("./config/DBConfig");
const Port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "developement") {
  require("dotenv").config();
}

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Working Fine"); // Test API endpoint
});

app.use("/api/goals", require("./routes/goals.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use(errorHandler); // Custom Error Middleware Handler

app.listen(Port, (error) => {
  if (error) {
    console.log(error.message);
  }
  console.log(`Server Running on Port ${Port}`);
});
