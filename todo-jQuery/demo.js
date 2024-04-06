var fs = require("fs");


console.log('---Start Reading File---');

fs.readFile("help.txt",(err, data)=>{
    if(!err){
        console.log(data.toString());
    } else {
        console.log(err);
    }
});

console.log('---Reading File Completed---');