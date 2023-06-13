import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import {
  ApplyDoctor,
  Appointments,
  BookAppointment,
  Consultation,
  Consultation2,
  DoctorAppointments,
  DoctorProfile,
  DoctorsList,
  Forgot,
  AddAdmin,
  Home,
  Login,
  Main2,
  Messenger,
  Messenger2,
  Notifications,
  PatientProfile,
  Register,
  Reset,
  UsersList,
  Verify,
  ViewAppointments,
} from "./pages";

import {
  About,
  Contact,
  Footer,
  ProtectedRoute,
  PublicRoute,
  Services,
} from "./components";

import MainNav from "./components/Navbars/MainNav";
import UsersListDoctor from "./pages/Doctor/UsersList";
import ProfileViewAdmin from "./pages/Admin/PatientProfileAdmin";
import DoctorPendingAppointments from "./pages/Doctor/PendingAppointment";
import DoctorHistoryAppointments from "./pages/Doctor/AppointmentHistory";
import AddAccount from "./pages/Doctor/AddAccount";
import AdminAppointments from "./pages/Admin/appointments";
import AdminProfile from "./pages/Admin/AdminProfile";
import Messenger3 from "./pages/Admin/chat";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <Router>
      {loading && (
        // <div className="spinner-parent">
        //   <div className="pulse" role="status"></div>
        // </div>
        <div className="loader fullScreen">
          <div className="wrapper">
            <div className="inner" />
            <div className="text">LOADING</div>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <MainNav />
              <Main2 />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PublicRoute>
              <MainNav />
              <About />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/services"
          element={
            <PublicRoute>
              <MainNav />
              <Services />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicRoute>
              <MainNav />
              <Contact />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="https://fuentes-clinic-website.onrender.com/login"
          element={
            <PublicRoute>
              <MainNav />
              <Login />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot"
          element={
            <PublicRoute>
              <MainNav />
              <Forgot />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/reset"
          element={
            <PublicRoute>
              <MainNav />
              <Reset />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <PublicRoute>
              <MainNav />
              <Verify />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <MainNav />
              <Register />
              <Footer />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile/:userId"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile/:userId"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        {/* View Appointments, di ko muna nilagyan ng id para lumabas agad ui */}
        <Route
          path="/doctor/appointments/:userId"
          element={
            <ProtectedRoute>
              <ViewAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addadmin"
          element={
            <ProtectedRoute>
              <AddAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/messenger/:userId"
          element={
            <ProtectedRoute>
              <Messenger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/messenger/:userId"
          element={
            <ProtectedRoute>
              <Messenger2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messenger3/:userId"
          element={
            <ProtectedRoute>
              <Messenger3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/consultation"
          element={
            <ProtectedRoute>
              <Consultation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/consultation"
          element={
            <ProtectedRoute>
              <Consultation2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/userslist"
          element={
            <ProtectedRoute>
              <UsersListDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctorslist"
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
        {/* 03/06/2023, BABAGUHIN ROUTE... SIGURO? */}
        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/pending"
          element={
            <ProtectedRoute>
              <DoctorPendingAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/history"
          element={
            <ProtectedRoute>
              <DoctorHistoryAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/addaccount"
          element={
            <ProtectedRoute>
              <AddAccount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <AdminAppointments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
