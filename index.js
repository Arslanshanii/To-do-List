import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var tasks = [""];
var complete = [""];

app.set('view engine', 'ejs');
app.use(express.static("public")); 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render('index.ejs',{ task: tasks,
      complete:complete
    });
   
    //Step 1 - Make the get route work and render the index.ejs file.
  });



//the task array with initial placeholders for added task

//post route for adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
//add the new task from the post route into the array
    tasks.push(newTask);
    console.log(newTask);
//after adding to the array go back to the root route
    res.redirect("/");
});
//render the ejs and display added task, task(index.ejs) = task(array)

//the completed task array with initial placeholders for removed task

app.post("/removetask", function(req, res) {
     var completeTask = req.body.check;
//check for the "typeof" the different completed task, then add into the complete task
if (typeof completeTask === "string") {
     complete.push(completeTask);
//check if the completed task already exist in the task when checked, then remove using the array splice method
  tasks.splice(tasks.indexOf(completeTask), 1);
} else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {     complete.push(completeTask[i]);
    tasks.splice(tasks.indexOf(completeTask[i]), 1);
}
}
   res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });