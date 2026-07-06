import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardAdmin from './pages/admin/DashboardAdmin';
import UsersPage from './pages/admin/UsersPage';
import SportsPage from './pages/admin/SportsPage';
import RoomsPage from './pages/admin/RoomsPage';
import SportRoomsPage from './pages/admin/SportRoomsPage';
import SchedulesPage from './pages/admin/SchedulesPage';
import ReservationsPage from './pages/admin/ReservationsPage';

import CoachDashboard from './pages/coach/CoachDashboard';
import MyClasses from './pages/coach/MyClasses';
import MySchedules from './pages/coach/MySchedules';
import MyRooms from './pages/coach/MyRooms';

import UserDashboard from './pages/user/UserDashboard';
import AvailableClasses from './pages/user/AvailableClasses';
import MyReservations from './pages/user/MyReservations';
import ProfilePage from './pages/user/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardAdmin />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="sports" element={<SportsPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="sport-rooms" element={<SportRoomsPage />} />
            <Route path="schedules" element={<SchedulesPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
          </Route>

          <Route path="/coach" element={
            <ProtectedRoute roles={['coach']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/coach/dashboard" replace />} />
            <Route path="dashboard" element={<CoachDashboard />} />
            <Route path="classes" element={<MyClasses />} />
            <Route path="schedules" element={<MySchedules />} />
            <Route path="rooms" element={<MyRooms />} />
          </Route>

          <Route path="/user" element={
            <ProtectedRoute roles={['user']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/user/dashboard" replace />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="classes" element={<AvailableClasses />} />
            <Route path="reservations" element={<MyReservations />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
