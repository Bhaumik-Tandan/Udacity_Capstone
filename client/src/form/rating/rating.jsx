import React from 'react'

function Rating(props) {
    const r=props.rating;
    return (
            <h2>
                Rating: 
                {r==0?<span style={{"color":"red"}}>0</span>
                :r==1?<span style={{"color":"orange"}}>1</span>
                :r==2?<span style={{"color":"yellow"}}>2</span>
                :r==3?<span style={{"color":"green"}}>3</span>
                :r==4?<span style={{"color":"blue"}}>4</span>
                :<span style={{"color":"purple"}}>5</span>
                }
            </h2>
    )
}

export default Rating;
