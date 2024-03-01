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

//representatives
import RepresentativeSubscription from "../pages/representative/RepresentativeSubscription.jsx";
import RepresentativeDetail from "../pages/representative/RepresentativeDetail.jsx";
import RepresentativeDetailEdit from "../pages/representative/RepresentativeDetailEdit.jsx";

//components
import Navbar from "./Navbar";
import { PlaceHolder } from "../pages/PlaceHolder.jsx";

//auth
import Login from "../pages/auth/Login.jsx";
import RegisterCandidate from "../pages/auth/RegisterCandidate.jsx";
import RegisterRepresentative from "../pages/auth/RegisterReprentative.jsx";
import AnalysisDashboard from "../pages/analysis/AnalysisDashboard.jsx";
import AnalysisAnalizer from "../pages/analysis/AnalysisAnalizer.jsx";
import AnalysisRepositories from "../pages/analysis/AnalysisRepositories.jsx";


//TODO Implementar los placeholders de las rutas como componentes reales
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
            <Route path="/register/candidate" element={<RegisterCandidate />} />
            <Route
              path="/register/representative"
              element={<RegisterRepresentative />}
            />
            {/*RUTAS PRIVADAS */}
            {/*Analysis*/}
            <Route path="/analysis/analyze" element={<AnalysisAnalizer />} />
            <Route
              path="/analysis/:analysisId"
              element={<AnalysisDashboard />}
            />
            <Route
              path="/analysis/:analysisId/repositories"
              element={<AnalysisRepositories />}
            />
            <Route
              path="/analysis/history/:representativeId"
              element={<PlaceHolder pageName="analysis list" />}
            />
            {/*Search*/}
            <Route
              path="/searches/search"
              element={<PlaceHolder pageName="search list" />}
            />
            <Route
              path="/searches/:searchId"
              element={<PlaceHolder pageName="search list" />}
            />
            <Route
              path="/searches/history/:representativeId"
              element={<PlaceHolder pageName="search list" />}
            />
            {/*Subscription*/}
            <Route
              path="/pricing"
              element={<PlaceHolder pageName="subscription" />}
            />
            {/*<Route path="/pricing" element={<Pricing />} />*/}

            {/*RUTAS CANDIDATO */}
            <Route path="/candidate/detail" element={<CandidateDetail />} />
            <Route
              path="/candidate/detail/edit"
              element={<CandidateDetailEdit />}
            />
            <Route
              path="/candidate/analysis/detail"
              element={<CandidateAnalysisDetail />}
            />
            <Route
              path="/candidate/developer/info/detail"
              element={<CandidateDeveloperInfoDetail />}
            />
            <Route
              path="/candidate/developer/info/detail/edit"
              element={<CandidateDeveloperInfoDetailEdit />}
            />
            <Route
              path="/candidate/laboral/detail"
              element={<CandidateLaboralDetail />}
            />
            <Route
              path="/candidate/laboral/detail/edit"
              element={<CandidateLaboralDetailEdit />}
            />
            <Route
              path="/candidate/notification/detail"
              element={<CandidateNotificationDetail />}
            />
            <Route
              path="/candidate/representative/detail"
              element={<CandidateRepresentativeDetail />}
            />
            <Route
              path="/candidate/subscription"
              element={<CandidateSubscription />}
            />
            <Route
              path="/candidate/trends/detail"
              element={<CandidateTrendsDetail />}
            />
            {/*RUTAS REPRESENTANTE */}
            <Route
              path="/representative/subscription"
              element={<RepresentativeSubscription />}
            />
            <Route
              path="/representative/detail"
              element={<RepresentativeDetail />}
            />
            <Route
              path="/representative/detail/edit"
              element={<RepresentativeDetailEdit />}
            />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
export default App;
