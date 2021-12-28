import React, {useCallback, useEffect} from 'react'
import './TodayPanel.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

interface Props {
    setPlace: React.Dispatch<React.SetStateAction<string>>,
    place: string,
    todayWeather: any,
    setTodayWeather: React.Dispatch<React.SetStateAction<any>>,
    coords: any,
    setCoords: React.Dispatch<React.SetStateAction<any>>,
}

const TodayPanel = (props: Props) => {
    
    const handleSubmit = () => {
        // event.preventDefault();
        console.log("enter submit method");        
        axios.get(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEO_API_KEY}&query=${props.place}`)
        .then((response: any) => {    
            console.log("Enter then method")    
            console.log(response);
            props.setCoords({ lat: response.data.data[0].latitude, lon: response.data.data[0].longitude });
            fetchWeather(response.data.data[0].latitude, response.data.data[0].longitude);
        })
        .catch((error: any) => {
            console.log(error);            
        })
        .finally(() => props.setPlace(""));
    }
    
    const fetchWeather = (lat: any, lon: any) => {
        axios.get(`http://localhost:8080/api/forecast/current?lat=${lat}&lon=${lon}`)      
        .then((response: any) => {
            props.setTodayWeather(response.data);
            console.log(response)
        })
        .catch((error: any) => {
            console.log(error);
        })
    }

    return (
        <div className='todayPanel'>
            
            <div className='input box-shadow' onSubmit={handleSubmit}>
                <SearchIcon className="search_icon"/>
                <input 
                    type="text" 
                    value={props.place} 
                    placeholder='Enter location' 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setPlace(event.target.value)}    
                    onKeyPress={(event: any) => {
                        if (event.key === "Enter") return handleSubmit()
                    }}               
                />                    
                <button onClick={() => props.setPlace("")}>
                    <ClearIcon className="clear_icon"/>
                </button>                            
            </div>      
           
           {props.todayWeather && <div className="display_current">
                <div className='display_current_day'>
                    <div>Tuesday <span>16:00</span></div>
                </div>

                <div className='display_current_desc'>
                    <div className='display_current_temp'>
                        <p className='current_temp'>{props.todayWeather.temp_C}</p>
                        <p className='current_temp_feelsLike'>Feels like {props.todayWeather.feels_like}</p>
                    </div>
                    <div className='display_current_weatherIcon'>
                        <img src={`https://openweathermap.org/img/wn/${props.todayWeather.weather[0].icon}@2x.png`}/>
                        <p>{props.todayWeather.weather[0].main}</p>
                    </div>
                </div>    

                <div className='display_current_maps'>

                </div>       
           </div>
           } 
        </div>  
    )
}

export default TodayPanel
