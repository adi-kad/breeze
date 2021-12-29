import React, {useState, useEffect} from 'react'
import './ForecastPanel.css';
import axios from 'axios';
import DailyPanel from './DailyPanel';
import WeeklyPanel from './WeeklyPanel';

interface Props {
    coords: any
}

export const ForecastPanel = (props: Props) => {
    const [alternative, setAlternative] = useState<string>("daily");
    const [tempUnit, setTempUnit] = useState<string>("celsius");

    const handleAlternative = (event: any) => {
        setAlternative(event.target.id)
    }

    const handleUnit = (event: any) => {
        setTempUnit(event.target.id)
    }

    return (
        <div className='forecast'>
            <div className='forecast_options'>
                <div className='forecast_alternatives'>
                    <button className={`forecast_alt ${alternative === "daily" ? "alt-active" : ""}`} id="daily" onClick={handleAlternative}>Today</button>
                    <button className={`forecast_alt ${alternative === "weekly" ? "alt-active" : ""}`} id="weekly"  onClick={handleAlternative}>Week</button>
                </div>
                <div className='forecast_units'>
                    <button className={`forecast_unit ${tempUnit === "celsius" ? "unit-active" : ""}`} id="celsius" onClick={handleUnit}>°C</button>
                    <button className={`forecast_unit ${tempUnit === "fahrenheit" ? "unit-active" : ""}`} id="fahrenheit" onClick={handleUnit}>°F</button>
                </div>
            </div>
            <div className='forecast_display'>            
                { alternative === "daily" ? <DailyPanel/> : <WeeklyPanel coords={props.coords}/> }               
            </div>
        </div>
    )
}
