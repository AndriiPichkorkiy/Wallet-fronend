import React from 'react'
import DashboardPage from './pages/DashboardPage'

// require('dotenv').config()
console.log(process.env)
const testPicture = require('./assets/images/authImg/login-desk.png')

function App() {
  return (
    <>
      <div className='App'>
        <h1>Hello React</h1>
        <img src={testPicture} alt='selling img' />
      </div>
      <DashboardPage />
    </>
  )
}

export default App
