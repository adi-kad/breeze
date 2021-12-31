import HighlightCard from "./HighlightCard";
import './HighlightPanel.css'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface Props {
    current: {
        pressure: number,
        sunrise: number,
        sunset: number, 
        visibility: number, 
        wind_speed: number,
        humidity: number,
        uvi: number,
        clouds: number,
        wind_deg: number
    },
    unit: string
}

export const HighlightPanel = (props: Props) => {
    return (
        <div className="highlightPanel">
            <div className="title">Today's Highlights</div>
            <div className="displayHighlightCards">
                <div className="highlightCard">
                    <div className="card-title">Pressure</div>
                    <div className="card-value">{props.current.pressure}  <span className="card-value-unit">hPa</span></div>
                </div>
                <div className="highlightCard">
                    <div className="card-title">Visibility</div>
                    <div className="card-value">{props.current.visibility}  <span className="card-value-unit">m</span></div>
                </div>
                <div className="highlightCard">
                    <div className="card-title">Sunrise & Sunset</div>
                    <div className="card-value-sun">
                        <WbSunnyIcon/>
                        <div>{props.current.sunrise}</div>
                    </div>
                    <div className="card-value-sun">
                        <DarkModeIcon/>
                        <div>{props.current.sunset}</div>
                    </div>
                </div>
                <div className="highlightCard">
                    <div className="card-title">Wind Speed</div>
                    <div className="card-value">{props.current.wind_speed}  <span className="card-value-unit">{props.unit === "metric" ? 'm/s' : 'mi/h'}</span></div>
                </div>
                <div className="highlightCard">
                    <div className="card-title">Humidity</div>
                    <div className="card-value">{props.current.humidity}  <span className="card-value-unit">%</span></div>
                </div>
                <div className="highlightCard">
                    <div className="card-title">Clouds</div>
                    <div className="card-value">{props.current.clouds}  <span className="card-value-unit">%</span></div>
                </div>
                <div className="highlightCard">
                    <div className="card-title">UV Index</div>
                    <div className="card-value">{props.current.uvi}</div>
                </div>
                <div className="highlightCard">
                    <div className="card-title">Wind Degree</div>
                    <div className="card-value">{props.current.wind_deg}</div>
                </div>
            </div>            
        </div>
    )
}

export default HighlightPanel
