import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {  
  const [data, setData] = useState<any>(null);

  const params = {
    lat: 48.856613,
    lon: 2.352222
  }

  const convertToHours = (timestamp: number): number => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    return hours;
  }

  useEffect(() => {
   axios.get(`http://localhost:8080/api/forecast/hourly`, {params})
   .then((res: any) => {
     setData(res.data)
   })
   .catch((error: any) => {
     console.log(error);
   })
  }, [])

  return (
    <div className="App">
      <h1>Testing features</h1>
 
      {data && 
      <div>
        {data.map((hour: any) => (
          <h2>{convertToHours(hour.dt)}</h2>
        ))}
      </div>}
    </div>
  );
}

export default App;
