import express from "express";
import cors from 'cors';
import fetch from "node-fetch";
import {unixToHours, kelvinToCelsius, kelvinToFahrenheit, getDayToString} from "./helpers.js";
const app = express();
const PORT = 8080;
const APP_ID = "569934fac37ea4f4469419cf3814e561";

app.use(express.json());
app.use(cors());

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//GET current forecast
app.get('/api/forecast/current', async (req, res) => {    
    const {lat, lon} = req.query;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`);
        const data = await response.json();   
        
        if (data.cod == "400") {
            return res.status(400).send("Arguments are not valid");
        }

        const currentForecast = {
            ...data.current,
            dt: unixToHours(data.current.dt), 
            dt_day: weekDays[getDayToString(data.current.dt)]
        }

        return res.status(200).send(currentForecast);
    } catch (error) {
        return res.send(error);
    }
})

//GET hourly (48h) forecast
app.get('/api/forecast/daily', async (req, res) => {
    const {lat, lon} = req.query;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`);
        const data = await response.json();   
        
        if (data.cod == "400") {
            return res.status(400).send("Arguments are not valid");
        }

        const hourlyForecast = data.hourly.map(hour => hour = {
            ...hour, 
            dt: unixToHours(hour.dt), 
            dt_day: weekDays[getDayToString(data.current.dt)]
        });

        return res.status(200).send(hourlyForecast);        
    } catch (error) {
        return res.send(error);
    }    
})

//GET weekly forecast
app.get('/api/forecast/weekly', async (req, res) => {
    const {lat, lon} = req.query;

    try {
        const celsiusResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`);
        const fahrenheitResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APP_ID}`);
        const celsiusData = await celsiusResponse.json();
        const fahrenheitData = await fahrenheitResponse.json();

        if (celsiusData.cod == "400" || fahrenheitData.cod == "400") {
            return res.status(400).send("Arguments are not valid");
        }                   
        
        for (let i = 0; i < celsiusData.daily.length; i++) {
           celsiusData.daily[i].dt_day = weekDays[getDayToString(celsiusData.daily[i].dt)];
           fahrenheitData.daily[i].dt_day = weekDays[getDayToString(celsiusData.daily[i].dt)];
        }

        return res.status(200).send({
            celsius: celsiusData.daily, 
            fahrenheit: fahrenheitData.daily,
        });   
    } catch (error) {
        return res.json(error);
    }
})

app.listen(PORT, () => {
    console.log("Server is up and running on port 8080");
})
