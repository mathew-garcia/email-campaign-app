import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Campaigns from './components/Campaigns'
import Navbar from './common/Navbar'
import Login from './auth/Login'

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes initial={[{ pathname: '/login' }]}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/campaigns" element={<>
                        <Navbar />
                        <Campaigns />
                    </>} />
                </Routes>
                <Login />
            </div>
        </BrowserRouter>
    )
}

export default App