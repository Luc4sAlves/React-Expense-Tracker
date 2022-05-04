import React from "react";

export default function Tracker(props){

    const [addingExpense, setAddingExpense] = React.useState(false)
    const [expense, setExpense] = React.useState({
        value: 0,
        description: '',
        category: '',
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
        setAddingExpense(false)
    }

    function displayCurrentMonthExpenses(){
        const displayExpenses = []
        const expenses = props.currentMonth.expenses
        for(let i in expenses){
            displayExpenses.push(
                <h3>{`${expenses[i].description}|${expenses[i].value}|${expenses[i].category}`}</h3>
            )
        }
        return displayExpenses
    }
    return(
        <div className="tracker">
            <div className="top-info">
                <h1>Hello, user</h1>
            </div>
            <div className="expense-info">
                {props.currentMonth.expenses.length === 0
                    ?
                    <div className="expense-info-zero">
                        <h2>You still have no expenses this month</h2>
                        
                    </div>
                    :
                    displayCurrentMonthExpenses()
                }
                <button onClick={addExpenseInput}>Add new expense</button>
                {addingExpense && 
                    <form>
                        <input 
                            type = "text" 
                            placeholder="description" 
                            className="form-input" 
                            name = "description"
                            value = {expense.description}
                            onChange = {handleExpenseChange}
                        />
                        <input 
                            type = "text" 
                            placeholder="value" 
                            className="form-input" 
                            name = "value"
                            value = {expense.value}
                            onChange = {handleExpenseChange}
                        />
                        <input 
                            type = "text" 
                            placeholder="category" 
                            className="form-input" 
                            name = "category"
                            value={expense.category}
                            onChange = {handleExpenseChange}
                        />
                        <button onClick={submitExpense}>Add expense</button>
                    </form>}
            </div>
        </div>
    )

}