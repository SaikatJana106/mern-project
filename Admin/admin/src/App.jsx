import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Additem from './components/Additem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Additem/>
    </>
  )
}

export default App
