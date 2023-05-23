import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
        <Route
          path="/home"
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
          path="/login"
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
          path="/"
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
              <UsersList />
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
      </Routes>
    </Router>
  );
}

export default App;
