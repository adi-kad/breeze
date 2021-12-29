import React, {useState, useEffect} from 'react';
import axios from 'axios';

interface Props {
    coords: {
        lat: number,
        lng: number,
    }
}

const WeeklyPanel = (props: Props) => {
    const [weeklyWeather, setWeeklyWeather] = useState<any>();
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/forecast/weekly?lat=${props.coords.lat}&lon=${props.coords.lng}`)
        .then((response: any) => {
            console.log(response)
           setWeeklyWeather(response.data)
        })
        .catch((error: any) => {
            console.log(error);            
        })
    }, [props.coords])

    return (
        <div className='weeklyPanel'>
            <div>
                {weeklyWeather && <div>
                   {weeklyWeather.celsius.map((day: any) => (
                       <h4>{day.temp.day}</h4>
                   ))}
                </div>}
            </div>
        </div>
    )
}

export default WeeklyPanel
