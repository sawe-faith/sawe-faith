import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './LandingPage'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import DynamicRoute from './DynamicRoute'
import Community from './Community'
import Jobs from './Jobs'
import Navbar from './Navbar'


const App = () => {
  return (
    <Router>
      <div><Navbar /></div>
      <Routes>
        <Route path='/' element={<DynamicRoute element={<LandingPage />} title="EasyLink" />} />
        <Route path='/home' element={<DynamicRoute element={<Home />} title='feeds' />} />
        <Route path='/login' element={<DynamicRoute element={<Login />} title='EasyLink - login' />} />
        <Route path='/signup' element={<DynamicRoute element={<Signup />} title='EasyLink - signup ' />} />
        <Route path='/jobs' element={<DynamicRoute element={<Jobs />} title='job feeds' />} />
        <Route path='/community' element={<DynamicRoute element={<Community />} title='community feeds' />} />
      </Routes>
    </Router>
  )
}

export default App