
import React from 'react'
interface Props {
    title: string,
    value: number | {
        sunrise: number,
        sunset: number
    },


}

const HighlightCard = (props: Props) => {
    return (
        <div className='highlightCard'>
            <h4 > {props.title} </h4>
            {console.log(props.value)}
        </div>
    )
}

export default HighlightCard
