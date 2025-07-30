import React, { useState, useEffect } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Landing Page Components
import Header from "./pages/landing/Components/Hearder";
import Footer from "./pages/landing/Components/Footer";
import Preloader from "./pages/landing/Components/Preloader";
import Home from "./pages/landing/pages/Home";
import Solutions from "./pages/landing/pages/solutions";
import WhyRMS from "./pages/landing/pages/whyrms";
import AboutUs from "./pages/landing/pages/Aboutus";
import Contact from "./pages/landing/pages/Contact";
import NotFound from "./pages/landing/pages/NotFound";

// Auth Components

import ForgotPassword from "./pages/auth/Forgot";
import Login from "./pages/auth/Login";
import HRRegister from './pages/auth/HRRegister';
import CandidateRegister from './pages/auth/candidateRegister';

// Layouts
import HRLayout from "./layouts/HRLayout";
import CompanyAdminLayout from "./layouts/companyAdminLayout";
import CandidateLayout from "./layouts/candidateLayout";


// HR Pages
import HRDashboard from './pages/hr/Dashboard';
import UploadResume from './pages/hr/UploadResume';
import ManageJD from './pages/hr/Managejd';
import InterviewScore from './pages/hr/InterviewScore';
import JDListStatus from './pages/hr/JD/JDListStatus';
import HRProfile from './pages/hr/Profile';
import InterviewDetail from './pages/hr/InterviewDetail';
import CandidateManagement from "./pages/hr/CandidateManagement";

// Company Admin Pages
import CompanyAdminDashboard from "./pages/companyAdmin/HR/Home";
import Profile from "./pages/companyAdmin/HR/Profile";
import ManageHR from "./pages/companyAdmin/HR/ManageHR";
import HrVsJd from "./pages/companyAdmin/HR/analytics/HrVsJd";
import JdVsMonths from "./pages/companyAdmin/HR/analytics/JdVsMonths";
import AppliedJdVsJd from "./pages/companyAdmin/HR/analytics/AppliedJdVsJd";
import ViewHR from './pages/companyAdmin/HR/ViewHR';
import Notifications from './pages/companyAdmin/HR/Notifications';
import SettingsScreen from "./pages/common/Sttings";
import Application from './pages/Candidate/Application';

//Candidate
import CandidateDashboard from './pages/Candidate/Dashboard';
import CandidateProfile from './pages/Candidate/Profile';

//super-admin
import SuperAdminHome from "./pages/auth/superAdmin/SuperAdminDashboard";
import FeedbackCenter from "./pages/auth/superAdmin/feedbackCenter";
import SupportCenter from "./pages/auth/superAdmin/SupportCenter";
import SubSuperAdminManager from "./pages/auth/superAdmin/ManageSubAdmin";
import CompanyManagementDashboard from "./pages/auth/superAdmin/company/companyList";



const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {isLoading ? (
        <Preloader isVisible={true} />
      ) : (
        <div className="min-h-screen flex flex-col">
         
          {!location.pathname.startsWith('/hr/') && !location.pathname.startsWith('/company/') && !location.pathname.startsWith('/candidate/') && (
            <DashboardHeader isDashboard={false} />
          )}
          
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/why-rms" element={<WhyRMS />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot" element={<ForgotPassword/>} />
              <Route path="/hr-register" element={<HRRegister />} />
              <Route path="/candidate-register" element={<CandidateRegister />} />
              
              
              {/* HR Routes */}
              <Route path="/hr" element={<HRLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<HRDashboard />} />
                <Route path="managejd" element={<ManageJD />} />
                <Route path="uploadresume" element={<UploadResume />} />
                <Route path="interviewscore" element={<InterviewScore />} />
                <Route path="jdliststatus" element={<JDListStatus />} />
                <Route path="profile" element={<HRProfile />} />
                <Route path="interview/:id" element={<InterviewDetail />} />
                <Route path="settings" element={<SettingsScreen />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="candidate-management" element={<CandidateManagement />} />
                {/* Redirect old HR routes */}
                <Route path="*" element={<Navigate to="/hr/dashboard" replace />} />
              </Route>
              
              {/* Company Admin Routes */}
              <Route path="/company" element={<CompanyAdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<CompanyAdminDashboard />} />
                <Route path="analytics" element={<Navigate to="jd-vs-months" replace />} />
                <Route path="analytics/hr-vs-jd" element={<HrVsJd />} />
                <Route path="analytics/jd-vs-months" element={<JdVsMonths />} />
                <Route path="analytics/applied-jd-vs-jd" element={<AppliedJdVsJd />} />
                <Route path="profile" element={<Profile />} />
                <Route path="manage-hr" element={<ManageHR />} />
                <Route path="settings" element={<SettingsScreen />} />
                <Route path="view-hr" element={<ViewHR />} />
                <Route path="notifications" element={<Notifications />} />
                {/* Redirect old company admin routes */}
                <Route path="*" element={<Navigate to="/company/dashboard" replace />} />
              </Route>
              
              {/* Candidate Routes */}
              <Route path="/candidate" element={<CandidateLayout />}> 
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<CandidateDashboard />} />
                <Route path="profile" element={<CandidateProfile />} />
                <Route path="applications" element={<Application />} />
                <Route path="settings" element={<SettingsScreen />} />
                <Route path="notifications" element={<Notifications />} />
                {/* Redirect old candidate routes */}
                <Route path="*" element={<Navigate to="/candidate/dashboard" replace />} />
              </Route>
              
              Legacy Redirects
              <Route path="/dashboard" element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="/hrdashboard" element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="/managejd" element={<Navigate to="/hr/managejd" replace />} />
              <Route path="/uploadresume" element={<Navigate to="/hr/uploadresume" replace />} />
              <Route path="/interviewscore" element={<Navigate to="/hr/interviewscore" replace />} />
              <Route path="/jdliststatus" element={<Navigate to="/hr/jdliststatus" replace />} />
              <Route path="/hr-dashboard" element={<Navigate to="/company/dashboard" replace />} />
              <Route path="/analytics" element={<Navigate to="/company/analytics" replace />} />
              <Route path="/profile" element={<Navigate to="/company/profile" replace />} />
              <Route path="/manage-hr" element={<Navigate to="/company/manage-hr" replace />} />
              <Route path="/settings" element={<Navigate to="/company/settings" replace />} />
              <Route path="/view-hr" element={<Navigate to="/company/view-hr" replace />} />
              <Route path="/notifications" element={<Navigate to="/company/notifications" replace />} />

              //super-admin routes
              <Route path="/super-admin" element={<SuperAdminHome />} />
              <Route path="/feedback-center" element={<FeedbackCenter />} />
              <Route path="/support-center" element={<SupportCenter />} />
              <Route path="/manage-sub-admin" element={<SubSuperAdminManager />} />
              <Route path="/company-management" element={<CompanyManagementDashboard />} />
              
              
              {/* Authenticated Redirects */}
              
              {/* 404 - Keep this last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Only show footer for non-dashboard routes */}
          {!location.pathname.startsWith('/hr/') && !location.pathname.startsWith('/company/') && !location.pathname.startsWith('/candidate/') && (
            <Footer />
          )}
        </div>
      )}
    </>
  );
};

import ScrollToTop from './components/ScrollToTop';
import DashboardHeader from "./pages/companyAdmin/HR/DashboardHeader";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;