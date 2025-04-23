import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import UserLogin from './pages/UserLogin'
import Signup from './pages/Signup'
import TransferMoney from './pages/TransferMoney';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/transfer" element={<TransferMoney />} />
      </Routes>
    </Router>
  )
}

export default App