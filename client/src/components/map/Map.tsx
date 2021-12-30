import React,{useState, useEffect} from 'react'
import {GoogleMap, GoogleMapProps, useLoadScript} from '@react-google-maps/api';
import mapStyle from './mapStyle';
import './Map.css';

const libraries = ["places"];
const mapContainerStyle = {
  width: "20vw",
  height: "150px",
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
}

const Map = (coords: any) => {
    const [center, setCenter] = useState<any>();
    const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    })
        
    useEffect(() => {   
        setCenter(coords.coords)
    }, [coords])

    if (loadError) return <div>Error..</div>;
    if (!isLoaded) return <div>Loading map...</div>

    return (
        <div className='map'>
            <GoogleMap                
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
            />          
        </div>
    )
}

export default Map
