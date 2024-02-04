require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

//DB Connections
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB CONNECTED");
});
// const corsOptions = {
//   origin: "*", // Allow requests from this origin
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
// };
//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});
app.use(
  cors({
    origin: true,
  })
);
//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes); ///middileware to handel it
app.use("/api", blogRoutes);

//PORT
const port = process.env.PORT || 8000;

app.get("/", (req, res) => res.send("Backend Server Running Successfully"));

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
