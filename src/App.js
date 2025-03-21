
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import ExerciseDetail from './Pages/ExerciseDetail';
import Home from './Pages/Home';
import CaloriesTracker from './Pages/CaloriesTracker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const App = () => (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/Calories/:id" element={<CaloriesTracker />} />
      </Routes>
      <Footer />
    </Box>
  );
  
  export default App;