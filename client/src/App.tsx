import { useEffect, useState } from 'react';
import './App.css';
import TodayPanel from './components/todayPanel/TodayPanel';
import axios from 'axios';
import { ForecastPanel } from './components/forecast/ForecastPanel';
import HighlightPanel from './components/highlightPanel/HighlightPanel';

function App() { 
  const [weather, setWeather] = useState<any>(); 
  const [place, setPlace] = useState<string>("");
  const [coords, setCoords] = useState<any>();
  const [unit, setUnit] = useState<string>("metric");
  const geoApiKey = process.env.REACT_APP_GEO_API_KEY;

  useEffect(() => {
    console.log(process.env.REACT_APP_GEO_API_KEY)    
    if ("geolocation" in navigator) { //if user has geolocation enabled we get current position as default location
      navigator.geolocation.getCurrentPosition(function(position) {            
        axios.get(`http://localhost:8080/api/forecast/all?lat=${position.coords.latitude}&lon=${position.coords.longitude}&unit=${unit}`)        
        .then((response: any) => {
          setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })  
          setWeather(response.data);        
          console.log(response.data);
        })
        .then(() => {
          axios.get(`http://api.positionstack.com/v1/reverse?access_key=${geoApiKey}&query=${position.coords.latitude},${position.coords.longitude}`)
          .then((response: any) => {
            setCoords((prev: any) => ({...prev, label: response.data.data[0].label}))
          })
        })
        .catch((error: any) => {
          console.log(error);          
        })
      });
    } else { //Norrköping set to default location if no geolocation is enabled
      axios.get(`http://api.positionstack.com/v1/forward?access_key=${geoApiKey}&query=Norrköping`)
      .then((response: any) => {        
        const {latitude, longitude} = response.data.data[0];
        setCoords({lat: latitude, lng: longitude});
        setPlace("Norrköping"); 
      })
      .catch((error: any) => {
        console.log(error);            
    })  
  }}, [])

  return (
    <div className="App">    
    {weather && 
      <div className='container'>
        <div className='sidebar'>
          <TodayPanel 
            place={place} 
            setPlace={setPlace} 
            currentWeather={weather.current}
            setWeather={setWeather}
            coords={coords}
            setCoords={setCoords}
            unit={unit}/>
        </div>
        <div className='main'>   
          {<ForecastPanel unit={unit} setUnit={setUnit} daily={weather.daily} weekly={weather.weekly}/> } 
          {<HighlightPanel unit={unit} current={weather.current}/>}
        </div>
      </div>}    

    {!weather && 
      <div className='loader'>
        Loading...
      </div>}  
    </div>
  );
}

export default App;
