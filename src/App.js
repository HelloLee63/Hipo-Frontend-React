import React from 'react';
// import { useState } from 'react';
// import Tasks from "./components/Tasks";
import { Button } from './components/button/index.jsx';
import LayoutHeader from './layout/components/layout-header/index.jsx';


export const ThemeContext = React.createContext()

const App = () => {

//   const [tasks, setTasks] = useState(
//     [
//         {
//             id: 1,
//             text: 'Doctors Appointment',
//             day: 'Feb 5th at 2:30pm',
//             reminder: true,
//         },
//         {
//             id: 2,
//             text: 'Home works',
//             day: 'Feb 5th at 4:30pm',
//             reminder: true,
//         },
//         {
//             id: 3,
//             text: 'Meeing',
//             day: 'Feb 6th at 9:00am',
//             reminder: false,
//         }
//     ]
// )
//   const [darkTheme, setDarkTheme] = useState(true)
  
//   function toggleTheme() {
//       let toggleValue = darkTheme
//       setDarkTheme(
//         prevDark => !prevDark
//       )
//       console.log(toggleValue);
//     }

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id))
//   }

//   const remindTask = (id) => {
//     setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder}: task ))
//     console.log(id);
//   }
  
  return (
    <div className = 'container'>
      {/* <ThemeContext.Provider value = {darkTheme} > */}       
        {/* <ConnectWalletModal/>       
        {tasks.length > 0 ? (<Tasks tasks = { tasks } onDelete = 
        { deleteTask } onToggle = {remindTask}/>) : ('No Tasks To Show')} */}
      {/* </ThemeContext.Provider> */}
      <LayoutHeader></LayoutHeader>
      <p>Add Liquidity</p>
      <h1>Hello World!</h1>
    </div>
  )
}

export default App;
