import React, { useState, createContext } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import Exercises from './components/Exercises';
import Meal from './components/Meal/Meal';

export const userContext = createContext();

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState(null);



  const handleLogin = (uname, loginStatus) => {
    setUsername(uname);
    setLoginStatus(loginStatus);
  }

  if (!loginStatus) {
    return (
      <Routes>

        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />

      </Routes>

    )
  }
  return (
    <userContext.Provider value={{ username, loginStatus }}>
      <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Mealdashboard" element={<Meal />} />
        </Routes>

        <Footer />
      </Box >
    </userContext.Provider>
  )

};

export default App;
