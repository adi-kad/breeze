import React, {useCallback, useEffect} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import './TodayPanel.css';
import Map from '../map/Map';

interface Props {
    setPlace: React.Dispatch<React.SetStateAction<string>>,
    place: string,
    currentWeather: any,
    setWeather: React.Dispatch<React.SetStateAction<any>>,
    coords: any,
    setCoords: React.Dispatch<React.SetStateAction<any>>,
    unit: string
}

const TodayPanel = (props: Props) => {
    
    const handleSubmit = () => {
        // event.preventDefault();
        console.log("enter submit method");        
        axios.get(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEO_API_KEY}&query=${props.place}`)
        .then((response: any) => {       
            props.setCoords({ lat: response.data.data[0].latitude, lng: response.data.data[0].longitude, label: response.data.data[0].label});             
            fetchWeather(response.data.data[0].latitude, response.data.data[0].longitude);
        })
        .catch((error: any) => {
            console.log(error);            
        })
        .finally(() => props.setPlace(""));
    }
    
    const fetchWeather = (lat: any, lng: any) => {
        axios.get(`http://localhost:8080/api/forecast/all?lat=${lat}&lon=${lng}&unit=${props.unit}`)      
        .then((response: any) => {
            console.log(response);
            props.setWeather(response.data);
        })
        .catch((error: any) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/forecast/all?lat=${props.coords.lat}&lon=${props.coords.lng}&unit=${props.unit}`)      
        .then((response: any) => {
            console.log(response);
            props.setWeather(response.data);
        })
        .catch((error: any) => {
            console.log(error);
        })
    }, [props.unit])

    return (
        <div className='todayPanel'>
            <div className='input' onSubmit={handleSubmit}>
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
                     
            <div className="current_weather">            
                {props.currentWeather && <div className="current_weather_fields">      
                    <div>
                        <span className='current_weather_place'>{props.coords.label}</span>
                    </div>
                    <div className='current_weather_field'>
                        <span className='current_temp'>{Math.round( props.currentWeather.temp * 10 ) / 10}
                            <sup className='current_temp_unit'>{props.unit === "metric" ? '°C' : '°F'}</sup>                           
                        </span>                       
                    </div>
                    <div className='current_weather_field'>
                        {props.currentWeather.weather[0].main} 
                        <img src={`https://openweathermap.org/img/wn/${props.currentWeather.weather[0].icon}@2x.png`}/>
                    </div>   
                    <div className='current_weather_field'>
                        Feels like 
                        <span className="current_feels_like">{props.currentWeather.feels_like}</span>
                    </div>   
                    <div className='current_weather_field'>
                        Wind gust
                        <span className="current_wind_temp">{props.currentWeather.pressure} hPa</span>
                    </div>    
                </div>}               
            </div>

            <div className='maps'>
                <Map coords={props.coords}></Map>
            </div>

        </div>  
    )
}

export default TodayPanel
