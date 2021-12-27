import React from 'react'
import './TodayPanel.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    location: string,
    weatherData: any
}

const TodayPanel = (props: Props) => {
    return (
        <div className='todayPanel'>
            <div className='todayPanel_input'>
                <SearchIcon className="search_icon"/>
                <input type="text" value={props.location} placeholder='Enter location' onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setLocation(event.target.value)}/>
                <button onClick={() => props.setLocation("")}>
                    <ClearIcon className="clear_icon"/>
                </button>                
            </div>                     
        </div>  
    )
}

export default TodayPanel
