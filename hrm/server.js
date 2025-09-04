const express = require("express");
const mongoose = require("mongoose");
const { connect } = require("mongoose");
const { PORT, MONGODB_URL } = require("./config");
const { engine } = require("express-handlebars");
const { join } = require("path");
const Handlebars = require("handlebars");
const app = express();
const methodOverride = require("method-override");
const EmployeeRoute = require("./Route/employee");
const AuthenticatedRoute = require("./Route/auth");
const passport = require("passport");
const session = require("express-session");
require("./middleware/passport")(passport);

//database connection
let DatabaseConnection = async () => {
  mongoose.set("strictQuery", false);
  await connect(MONGODB_URL);
  console.log("Database connected");
};
DatabaseConnection();
//database connected end

//template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
//template engine end

//build in middileware
app.use(express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "node_modules")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//build in middleware end

//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  })
);

//connect flash  middleware
// app.use(flash());

//Handlebar register Helper
Handlebars.registerHelper("trimString", function (passedString) {
  return passedString.slice(6);
});
//Handlebar register Helper end
app.use(passport.initialize());
app.use(passport.session());

// global variables

app.use("/employee", EmployeeRoute);
app.use("/auth", AuthenticatedRoute);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${PORT}`);
});
