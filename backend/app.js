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

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

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
