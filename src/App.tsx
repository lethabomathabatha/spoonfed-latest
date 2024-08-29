// import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import './App.css'
import Nav from './components/Nav'
import QuickFinds from './components/QuickFinds'
import Search from './components/Search'
import Recommendations from './components/Recommendations'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Nav />
        <Search /> 
        <QuickFinds />
        <Recommendations />
      </div>
    </>
  )
}

export default App
