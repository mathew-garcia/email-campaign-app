import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'; // Import the Navigate component
import Campaigns from './components/Campaigns'
import Navbar from './common/Navbar'
import Login from './auth/Login'

function App() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/campaigns" element={<>
                        <Navbar />
                        <Campaigns />
                    </>} />
                </Routes>
        </BrowserRouter>
    )
}

export default App