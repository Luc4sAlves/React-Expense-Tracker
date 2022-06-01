import React from "react";
import Greet from './components/Greet';
import Tracker from "./components/Tracker";
import {nanoid} from "nanoid";
import Sidebar from "./components/Sidebar";

function App() {

  const [monthList, setMonthList] = React.useState([])
  const [currentMonth, setCurrentMonth] = React.useState(null)

  const [totalMoney, setTotalMoney] = React.useState(0)

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

  function changeTotal(newTotal){
    setTotalMoney(newTotal)
  }

  function setCurrentMonthId(id){
    for(let i in monthList){
      if(monthList[i].id === id){
        setCurrentMonth(monthList[i])
      }
    }
  }

  function deleteMonth(event, monthId){
    event.stopPropagation()
    setMonthList(oldMonthList => oldMonthList.filter(month => month.id !== monthId))
  }

  return (
    <div className="App">
      {monthList.length === 0 
        ?
        <Greet 
          createMonth = {createMonth} 
        /> 
        :
        <div className="main-app">
          <Sidebar 
            monthList = {monthList}
            setCurrentMonthId = {setCurrentMonthId}
            deleteMonth = {deleteMonth}
            currentMonth = {currentMonth}
            createMonth = {createMonth}
          />
          <Tracker 
            currentMonth = {currentMonth} 
            addExpense = {addExpense} 
            totalMoney = {totalMoney}
            changeTotal = {changeTotal}
          />
        </div>
      }
    </div>
  );
}

export default App;
