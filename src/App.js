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
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      budget: 0, 
      monthTotal: 0,
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
          const oldMonth = oldMonthList[i]
          if(oldMonth.id === currentMonth.id) {
              newArray.unshift({ ...oldMonth, expenses: currentMonth.expenses})
          } else {
              newArray.push(oldMonth)
          }
      }
      return newArray
    })
  }

  function changeBudget(newTotal){

    //alert(newTotal)

    currentMonth.budget = newTotal
    
    setMonthList(oldMonthList => {
      const newArray = []

      for(let i = 0; i < oldMonthList.length; i++) {
          const oldMonth = oldMonthList[i]
          if(oldMonth.id === currentMonth.id) {
              newArray.unshift({ ...oldMonth, budget: currentMonth.budget})
          } else {
              newArray.push(oldMonth)
          }
      }
      return newArray
    })
  }

  function changeMonthTotal(newTotal){

    currentMonth.monthTotal = newTotal
    
    setMonthList(oldMonthList => {
      const newArray = []

      for(let i = 0; i < oldMonthList.length; i++) {
          const oldMonth = oldMonthList[i]
          if(oldMonth.id === currentMonth.id) {
              newArray.unshift({ ...oldMonth, monthTotal: currentMonth.monthTotal})
          } else {
              newArray.push(oldMonth)
          }
      }
      return newArray
    })
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
            changeBudget = {changeBudget}
            changeMonthTotal = {changeMonthTotal}
          />
        </div>
      }
    </div>
  );
}

export default App;
