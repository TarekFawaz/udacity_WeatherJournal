// This file include the code for the client side 


// the Open weather map API call format is 
// api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
// Using Zip as guided through the project rubric 

// global variables 
const baseURL='http://api.openweathermap.org/data/2.5/weather';
const apiKey='2dc80598a00a7d91b9cc7fa15b44a39e';
const todayDate=new Date();


// init fucntion to initailize all the elements at the application start
function init(){

const dateElement=document.getElementById('date');

dateElement.innerText=todayDate.toDateString();

// Load Project Data if any 
// in Case user refershed the browser and there are some Data in the server
getCurrentProjectData('/list').then(function(projectData){
    console.log(projectData);// for training project purposes 
    listProjectData(projectData);
});

// add generate button event listenr 
const generateButtonElement=document.getElementById('generate');
generateButtonElement.addEventListener('click',generate);


}

// openweatherMap API Get Request  
const getCurrentWeatherData = async(zipcode)=>{
    
    const requestUrl=` ${baseURL}?appid=${apiKey}&zip=${zipcode}&units=metric `;
    const response =await fetch(requestUrl);
    
    try{
        
        return await response.json();
    }
    catch(error){
        console.log(error);
    }

};

//Local server Get Project Data Request 
const getCurrentProjectData = async(url)=>{
    const response= await fetch(url);
    try{
         return await response.json();
    }
    catch(error){
        console.error(error);
    }
};

// Local server Post Data request 
const postCurrentProjectData = async(url,data)=>{
    const response= await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        // body data must match contet type header
        body: JSON.stringify(data),

    });
    try{
         return await response.json();
    }
    catch(error){
        console.error(error);
    }
};


// This Comment is just guide while I', coding
/* expected Response is 
{"coord":{"lon":-122.09,"lat":37.39},
"weather":[{"id":711,"main":"Smoke","description":"smoke","icon":"50d"}]
,"base":"stations",
"main":{"temp":22.92,"feels_like":24.99,"temp_min":19,"temp_max":25.56,"pressure":1019,"humidity":82},
"visibility":9656,"wind":{"speed":2.1,"deg":360},
"clouds":{"all":5},"dt":1601495200,"sys":{"type":1,"id":5310,"country":"US","sunrise":1601474602,"sunset":1601517164},
"timezone":-25200,"id":0,"name":"Mountain View","cod":200}

*/

// Generate function is the event handler function for the button click -- binded through HTML OnClick 
function  generate(){
    const zipCode = document.getElementById('zipCode').value.trim();
    const feeling=document.getElementById('feeling').value;
    const tempElement=document.getElementById('temp');
    const feelsLikeElement=document.getElementById('feelsLike');
    const cityLikeElement=document.getElementById('city');
   
      getCurrentWeatherData(zipCode) .then(function(data){
    
            console.log(data);  
            if(data.cod==200){ // Make sure that API return with Valid Data
                const weatherPart=data.weather[0];
            const mainTempPart=data.main;
            console.log(weatherPart.main);
                         
            tempElement.innerHTML=` ${Math.round(mainTempPart.temp)} <span> C </span>`;
            feelsLikeElement.innerText=`feels like: ${mainTempPart.feels_like} C`;
            cityLikeElement.innerText=`${data.name} - ${data.sys.country}`;
            
            changeWeatherWrapper(weatherPart.main);
            postCurrentProjectData('/addWeatherData',{temp:Math.round(mainTempPart.temp),date:todayDate.toDateString(),userResponse:feeling,mode:weatherPart.main}).then(function(postData){
                console.log(postData);// for training project purposes 
                getCurrentProjectData('/list').then(function(projectData){
                    console.log(projectData);// for training project purposes 
                    listProjectData(projectData);
                });
            });  

            }  
            else
            {
                alert(data.message); // Alert is bad parctice , but I will keep it as it during training 
            }
            
        

      });
    
    
   
    

}

// Helper Method to format the historical project data 
function listProjectData(projectData){
    const itemElement=document.getElementById('items');
    itemElement.innerHTML='';
    projectData.slice().reverse().forEach(element => { // using reverse order to display recent elements at the top (as we use Push)-- Could handled in server side code using .unshift()
        itemElement.innerHTML+=` <b>Temp</b> <I>${element.temp}</I> --  <b>Date</b> <I>${element.date}</I> -- <b>User Resposne</b> <I>${element.userResponse}</I> 
        -- <b>Mode</b> <a href='#' class='modelink'>${element.mode}</a> <-- <I>you may click here to know weather mode</I> <hr><br> `;
    });
    const modesLinks=document.querySelectorAll('.modelink');
    modesLinks.forEach(modeLink=>{
        modeLink.addEventListener('click',(e)=>{
            e.preventDefault();
            changeWeatherWrapper(modeLink.innerText.trim().toLowerCase());

        }); 

    });

}




init();