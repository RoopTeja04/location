import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AuthProvider from './context/AuthContext'
import Items from './components/Items'
import Cart from './components/Cart'
import Orders from './components/Orders'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/items' element={<Items />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
        </Routes> 
      </AuthProvider>
    </>
  )
}

export default App