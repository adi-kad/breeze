import React, {useState, useEffect} from 'react'
import axios from 'axios';
import DisplayCard from './DisplayCard';

interface Props {
    daily: []
}

const DailyPanel = (props: Props) => {
    return (
        <div className='dailyPanel'>  
            <div className='displayCards'>
                {props.daily.map((day: any) => (
                    <DisplayCard 
                        temp={{day: day.temp}} 
                        icon={day.weather[0].icon} 
                        hour={day.dt}/>
                ))}
            </div>      
        </div>
    )
}

export default DailyPanel
