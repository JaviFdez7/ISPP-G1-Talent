import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../context/authContext.jsx";

//pages
//para todos
import Home from "../pages/Home";
import Support from "../pages/Support";
import Settings from "../pages/Settings";

//candidates
import CandidateAnalysisDetail from "../pages/candidate/CandidateAnalysisDetail.jsx";
import CandidateDetail from "../pages/candidate/CandidateDetail.jsx";
import CandidateDetailEdit from "../pages/candidate/CandidateDetailEdit.jsx";
import CandidateDeveloperInfoDetail from "../pages/candidate/CandidateDeveloperInfoDetail.jsx";
import CandidateDeveloperInfoDetailEdit from "../pages/candidate/CandidateDeveloperInfoDetailEdit.jsx";
import CandidateLaboralDetail from "../pages/candidate/CandidateLaboralDetail.jsx";
import CandidateLaboralDetailEdit from "../pages/candidate/CandidateLaboralDetailEdit.jsx";
import CandidateNotificationDetail from "../pages/candidate/CandidateNotificationDetail.jsx";
import CandidateRepresentativeDetail from "../pages/candidate/CandidateRepresentativeDetail.jsx";
import CandidateSubscription from "../pages/candidate/CandidateSubscription.jsx";
import CandidateTrendsDetail from "../pages/candidate/CandidateTrendsDetail.jsx";

//components
import Navbar from "./Navbar";

//auth
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
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/*RUTAS CANDIDATO */}
            <Route path="/candidate/detail" element={<CandidateDetail />} />
            <Route path="/candidate/detail/edit" element={<CandidateDetailEdit />} />
            <Route path="/candidate/analysis/detail" element={<CandidateAnalysisDetail />} />
            <Route path="/candidate/developer/info/detail" element={<CandidateDeveloperInfoDetail />} />
            <Route path="/candidate/developer/info/detail/edit" element={<CandidateDeveloperInfoDetailEdit />} />
            <Route path="/candidate/laboral/detail" element={<CandidateLaboralDetail />} />
            <Route path="/candidate/laboral/detail/edit" element={<CandidateLaboralDetailEdit />} />
            <Route path="/candidate/notification/detail" element={<CandidateNotificationDetail />} />
            <Route path="/candidate/representative/detail" element={<CandidateRepresentativeDetail />} />
            <Route path="/candidate/subscription" element={<CandidateSubscription />} />
            <Route path="/candidate/trends/detail" element={<CandidateTrendsDetail />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
export default App;
