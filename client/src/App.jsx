import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import UserLogin from './pages/UserLogin'
import Signup from './pages/Signup'
import TransferMoney from './pages/TransferMoney';
import ExpenseDashboard from './expenseTracker/ExpenseDashboard';
import TransactionsHistory from './expenseTracker/TransactionHistory';
import Manage from './expenseTracker/Manage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/transfer" element={<TransferMoney />} />
        <Route path="/track-expenses" element={<ExpenseDashboard />} />
        <Route path="/track-expenses/transactions" element={<TransactionsHistory />} />
        <Route path="/track-expenses/manage" element={<Manage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App