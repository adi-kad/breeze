import React, {useState, useEffect} from 'react'
import './ForecastPanel.css';
import axios from 'axios';
import DailyPanel from './DailyPanel';
import WeeklyPanel from './WeeklyPanel';

interface Props {
    daily: [],
    weekly: [],
    unit: string,
    setUnit: React.Dispatch<React.SetStateAction<string>>

}

export const ForecastPanel = (props: Props) => {
    const [alternative, setAlternative] = useState<string>("daily");

    const handleAlternative = (event: any) => {
        setAlternative(event.target.id)
    }

    const handleUnit = (event: any) => {
        props.setUnit(event.target.id)
    }

    return (
        <div className='forecast'>
            <div className='forecast_options'>
                <div className='forecast_alternatives'>
                    <button className={`forecast_alt ${alternative === "daily" ? "alt-active" : ""}`} id="daily" onClick={handleAlternative}>Today</button>
                    <button className={`forecast_alt ${alternative === "weekly" ? "alt-active" : ""}`} id="weekly"  onClick={handleAlternative}>Week</button>
                </div>
                <div className='forecast_units'>
                    <button className={`forecast_unit ${props.unit === "metric" ? "unit-active" : ""}`} id="metric" onClick={handleUnit}>°C</button>
                    <button className={`forecast_unit ${props.unit === "imperial" ? "unit-active" : ""}`} id="imperial" onClick={handleUnit}>°F</button>
                </div>
            </div>
            <div className='forecast_display'>            
                { alternative === "daily" ? <DailyPanel daily={props.daily}/> : <WeeklyPanel weekly={props.weekly}/> }               
            </div>
        </div>
    )
}
