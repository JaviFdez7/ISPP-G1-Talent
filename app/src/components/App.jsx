import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../context/authContext.jsx";

import Home from "../pages/Home";
//import Pricing from "../pages/Pricing";

import Navbar from "./Navbar";
import { PlaceHolder } from "../pages/PlaceHolder.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Routes>
            {/*RUTAS PUBLICAS */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*RUTAS PRIVADAS */}
            {/*Analysis*/}
            <Route path="/analysis/analyze" element={<PlaceHolder pageName="analyze" />} />
            <Route path="/analysis/:analysisId" element={<PlaceHolder pageName="candidate analysis" />} />
            <Route path="/analysis/history/:representativeId" element={<PlaceHolder pageName="analysis list" />} />
            {/*Search*/}
            <Route path="/searches/search" element={<PlaceHolder pageName="search list" />} />
            <Route path="/searches/:searchId" element={<PlaceHolder pageName="search list" />} />
            <Route path="/searches/history/:representativeId" element={<PlaceHolder pageName="search list" />} />
            {/*Subscription*/}
            <Route path="/pricing" element={<PlaceHolder pageName="subscription" />} />
            {/*<Route path="/pricing" element={<Pricing />} />*/}
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
export default App;
