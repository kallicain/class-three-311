//import express framework
let express = require("express");
//create application object
let app = express();
//make sure application parses json
app.use(express.json());
//define the port that the app will listen on
let PORT = 9091;
// 5 different routes that need to be defined and implemented
let database = [];
let count = 1;
//first - define route that will add entry
app.post("/todos", function(req, res){
  //title
  let t = req.body.title;
  //notes
  let n = req.body.notes;
  //create new object
  //title and notes of new object using orig title and notes
  let newEntry = {
    title: t,
    notes: n,
    id: count,
  }
  count++;
  database.push(newEntry);
  // sends status code only -> res.sendStatus(204);
  // send status code and json text -> res.status(201).json(newEntry);
  res.json(newEntry);
});
//second - define route that will list summaries for enteries
app.get("/todos", function(req, res){
  let notes = database.map(function(element){
    let note = {};
    note.notes = element.notes;
    note.done = element.done;
    note.id = element.id;
    return note;
  });
  res.json(notes);
});

//third - define route that will get details of one entry
app.get("/todos/:id", function(req, res){
  //loop through database arr and create new arr 
 let id = req.params.id;
 let findId = database.find(function(element){
  if(element.id == id) {
    return true;
  } else {
    return false;
  }
 });
 res.json(findId);
});
//fourth - define route that will delete an entry
app.delete("/todos/:id", function(req, res){
  let id = req.params.id;
  let indexToDelete = database.findIndex(function(element){
    if(element.id == id){
      return true;
    } else {
      return false;
    }
  });
  if(indexToDelete > -1){
    database.splice(indexToDelete, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
//fifth - define route that will update an entry
app.put("/todos/:id", function(req, res){
  let id = req.params.id;
  let title = req.body.title;
  let notes = req.body.notes;
  let done = req.body.done == true;
  let findEntry = database.find(function(element){
    if(element.id == id){
      return true;
    } else {
      return false;
    }
  });
  if(findEntry){
    findEntry.title = title;
    findEntry.notes = notes;
    findEntry.done = done;
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
  res.json("PUT /todos/:id");
})
//start application on port
app.listen(PORT, function(){
  console.log("To Do App Started on Port:", PORT);
})