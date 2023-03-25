import React from 'react'
import ReactLoading from 'react-loading';
import "./loading.css";
function Loading(prop) {
    return (
        <div className="loading">
           <ReactLoading  type="spokes" color="red"/>
            <div>{prop.text}</div>
        </div>
    )
}

export default Loading;