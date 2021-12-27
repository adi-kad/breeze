import { useEffect, useState } from 'react';
import './App.css';
import TodayPanel from './components/todayPanel/TodayPanel';
import axios from 'axios';

function App() { 
  const [current, setCurrent] = useState<any>(); 
  const [location, setLocation] = useState<string>("");
  const [coords, setCoords] = useState<any>();
  const geoApiKey = "f7a14b99b20d28069cd6e39e6eaa5639";

  useEffect(() => {
    //if user has geolocation enabled we get current position as default location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {            
        axios.get(`http://localhost:8080/api/forecast/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)        
        .then((response: any) => {
          setCoords({ lat: position.coords.latitude, lon: position.coords.longitude })  
          setCurrent(response.data);
        })
        .catch((error: any) => {
          console.log(error);          
        })
      });
    } else { //Norrköping set to default location if no geolocation is enabled
      axios.get(`http://api.positionstack.com/v1/forward?access_key=${geoApiKey}&query=Norrköping`)
      .then((response: any) => {
        const {latitude, longitude} = response.data.data[0];
        setCoords({lat: latitude, lon: longitude});
        setLocation("Norrköping"); 
      })
      .catch((error: any) => {
        console.log(error);            
    })  
  }}, [])

  return (
    <div className="App">          
      <div className='sidebar'>
        <TodayPanel location={location} setLocation={setLocation} weatherData={current}/>
      </div>
      <div className='main'>
      
      </div>
    </div>
  );
}

export default App;
