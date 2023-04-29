const bodyParser = require("body-parser");
const { error } = require("console");
const express = require("express");
const https = require("https");
const app = express();
const request = require("request");
const date = require(__dirname + "/date.js");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
 
let query;
let temp;
let icon;
let cloudy;
let humidity;
let wind;
let weatherDescription;
let imageUrl;
let icon1;
let rain;
// const weatherData = JSON.parse(data);
             
app.get("/",function(req,res){
    let day = date.getDate();
    // res.sendFile(__dirname + "index.ejs");
    
     res.render("index",{  description : weatherDescription , wind : wind ,cityName : query ,cloudyPercent: cloudy ,kindOfDay : day , temp1 : temp, humidity : humidity});
      
});

app.post( "/" , function(req,res){
   
    query = req.body.cityName;
    
    const apiKey = "30129fd63ae5b7eaa7a66eecb5e0260c";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey+ "&units=metric";
    https.get(url , function(response){
        
        
        response.on("data" , function(data){
            
            const weatherData = JSON.parse(data);
            temp = Math.floor(weatherData.main.temp);
            icon = weatherData.weather[0].icon;
            cloudy = weatherData.clouds.all;
            humidity = weatherData.main.humidity;
            rain = weatherData.rain;
            wind = weatherData.wind.speed;
            imageUrl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
            icon1 = ("<img src = " + imageUrl + ">");
             
             
            weatherDescription = weatherData.weather[0].description;
            res.redirect("/")
            // res.write("<h1>  The weather is currently <h1/>" +  weatherDescription  );
            // res.write("<h1>The temperature in " +   query + " is "  + temp +  " degree celcius</h1>");
            // res.write("<img src = " +  imageUrl + ">");
            // res.send()
             
        });
    });
})


 









app.listen(3000,function(){
    console.log("server is running");
});