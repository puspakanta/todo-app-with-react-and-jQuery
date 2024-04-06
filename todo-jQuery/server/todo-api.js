var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

var conStr = "mongodb://127.0.0.1:27017";

app.get("/users", (request, response)=>{

    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("todo");
        database.collection("users").find({}).toArray().then(documents=>{
            response.send(documents);
            response.end();
        });
    });

});

app.post("/register-user", (request, response)=>{

    var user = {
        UserId: request.body.RUserId,
        UserName: request.body.RUserName,
        Password: request.body.Password,
        Email:request.body.Email,
        Mobile: request.body.Mobile
    };

    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("todo");
        database.collection("users").insertOne(user).then(()=>{
            console.log("New User Added");
        });
    });

});

app.get("/appointments/:userid", (request, response)=>{
    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("todo");
        database.collection("appointments").find({UserId:request.params.userid}).toArray().then(documents=>{
            response.send(documents);
            response.end();
        });
    });
});

app.get("/get-byid/:id", (request, response)=>{
    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("todo");
        database.collection("appointments").find({Id:parseInt(request.params.id)}).toArray().then(documents=>{
            response.send(documents);
            response.end();
        });
    });
})

app.post("/add-task", (request, response)=> {
     var task = {
        Id: parseInt(request.body.Id),
        Title: request.body.Title,
        Date: new Date(request.body.Date),
        Description: request.body.Description,
        UserId: request.body.UserId
      };

    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("todo");
        database.collection("appointments").insertOne(task).then(()=>{
             console.log("Task Added");
             response.end();
        });
    });
});

app.put("/edit-task/:id", (request, response)=> {
    var id = parseInt(request.params.id);
    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("todo");
        database.collection("appointments").updateOne({Id:id},{$set:{Id:parseInt(request.body.Id), Title:request.body.Title, Date: new Date(request.body.Date), Description: request.body.Description, UserId: request.body.UserId}}).then(()=>{
            console.log("Task Updated");
            response.end();
        });
    });
});

app.delete("/delete-task/:id", (request, response)=>{
    var id = parseInt(request.params.id);
    mongoClient.connect(conStr).then(clientObject=>{
        var database = clientObject.db("todo");
        database.collection("appointments").deleteOne({Id:id}).then(()=>{
            console.log("Task Deleted");
            response.end();
        });
    });
});



app.listen(6060);
console.log("Server Started : http://127.0.0.1:6060");
