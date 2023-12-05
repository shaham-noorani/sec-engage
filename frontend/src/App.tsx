import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import CompanyDashboard from "./Company/CompanyDashboard";
import RepresentativeProfile from "./Representative/RepresentativeProfile";
import StudentProfile from "./Student/StudentProfile";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/admin'
          Component={AdminDashboard}
        />
        <Route
          path='/company'
          Component={CompanyDashboard}
        />
        <Route
          path='/representative'
          Component={RepresentativeProfile}
        />
        <Route
          path='/student'
          Component={StudentProfile}
        />
      </Routes>
    </Router>
  );
};

export default App;
