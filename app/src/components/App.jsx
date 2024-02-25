import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
//import Pricing from "../pages/Pricing";

import Navbar from "./Navbar";

import Profile from "../pages/Profile";

function App() {
  return (
    <div>
        <Router>
          <Navbar />
          <Routes>
            {/*RUTAS PUBLICAS */}
            <Route index element={<Profile />} />
          </Routes>
        </Router>
    </div>
  );
}
export default App;
