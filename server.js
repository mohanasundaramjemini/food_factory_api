require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connection successful"));

app.use(
  session({
    secret: "food factory",
    name: "food factory",
    proxy: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());

// Routes Start Here
const users = require("./routes/users");
app.use("/api/users", users);

const orders = require("./routes/orders");
app.use("/api/orders", orders);

app.listen(3000, () =>
  console.log("Server started and listening on port 3000")
);
