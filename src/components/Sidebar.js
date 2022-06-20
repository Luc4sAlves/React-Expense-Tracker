import React from "react";

export default function Sidebar(props){

    function monthYear(current){

        /* get the name of current.month */
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const month = monthNames[current.month - 1]
        
        /*get the first 3 letters of monthName*/
        const monthNameShort = month.substring(0, 3)

        return `${monthNameShort}/${current.year}`	
    }

    const monthElements = props.monthList.map((month, index) => (
        <div key={month.id}>
            <div
                className={`title ${
                    month.id === props.currentMonth.id ? "selected-month" : ""
                }`}
                onClick={() => props.setCurrentMonthId(month.id)}
            >
                <h4 className="text-snippet">{monthYear(month)}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteMonth(event, month.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))
    
    return(
        <section className="sidebar">
            <div className="sidebar-header">
                <h3>Lists</h3>
                <button className="new-month-button" onClick = {props.createMonth}>+</button>
            </div>
            {monthElements}
        </section>
    )
}