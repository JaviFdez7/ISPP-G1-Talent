import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../context/authContext.jsx";

import Home from "../pages/Home";
//import Pricing from "../pages/Pricing";

import Navbar from "./Navbar";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import Profile from "../pages/Profile";

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
            {/*<Route path="/pricing" element={<Pricing />} />*/}
            <Route index element={<Profile />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
export default App;
