import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Navbar from "./components/Navbar"
import PlaceHolder from "./pages/PlaceHolder"
import './styles/App.css'


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlaceHolder pageName="about us" />} />
          <Route path="/analysis/history/:representativeId" element={<PlaceHolder pageName="analysis list" />} />
          <Route path="/search/history/:representativeId" element={<PlaceHolder pageName="search list" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
