// Main.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import UserForm from './components/UserForm';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-user" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default Main;
