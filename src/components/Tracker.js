import React, { useEffect } from "react";
import { nanoid } from "nanoid";

export default function Tracker(props){

    const [addingExpense, setAddingExpense] = React.useState(false)
    const [expense, setExpense] = React.useState({
        value: 0,
        description: '',
        category: '',
        recurrent: false,
        id: nanoid(),
    })

    function handleExpenseChange(event){
        const {name, value} = event.target
        setExpense(oldExpense => ({
            ...oldExpense,
            [name] : value
        }))
    }

    function addExpenseInput(){
        setAddingExpense(true)
    }

    function submitExpense(){
        props.addExpense(expense)
        props.changeMonthTotal(props.currentMonth.monthTotal + +expense.value)
        setAddingExpense(false)
        //setExpense to default
        setExpense({
            value: 0,
            description: '',
            category: '',
            recurrent: false,
        })
    }

    function handleTotalChange(event){
        props.changeBudget(event.target.value)
    }

    function totalColor(){
        if(props.currentMonth.monthTotal >= props.currentMonth.budget){
            return 'value-red'
        }
        else if(props.currentMonth.monthTotal < props.currentMonth.budget && props.currentMonth.monthTotal >= props.currentMonth.budget*70/100){
            return 'value-orange'
        }
        return 'value-green'
    }

    function switchRecurrent(expense){
        if (expense.recurrent === false){
            props.addRecurrent(expense)
        }
        else{
            props.removeRecurrent(expense)
        }
        expense.recurrent = !expense.recurrent
        props.changeRecurrent(expense)
    }

    function createReactTable(expenses){
        const table = []
        for (let i in expenses) {
            table.push(
                <tr>
                    <td>{expenses[i].description}</td>
                    <td>{expenses[i].value}</td>
                    <td>{expenses[i].category}</td>
                    <td
                        className={`recurrent ${expenses[i].recurrent ? 'checked' : 'not-checked'}`}
                        onClick = {() => switchRecurrent(expenses[i])}
                    >⟳</td>
                </tr>
            )
        }
        return (
            <table className="expense-table">
                <tr>
                    <th>Description</th>
                    <th>Value</th>
                    <th>Category</th>
                </tr>
                {table}
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td className={totalColor()}>{props.currentMonth.monthTotal}</td>
                    </tr>
                </tfoot>
            </table>
        )
    }

    return(
        <div className="tracker">
            <div className="top-info">
                <span className="top-text">Total available this month: <input type = "number" value={props.currentMonth.budget} onChange = {handleTotalChange}/></span>
            </div>
            <div className="expense-info">
                <button className = 'add-expense' onClick={addExpenseInput}>Add new expense</button>
                {addingExpense && 
                    <form className="add-expense-form">
                        <input 
                            type = "text" 
                            placeholder="description" 
                            className="form-input" 
                            name = "description"
                            value = {expense.description}
                            onChange = {handleExpenseChange}
                            autoComplete = "off"
                        />
                        <input 
                            type = "number" 
                            placeholder="value" 
                            className="form-input" 
                            name = "value"
                            value = {expense.value}
                            onChange = {handleExpenseChange}
                            autoComplete = "off"
                        />
                        <input 
                            type = "text" 
                            placeholder="category" 
                            className="form-input" 
                            name = "category"
                            value={expense.category}
                            onChange = {handleExpenseChange}
                            autoComplete = "off"
                        />
                        <button onClick={submitExpense}>Add expense</button>
                    </form>
                }
                {props.currentMonth.expenses.length === 0
                    ?
                    <div className="expense-info-zero">
                        <h2>You still have no expenses this month</h2>
                        
                    </div>
                    :
                    createReactTable(props.currentMonth.expenses)
                }
            </div>
        </div>
    )

}