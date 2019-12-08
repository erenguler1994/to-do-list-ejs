//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const dateF = require(__dirname + "/date.js");
const app = express();
const newTodoList = ["Dishes","Loundry","Clean up"];
const workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
//css in yolunu belirtmek icin express ile
app.use(express.static("public"));
app.get("/", function(req, res) {

  const days = dateF.getDate();
  res.render("lists", {headerPurpose: days, addedTodo: newTodoList});
});

app.post("/", function(req, res) {
  const item = req.body.addTodo;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    newTodoList.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("lists", {headerPurpose: "Work", addedTodo: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server started working on port 3000");
});
