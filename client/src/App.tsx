import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomPage from './pages/RoomPage';
import JoinPage from './pages/JoinPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<JoinPage />} />
          <Route path="room" element={<RoomPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
