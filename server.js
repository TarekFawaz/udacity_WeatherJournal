/// Application server Data 
/// Data will be maintained in memory through objects 
let projectData=[];


/// initialize Express JS 
const express =require('express');
/// constructing APP Object.
const app = express();

// initailze Body Parsser 
const bodyParser = require('body-parser');
// inject body parser configuration to express JS as Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// initailze Cores 
const cors =require('cors');
const { allowedNodeEnvironmentFlags } = require('process');
app.use(cors());

//bind to frontend  project folder :) 
app.use(express.static('website'))

//let Express JS use Cors to overcome XSS issue 
app.use(cors());

// setup server 
const serverPort=5566;
const server=app.listen(serverPort, () =>{
    console.log(`server started at port ${serverPort}`);
});

// Hint: Perfer to use Arrow function for more code readiblity 

// Get Route to retrive all the Project Data during the running session 
//expceted to just push the constructed array 
app.get('/list',(req,res)=>{
    res.status(200).send(projectData); // Make sure sending Http status code 200 OK 
});

// Post Route for save Data into Project data array (it jusut save into memory as long as server run)
//expected Object Format is {temp:'',Date:'',userResponse:''};

app.post('/addWeatherData',(req,res)=>{
    // Logging the received Data
    console.log(req.body);
    //add the received Object into the project Data Array 
    projectData.push(req.body);
    res.status(200).send(req.body);// Echo What Recieved and saved // Make sure sending Http status code 200 OK 
    
});

