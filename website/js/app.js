// This file include the code for the client side 


// the Open weather map API call format is 
// api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
// Using Zip as guided through the project rubric 

// global variables 
const baseURL='http://api.openweathermap.org/data/2.5/weather';
const apiKey='2dc80598a00a7d91b9cc7fa15b44a39e';



// init fucntion to initailize all the elements at the application start
function init(){

const dateElement=document.getElementById('date');
const todayDate=new Date();
dateElement.innerText=todayDate.toDateString();
}

// API Calls Here 
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
    const zipCode = document.getElementById('zipCode').value;
    const feeling=document.getElementById('feeling').value;
    const tempElement=document.getElementById('temp');
    let WeatherMode=weather[0];
      getCurrentWeatherData(zipCode) .then(function(data){
    
            console.log(data);    
            const weatherPart=data.weather[0];
            const mainTempPart=data.main;
            console.log(weatherPart.main);
            switch(weatherPart.main.toLowerCase())
            {
                case 'clear':
                    WeatherMode=weather[4];
                    break;
                case 'smoke':
                    WeatherMode=weather[1];
                    break;
                case 'rain':
                    WeatherMode=weather[2];
                    break;    
                case 'snow':
                    WeatherMode=weather[0];
                    break;
                case 'clouds':
                {
                    WeatherMode=weather[1];
                    break;
                }
                default:
                    WeatherMode=weather[4];
                    break;
    
            }
           
        
            tempElement.innerHTML=` ${Math.round(mainTempPart.temp)} <span> C </span> <br> <span style='Font-size:24px;'>feels like: ${mainTempPart.feels_like} C</span>`;
            WeatherMode.name=weatherPart.main;
            changeWeather(WeatherMode);
    
        

      });
    
    
   
    

}

init();