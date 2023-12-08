import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PersistAuth from "./modules/auth/PersistAuth";

import RequireStudentAuth from "./modules/auth/RequireStudentAuth";
import RequireRepresentativeAuth from "./modules/auth/RequireRepresentativeAuth";
import RequireAdminAuth from "./modules/auth/RequireAdminAuth";

import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

import StudentDashboardPage from "./pages/StudentDashboardPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentCheckInOutPage from "./pages/StudentCheckInOutPage";
import StudentInteractionsPage from "./pages/StudentInteractionsPage";
import RepresentativeProfilePage from "./pages/RepresentativeProfilePage";
import RepresentativeInteractionsPage from "./pages/RepresentativeInteractionsPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import CompanyInteractionsPage from "./pages/CompanyInteractionsPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route element={<PersistAuth />}>
            <Route element={<RequireStudentAuth />}>
              <Route element={<Layout />}>
                <Route
                  path='/student'
                  index
                  element={<StudentDashboardPage />}
                />
                <Route
                  path='/student/profile'
                  index
                  element={<StudentProfilePage />}
                />
                <Route
                  path='/student/check-in-out'
                  element={<StudentCheckInOutPage />}
                />
                <Route
                  path='/student/interactions'
                  element={<StudentInteractionsPage />}
                />
              </Route>
            </Route>
            <Route element={<RequireRepresentativeAuth />}>
              <Route element={<Layout />}>
                <Route
                  path='/representative/profile'
                  index
                  element={<RepresentativeProfilePage />}
                />
                <Route
                  path='/representative/interactions'
                  element={<RepresentativeInteractionsPage />}
                />
                <Route
                  path='/representative/company/profile'
                  index
                  element={<CompanyProfilePage />}
                />
                <Route
                  path='/representative/company/interactions'
                  element={<CompanyInteractionsPage />}
                />
              </Route>
            </Route>
            <Route element={<RequireAdminAuth />}>
              <Route element={<Layout />}>
                <Route
                  path='/admin/analytics'
                  index
                  element={<AdminAnalyticsPage />}
                />
              </Route>
            </Route>
          </Route>
          <Route
            path='*'
            element={<Navigate to='/login' />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
