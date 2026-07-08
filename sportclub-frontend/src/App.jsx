import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

import DashboardAdmin from './pages/admin/DashboardAdmin';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          } />

          <Route path="/coach/dashboard" element={
            <ProtectedRoute roles={['coach']}>
              <CoachDashboard />
            </ProtectedRoute>
          } />
          <Route path="/coach" element={
            <ProtectedRoute roles={['coach']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/coach/dashboard" replace />} />
            <Route path="classes" element={<MyClasses />} />
            <Route path="schedules" element={<MySchedules />} />
            <Route path="rooms" element={<MyRooms />} />
          </Route>

          <Route path="/user/dashboard" element={
            <ProtectedRoute roles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user" element={
            <ProtectedRoute roles={['user']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/user/dashboard" replace />} />
            <Route path="classes" element={<AvailableClasses />} />
            <Route path="reservations" element={<MyReservations />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
