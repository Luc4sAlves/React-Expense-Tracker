import React from "react";
import Greet from './components/Greet';
import Tracker from "./components/Tracker";
import {nanoid} from "nanoid";

function App() {

  const [monthList, setMonthList] = React.useState([])
  const [currentMonth, setCurrentMonth] = React.useState(null)

  function createMonth(){
    let monthlyExpense = {
      expenses: [],
      month: 2,
      year: 2000,
      id: nanoid(),
    }
    setMonthList(oldMonthList => [...oldMonthList, monthlyExpense]) 
    setCurrentMonth(monthlyExpense)
  }

  function addExpense(expense){
    currentMonth.expenses.push(expense)
    setMonthList(oldMonthList => {
      const newArray = []

      for(let i = 0; i < oldMonthList.length; i++) {
          const oldMonth= oldMonthList[i]
          if(oldMonth.id === currentMonth.id) {
              newArray.unshift({ ...oldMonth, expenses: currentMonth.expenses})
          } else {
              newArray.push(oldMonth)
          }
      }
      return newArray
    })
  }

  return (
    <div className="App">
      {monthList.length === 0 
        ?
        <Greet 
          createMonth = {createMonth} 
        /> 
        :
        //Vai ser currentMonth na direita depois
        <Tracker currentMonth = {monthList[0]} addExpense = {addExpense}/>
      }
    </div>
  );
}

export default App;
