import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import './App.css'
import Nav from './components/Nav'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Nav />
        <Button variant="danger">
          Primary
          <i className="bi bi-0-circle-fill"></i>
        </Button>
      </div>
    </>
  )
}

export default App
