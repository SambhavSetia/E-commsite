import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Admin from './Pages/Admin/Admin'


function App() {


  return (
    <>
      <div>
        <Navbar/>
        <Admin/>
        
      </div>
       
    </>
  )
}

export default App
