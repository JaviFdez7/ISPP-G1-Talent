import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from '../context/authContext.jsx'

import Home from '../pages/Home'
import Support from '../pages/Support'
import Settings from '../pages/Settings'

import CandidateAnalysisDetail from '../pages/candidate/CandidateAnalysisDetail.jsx'
import CandidateDetail from '../pages/candidate/CandidateDetail.jsx'
import CandidateDetailEdit from '../pages/candidate/CandidateDetailEdit.jsx'
import CandidateNotificationDetail from '../pages/candidate/CandidateNotificationDetail.jsx'

import CandidateProfessionalExperienceCreate from '../pages/candidate/CandidateProfessionalExperienceCreate.jsx'
import CandidateProfessionalExperienceEdit from '../pages/candidate/CandidateProfessionalExperienceEdit.jsx'
import CandidateProfessionalExperienceDetail from '../pages/candidate/CandidateProfessionalExperienceDetail.jsx'
import CandidateSubscription from '../pages/candidate/CandidateSubscription.jsx'
import CandidateRepresentativeDetail from '../pages/candidate/CandidateRepresentativeDetail.jsx'

import RepresentativeSubscription from '../pages/representative/RepresentativeSubscription.jsx'
import RepresentativeDetail from '../pages/representative/RepresentativeDetail.jsx'
import RepresentativeDetailEdit from '../pages/representative/RepresentativeDetailEdit.jsx'

import Navbar from './Navbar'
import { PlaceHolder } from '../pages/PlaceHolder.jsx'
import ProtectedRoute from '../context/routes/ProtectedRoute.jsx'

import Search from '../pages/search/SearchTeam.jsx'
import SearchForm from '../pages/search/SearchForm.jsx'
import SearchResult from '../pages/search/SearchResult.jsx'

import Login from '../pages/auth/Login.jsx'
import RegisterCandidate from '../pages/auth/RegisterCandidate.jsx'
import RegisterRepresentative from '../pages/auth/RegisterRepresentative.jsx'
import AnalysisDashboard from '../pages/analysis/AnalysisDashboard.jsx'
import AnalysisAnalizer from '../pages/analysis/AnalysisAnalizer.jsx'
import AnalysisList from '../pages/analysis/AnalysisList.jsx'

import ChangePassword from '../pages/ChangePassword.jsx'

import PaymentScreen from '../pages/payment/PaymentScreen.jsx'

function App() {
	return (
		<div>
			<AuthContextProvider>
				<Router>
					<Navbar />
					<Routes>
						{/*RUTAS PUBLICAS */}
						<Route index element={<Home />} />
						<Route path='/support' element={<Support />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register/candidate' element={<RegisterCandidate />} />
						<Route
							path='/register/representative'
							element={<RegisterRepresentative />}
						/>
						{/*RUTAS PRIVADAS */}
						{/*Analysis*/}
						<Route
							path='/analysis/analyze'
							element={
								<ProtectedRoute roles={['Representative']}>
									<AnalysisAnalizer />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/analysis/:analysisId'
							element={
								<ProtectedRoute roles={['Representative']}>
									<AnalysisDashboard />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/analysis/list'
							element={
								<ProtectedRoute roles={['Representative']}>
									<AnalysisList />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/searches/representative/:representativeId'
							element={
								<ProtectedRoute roles={['Representative']}>
									<Search />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/searches/search'
							element={
								<ProtectedRoute roles={['Representative']}>
									<SearchForm />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/searches/:searchId'
							element={
								<ProtectedRoute roles={['Representative']}>
									<SearchResult />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/searches/list'
							element={
								<ProtectedRoute roles={['Representative']}>
									<PlaceHolder pageName='search list' />
								</ProtectedRoute>
							}
						/>

						{/*Subscription*/}
						<Route path='/pricing' element={<PlaceHolder pageName='subscription' />} />
						<Route
							path='/payments/:subscriptionPlan'
							element={
								<ProtectedRoute roles={['Candidate', 'Representative']}>
									<PaymentScreen />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/candidate/:id/password'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<ChangePassword />
								</ProtectedRoute>
							}
						/>
						{/*RUTAS CANDIDATO */}
						<Route
							path='/candidate/detail'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateDetail />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/detail/edit/:id'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateDetailEdit />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/analysis/detail'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateAnalysisDetail />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/notification/detail'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateNotificationDetail />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/professional-experience/create'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateProfessionalExperienceCreate />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/professional-experience/detail/:id'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateProfessionalExperienceDetail />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/professional-experience/edit/:id'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateProfessionalExperienceEdit />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/professional-experience/edit'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateProfessionalExperienceEdit />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/candidate/representative-view/:representativeId'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateRepresentativeDetail />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/candidate/subscription'
							element={
								<ProtectedRoute roles={['Candidate']}>
									<CandidateSubscription />
								</ProtectedRoute>
							}
						/>
						{/*RUTAS REPRESENTANTE */}
						<Route
							path='/representative/subscription'
							element={
								<ProtectedRoute roles={['Representative']}>
									<RepresentativeSubscription />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/representative/detail'
							element={
								<ProtectedRoute roles={['Representative']}>
									<RepresentativeDetail />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/representative/detail/edit/:id'
							element={
								<ProtectedRoute roles={['Representative']}>
									<RepresentativeDetailEdit />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/representative/:id/password'
							element={
								<ProtectedRoute roles={['Representative']}>
									<ChangePassword />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Router>
			</AuthContextProvider>
		</div>
	)
}
export default App
