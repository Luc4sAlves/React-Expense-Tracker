import React from "react";
import Greet from './components/Greet';
import Tracker from "./components/Tracker";
import {nanoid} from "nanoid";
import Sidebar from "./components/Sidebar";

function App() {

  const [monthList, setMonthList] = React.useState(
    () => JSON.parse(localStorage.getItem("monthList")) || [])
  //const [monthList, setMonthList] = React.useState([]);

  const [currentMonth, setCurrentMonth] = React.useState(monthList[0] || null)

   const [latestDate, setLatestDate] = React.useState(
     () => JSON.parse(localStorage.getItem("latestDate")) || [new Date().getMonth() + 1,  new Date().getFullYear()])
  //const [latestDate, setLatestDate] = React.useState([new Date().getMonth() + 1,  new Date().getFullYear()])

  const [recurrentExpenses, setRecurrentExpenses] = React.useState([]);

  React.useEffect(() => {
    localStorage.setItem("monthList", JSON.stringify(monthList))
  }, [monthList])

  React.useEffect(() => {
    localStorage.setItem("latestDate", JSON.stringify(latestDate))
  }, [latestDate])


  function getNextDate(){
    if(latestDate[0] === -1){
      setLatestDate([new Date().getMonth() + 1,  new Date().getFullYear()])
      return latestDate
    }
    else{
      if(latestDate[0] === 12){
        setLatestDate(oldDate => [1, oldDate[1] + 1])
        return latestDate
      }
      else{
        setLatestDate(oldDate => [oldDate[0] + 1, oldDate[1]])
        return latestDate
      }
    }
  }

  function createMonth(){
    getNextDate()
    let monthlyExpense = {
      expenses: recurrentExpenses,
      /*month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),*/
      month: latestDate[0],
      year: latestDate[1],
      budget: 0, 

      monthTotal: recurrentTotal(),
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

  function addRecurrent(expense){
    setRecurrentExpenses(oldRecurrentExpenses => [...oldRecurrentExpenses, expense])
  }

  function removeRecurrent(expense){
    setRecurrentExpenses(oldRecurrentExpenses => oldRecurrentExpenses.filter(recurrentExpense => recurrentExpense.id !== expense.id))
  }

  function changeRecurrent(expense){
    for(let i = 0; i < currentMonth.expenses.length; i++){
      if(currentMonth.expenses[i].id === expense.id){
        currentMonth.expenses = [...currentMonth.expenses.slice(0, i), expense, ...currentMonth.expenses.slice(i + 1)]
      }
    }
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
    }
    )
  }

  function recurrentTotal(){
    let total = 0
    for(let i = 0; i < recurrentExpenses.length; i++){
      total += +recurrentExpenses[i].value
    }
    return total
  }

  function changeBudget(newTotal){
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
          getNextDate = {getNextDate}
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
            changeRecurrent = {changeRecurrent}
            addRecurrent = {addRecurrent}
            removeRecurrent = {removeRecurrent}
          />
        </div>
      }
    </div>
  );
}

export default App;
