import React from "react";

export default function Greet(props){
    return(
        <div className="greet">
            <h1>You are not tracking any expenses</h1>
            <button 
                className='form-button' 
                onClick = {props.createMonth}
            >
                Start tracking this month
            </button>
        </div>
    )
}
