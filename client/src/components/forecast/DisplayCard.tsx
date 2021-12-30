import React, {useEffect, useState} from 'react';
import './DisplayCard.css';

interface Props {
    dt_day?: string,
    dt?: string,
    hour?: number,
    icon: string,
    temp: {
        day: number,
        min?: number,
        max?: number
    }
}

const DisplayCard = (props: Props) => {
    return (
        <div className='displayCard'>
            <div className='displayCard_date'>
                {props.dt_day && <h5 className='displayCard_day'>{props.dt_day}</h5>}
                {props.hour ? <h5 className='displayCard_hour'>{props.hour}:00</h5> : <h5 className='displayCard_dt'>{props.dt}</h5>}
            </div>           
            <img className='displayCard_icon' src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}/>
            <h5 className='displayCard_temp'>{Math.round( props.temp.day * 10 ) / 10}</h5>
            {props.temp.min && props.temp.max &&  <div className='displayCard_temp_range'>
                <span className='temp_range_min'>{props.temp.min}</span>
                <span className='temp_range_min'>/</span>
                <span className='temp_range_max'>{props.temp.max}</span>
            </div>
            }                            
        </div>
    )
}

export default DisplayCard
