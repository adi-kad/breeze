import express from "express";
import cors from 'cors';
import fetch from "node-fetch";

const app = express();
const PORT = 8080;
const APP_ID = "569934fac37ea4f4469419cf3814e561";

app.use(express.json());
app.use(cors());

app.get('/api/forecast/hourly', async (req, res) => {
    /*TODO
    * split at current time and return forecast for rest of day.
    * check status code from weather api and return suitable data
    */
    const {lat, lon} = req.query;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APP_ID}`);
        const data = await response.json();   
        
        if (data.cod == "400") {
            return res.status(400).send("Arguments are not valid")
        }
               
        return res.status(200).send(data.hourly);
    } catch (error) {
        return res.send(error)
    }    
})

app.listen(PORT, () => {
    console.log("Server is up and running on port 8080");
})