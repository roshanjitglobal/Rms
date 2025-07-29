// import Register from './pages/common/Register.jsx'; // Removed duplicate import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/candidateRegister.jsx';
import Footer from './pages/common/Footer.jsx';
import Header from './pages/common/Header.jsx';
import FeedbackForm from './pages/common/Feedback.jsx';
import SupportForm from './pages/common/HelpSupport.jsx'; 
import CompanyRegisterForm from './pages/companyAdmin/CompanyRegister.jsx';
import RMSDashboard from './pages/companyAdmin/Dashboard.jsx';
import HrRegister from './pages/companyAdmin/HR/CreateHR.jsx';
import ForgotPassword from './pages/common/ForgetPassword.jsx';
import InterviewScore from './pages/hr/InterviewReports.jsx';
import InterviewDetail from './pages/hr/InterviewDetails.jsx';
import HRDashboard from './pages/hr/Dashboard.jsx';
import CandidateHomePage from './pages/Candidate/Dashbord.jsx';
import CandidateProfile from './pages/Candidate/profileBuilder.jsx';
import Profile from './pages/companyAdmin/companyProfile.jsx';
import CompanyAdminDashboard from './pages/hr/ShortlistProceed.jsx';
import CandidateSidebar from './pages/Candidate/ApplyToJob.jsx';
import HRProfilePage from './pages/hr/hrprofile.jsx';
import HRList from './pages/companyAdmin/HR/HRList.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Header and Footer are imported for use in page components, not as routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/support" element={<SupportForm />} />
        <Route path="/company-register" element={<CompanyRegisterForm />} />
        <Route path="/dashboard" element={<RMSDashboard />} />
        <Route path="/createHR" element={<HrRegister />} />
        <Route path="/Interview-score" element={<InterviewScore />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/interview-details/:id" element={<InterviewDetail />} />
        <Route path="/hrdashboard" element={<HRDashboard />} />
        <Route path="/candidatehome" element={<CandidateHomePage />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
        <Route path="/companyprofile" element={<Profile />} />
        <Route path="/companydashboard" element={<CompanyAdminDashboard />} />
        <Route path="/candidatesidebar" element={<CandidateSidebar />} />
        <Route path="/hrlist" element={<HRList />} />
        <Route path="/hrprofile" element={<HRProfilePage />} />
        <Route path="/hrprofile/:hrId" element={<HRProfilePage />} />
      
        {/* Removed routes for Header, Footer, and CandidateBox. Use them only inside page components. */}
         {/* Catch-all route for 404 Not Found */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

