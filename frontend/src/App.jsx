import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AuthProvider from './context/AuthContext'
import Items from './components/Items'
import Cart from './components/Cart'
import Orders from './components/Orders'
import Header from './components/Header'
import VegPickels from './components/vegPickels'
import NonVegPickels from './components/nonVegPickels'
import Sweets from './components/Sweets';
import Snacks from './components/Snacks';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/items" element={<Items />}>
            <Route index element={<VegPickels />} />
            <Route path="veg-pickel" element={<VegPickels />} />
            <Route path='non-veg-pickel' element={<NonVegPickels />} />
            <Route path='sweets' element={<Sweets />} />
            <Route path='snacks' element={<Snacks />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Outlet />
      </AuthProvider>
    </>
  )
}

export default App
