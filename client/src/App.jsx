import React from 'react';
import {Toaster} from 'react-hot-toast';
import {useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

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
} from './pages';

import {
  About,
  Contact,
  Footer,
  ProtectedRoute,
  PublicRoute,
  Services,
} from './components';

import MainNav from './components/Navbars/MainNav';
import UsersListDoctor from './pages/Doctor/UsersList';
import ProfileViewAdmin from './pages/Admin/PatientProfileAdmin';
import DoctorPendingAppointments from './pages/Doctor/PendingAppointment';
import DoctorHistoryAppointments from './pages/Doctor/AppointmentHistory';
import AddAccount from './pages/Doctor/AddAccount';
import AdminAppointments from './pages/Admin/appointments';
import AdminProfile from './pages/Admin/AdminProfile';
import Messenger3 from './pages/Admin/chat';

function App () {
  const {loading} = useSelector (state => state.alerts);
  return (
    <Router basename="/">
      {loading &&
        <div className="loader fullScreen">
          <div className="wrapper">
            <div className="inner" />
            <div className="text">LOADING</div>
          </div>
        </div>}
      <Toaster position="top-center" reverseOrder={false} />

      <MainNav />

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Main2 />
            </PublicRoute>
          }
        />
        <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
        <Route
          path="/services"
          element={<PublicRoute><Services /></PublicRoute>}
        />
        <Route
          path="/contact"
          element={<PublicRoute><Contact /></PublicRoute>}
        />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/forgot" element={<PublicRoute><Forgot /></PublicRoute>} />
        <Route path="/reset" element={<PublicRoute><Reset /></PublicRoute>} />
        <Route path="/verify" element={<PublicRoute><Verify /></PublicRoute>} />
        <Route
          path="/register"
          element={<PublicRoute><Register /></PublicRoute>}
        />

        <ProtectedRoute path="/home" element={<Home />} />
        <ProtectedRoute
          path="/user/profile/:userId"
          element={<PatientProfile />}
        />
        <ProtectedRoute
          path="/admin/profile/:userId"
          element={<AdminProfile />}
        />
        <ProtectedRoute
          path="/doctor/appointments/:userId"
          element={<ViewAppointments />}
        />
        <ProtectedRoute path="/admin/addadmin" element={<AddAdmin />} />
        <ProtectedRoute
          path="/user/messenger/:userId"
          element={<Messenger />}
        />
        <ProtectedRoute
          path="/doctor/messenger/:userId"
          element={<Messenger2 />}
        />
        <ProtectedRoute
          path="/admin/messenger3/:userId"
          element={<Messenger3 />}
        />
        <ProtectedRoute path="/user/consultation" element={<Consultation />} />
        <ProtectedRoute
          path="/doctor/consultation"
          element={<Consultation2 />}
        />
        <ProtectedRoute path="/apply-doctor" element={<ApplyDoctor />} />
        <ProtectedRoute path="/notifications" element={<Notifications />} />
        <ProtectedRoute path="/admin/userslist" element={<UsersList />} />
        <ProtectedRoute
          path="/doctor/userslist"
          element={<UsersListDoctor />}
        />
        <ProtectedRoute path="/admin/doctorslist" element={<DoctorsList />} />
        <ProtectedRoute
          path="/doctor/profile/:userId"
          element={<DoctorProfile />}
        />
        <ProtectedRoute
          path="/book-appointment/:doctorId"
          element={<BookAppointment />}
        />
        <ProtectedRoute path="/appointments" element={<Appointments />} />
        <ProtectedRoute
          path="/doctor/appointments"
          element={<DoctorAppointments />}
        />
        <ProtectedRoute
          path="/doctor/pending"
          element={<DoctorPendingAppointments />}
        />
        <ProtectedRoute
          path="/doctor/history"
          element={<DoctorHistoryAppointments />}
        />
        <ProtectedRoute path="/doctor/addaccount" element={<AddAccount />} />
        <ProtectedRoute
          path="/admin/appointments"
          element={<AdminAppointments />}
        />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
