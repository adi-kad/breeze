import HighlightCard from "./HighlightCard";

interface Props {
    current: {
        pressure: number,
        sunrise: number,
        sunset: number, 
        visibility: number,
        wind_speed: number,
        humidity: number
    }

}

export const HighlightPanel = (props: Props) => {
    return (
        <div className="highlightPanel">
            <div className="displayHighlightCards">
                <HighlightCard title="pressure" value={props.current.pressure}/>
                <HighlightCard value={{sunset: props.current.sunset, sunrise: props.current.sunrise}} title="sunset"/>

            </div>            
        </div>
    )
}

export default HighlightPanel
