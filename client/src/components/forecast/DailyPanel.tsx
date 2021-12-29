import React, {useState, useEffect} from 'react'
import axios from 'axios';

// 4. varför props? för att "säga" att daily panelen ska innehålla en viss information
// 5. som passas in från forecast panelen
interface Props {
    coords: {
        lat:number,
        lng: number
    }
}


const DailyPanel = (props: Props) => {

    // 8. skapar funktion
    const [dailyWeather, setDailyWeather] = useState<any>();

    // 1. vad vill vi visa upp?
    // 2. hur ska vi få tag på datan?
    // 3. för att få tag på datan behöver jag platsens koordinater
    useEffect(() => {
        axios.get(`http://localhost:8080/api/forecast/daily?lat=${props.coords.lat}&lon=${props.coords.lng}`)
        // 6. vad vill vi göra med datan som vi får?
        .then((response:any) => {
            // 7. behöver en funktion som "sparar"/sätter det vi vill ha
            // 9. Stuck!!!!
            console.log(response);
            setDailyWeather(response.data);
            //console.log(dailyWeather);
        })
        // 10. hantera fel
        .catch((error: any)=> {
            console.log(error);
        })
    },[props.coords])

    return (
        <div className='dailyPanel'>
            <div>
            
            </div>
        </div>
    )
}

export default DailyPanel
