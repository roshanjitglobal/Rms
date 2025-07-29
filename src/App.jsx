import React, { useState, useEffect } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from "./pages/landing/Components/Hearder";
import Footer from "./pages/landing/Components/Footer";
import Preloader from "./pages/landing/Components/Preloader";
import Home from "./pages/landing/pages/Home";
import Solutions from "./pages/landing/pages/solutions";
import WhyRMS from "./pages/landing/pages/whyrms";
import AboutUs from "./pages/landing/pages/Aboutus";
import Contact from "./pages/landing/pages/Contact";
import NotFound from "./pages/landing/pages/NotFound";
import CandidateRegister from "./pages/auth/candidateRegister";
import ForgotPassword from "./pages/auth/Forgot";
import Login from "./pages/auth/Login"
import SideBar from "./pages/companyAdmin/HR/SideBar"
import HRHome from "./pages/companyAdmin/HR/Home"
import Profile from "./pages/companyAdmin/HR/Profile"
import ManageHR from "./pages/companyAdmin/HR/ManageHR"
import HrVsJd from "./pages/companyAdmin/HR/analytics/HrVsJd"
import JdVsMonths from "./pages/companyAdmin/HR/analytics/JdVsMonths"
import AppliedJdVsJd from "./pages/companyAdmin/HR/analytics/AppliedJdVsJd"
import SettingsScreen from "./pages/common/Sttings"
import ViewHR from './pages/companyAdmin/HR/ViewHR';
import Notifications from './pages/companyAdmin/HR/Notifications';
import HRRegister from './pages/auth/HRRegister';
import Dashboard from './pages/hr/Dashboard';
import UploadResume from './pages/hr/UploadResume';
import ManageJD from './pages/hr/Managejd';
import InterviewScore from './pages/hr/InterviewScore';
import JDListStatus from './pages/hr/JD/JDListStatus';
import SupportCenter from "./pages/auth/superAdmin/SupportCenter";
import FeedbackCenter from "./pages/auth/superAdmin/feedbackCenter";
import SubSuperAdminManager from "./pages/auth/superAdmin/ManageSubAdmin";
import CompanyManagementDashboard from "./pages/auth/superAdmin/company/companyList";
import SuperAdminHome from "./pages/auth/superAdmin/SuperAdminDashboard";
import Hrcandidatelist from "./pages/hr/CandidateManagement";
import CandidateManagement from "./pages/hr/CandidateManagement";



const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isDashboardRoute = [
    '/hr-dashboard',
    '/analytics',
    '/profile',
    '/manage-hr',
    '/manage-jd',
    '/settings',
    '/view-hr',
    '/notifications',
    '/hr-register',
    '/super-admin-home',
    '/company-management',
    '/manage-sub-admin',
    '/feedback-center',
    '/support-center'
  ].some(route => location.pathname.toLowerCase().startsWith(route));

  return (
    <>
      {isLoading ? (
        <Preloader isVisible={true} />
      ) : (
        <div className="min-h-screen flex flex-col">
          {!isDashboardRoute && <Header isDashboard={isDashboardRoute} />}
          <div className="flex-1 flex">
            {isDashboardRoute && <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
            <div className="flex-1 flex flex-col">
              {isDashboardRoute && <Header isDashboard={isDashboardRoute} />}
              <main className={`flex-1 overflow-y-auto${isDashboardRoute ? ' p-6' : ''}`}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/why-rms" element={<WhyRMS />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/candidate-register" element={<CandidateRegister />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/forgot" element={<ForgotPassword/>} />
                  {/* HR Routes */}
                  <Route path="/hrdashboard" element={<Dashboard />} />
                  <Route path="/managejd" element={<ManageJD />} />
                  <Route path="/uploadresume" element={<UploadResume />} />
                  <Route path="/interviewscore" element={<InterviewScore />} />
                  <Route path="/jdliststatus" element={<JDListStatus />} />
                  <Route path="/hr-candidate-list" element={<Hrcandidatelist />} />
                  <Route path="/candidate-management" element={<CandidateManagement />} />
                  
                  
                  {/* Company Admin Routes */}
                  <Route path="/hr-dashboard" element={<HRHome />} />
                  <Route path="/analytics" element={<Navigate to="/analytics/jd-vs-months" />} />
                  <Route path="/analytics/hr-vs-jd" element={<HrVsJd />} />
                  <Route path="/analytics/jd-vs-months" element={<JdVsMonths />} />
                  <Route path="/analytics/applied-jd-vs-jd" element={<AppliedJdVsJd />} />
                  <Route path="/profile" caseSensitive={false} element={<Profile isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
                  <Route path="/manage-hr" element={<ManageHR />} />
                  <Route path="/settings" element={<SettingsScreen />} />
                  <Route path="/view-hr" element={<ViewHR />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/hr-register" element={<HRRegister />} />
                  <Route path="/dashboard" element={<Navigate to="/hrdashboard" />} />
                  { /* Super Admin Routes */}
                  <Route path="/support-center" element={<SupportCenter />} />
                  <Route path="/feedback-center" element={<FeedbackCenter />} />
                  <Route path="/manage-sub-admin" element={<SubSuperAdminManager />} />
                  <Route path="/company-management" element={<CompanyManagementDashboard />} />
                  <Route path="/super-admin-home" element={<SuperAdminHome />} />
                  {/* Catch-all route for 404 */}
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;