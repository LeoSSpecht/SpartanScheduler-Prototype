import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MainPage />}/>
        <Route exact path='/login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
