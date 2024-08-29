// import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import './App.css'
import Nav from './components/Nav'
import QuickFinds from './components/QuickFinds'
import Search from './components/Search'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Nav />
        <Search />
        <Button variant="danger">
          Primary
          <i className="bi bi-0-circle-fill"></i>
        </Button>
        <QuickFinds />
      </div>
    </>
  )
}

export default App
