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
          {/*ANALYSIS*/}
          <Route path="/analysis/analyze" element={<PlaceHolder pageName="analyze" />} />
          <Route path="/analysis/:analysisId" element={<PlaceHolder pageName="candidate analysis" />} />
          <Route path="/analysis/history/:representativeId" element={<PlaceHolder pageName="analysis list" />} />
          {/*SEARCH*/}
          <Route path="/searches/search" element={<PlaceHolder pageName="search list" />} />
          <Route path="/searches/:searchId" element={<PlaceHolder pageName="search list" />} />
          <Route path="/searches/history/:representativeId" element={<PlaceHolder pageName="search list" />} />
          {/*SUBSCRIPTION*/}
          <Route path="/subscription" element={<PlaceHolder pageName="subscription" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
