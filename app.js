const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


app.get("/", (req, res) => {



    res.sendFile(__dirname + "/index.html");




})



app.post("/", (request, res) => {

    const query = request.body.CityName;
    const apiKey = "c3b1a486d93ba64853b78cbdf9b25275";
    const units = "metric"


    url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, response => {


        console.log(response.statusCode);
        response.on("data", (data) => {



            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const temp = weatherData.main.temp;
            const windSpeed = weatherData.wind.speed;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            const imgUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";




            res.write(`<h1>The weather condition of <span style = "color:red;text-align:center">"${cityName}"</span> is ${weatherDescription}.</h1>`);
            res.write(`<p><i style = "color:blue">The temparature of ${cityName} is ${temp} degree celcius.The wind speed is ${windSpeed}</i></p>`);
            res.write(`<img src = ${imgUrl}>`);
            res.send();


        })



    })





})











app.listen(3000, () => {

    console.log("server started on port 3000");


})