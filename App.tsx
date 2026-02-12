
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from './views/LandingPage';
import { StudentDashboard } from './views/StudentDashboard';
import { InstructorDashboard } from './views/InstructorDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { Login } from './views/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserRole, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('qena_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('qena_user', JSON.stringify(userData));
    
    // Auto redirect after login happens in the Login component or via state change
    const path = userData.role === UserRole.STUDENT ? '/student' 
               : userData.role === UserRole.TEACHER ? '/instructor' 
               : '/admin';
    window.location.hash = '#' + path;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('qena_user');
    window.location.hash = '#/login';
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === UserRole.STUDENT ? '/student' : user.role === UserRole.TEACHER ? '/instructor' : '/admin'} /> : <Login onLogin={handleLogin} />} 
        />
        
        {/* Student Route */}
        <Route 
          path="/student" 
          element={
            <ProtectedRoute user={user} allowedRoles={[UserRole.STUDENT]}>
              <StudentDashboard onLogout={handleLogout} user={user!} />
            </ProtectedRoute>
          } 
        />
        
        {/* Instructor Route */}
        <Route 
          path="/instructor" 
          element={
            <ProtectedRoute user={user} allowedRoles={[UserRole.TEACHER]}>
              <InstructorDashboard onLogout={handleLogout} user={user!} />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute user={user} allowedRoles={[UserRole.ADMIN]}>
              <AdminDashboard onLogout={handleLogout} user={user!} />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* Quick Role Info for Dev */}
      {!user && (
        <div className="fixed bottom-4 left-4 z-[9999] flex flex-wrap gap-2 max-w-[300px] opacity-20 hover:opacity-100 transition-opacity">
          <div className="bg-white p-2 rounded-lg border border-slate-200 text-[8px] font-bold">
            Student: student123 / password<br/>
            Teacher: teacher456 / password<br/>
            Admin: admin789 / password
          </div>
        </div>
      )}
    </HashRouter>
  );
};

export default App;
