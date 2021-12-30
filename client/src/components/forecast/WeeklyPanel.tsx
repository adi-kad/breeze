import DisplayCard from './DisplayCard';
import './ForecastPanel.css';

interface Props {
    weekly: []
}

const WeeklyPanel = (props: Props) => {
    return (
        <div className='weeklyPanel'>          
            <div className='displayCards'>
            {props.weekly.map((day: any) => (
                 <DisplayCard 
                 dt_day={day.dt_day} 
                 dt={day.dt}       
                 icon={day.weather[0].icon}  
                 temp={{ day: day.temp.day, min: day.temp.min, max: day.temp.max}} 
             />
            ))}                                                                                     
            </div>
        </div>
    )
}

export default WeeklyPanel
