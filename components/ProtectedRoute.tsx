
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole, User } from '../types';

interface ProtectedRouteProps {
  user: User | null;
  allowedRoles: UserRole[];
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, allowedRoles, children }) => {
  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but doesn't have the right role
    return <Navigate to="/" replace />;
  }

  if (!user.isActive) {
    // User is banned/inactive
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md">
          <div className="text-4xl mb-4 text-rose-500">🚫</div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">الحساب غير نشط</h2>
          <p className="text-slate-600 mb-6">عذراً، تم تعطيل حسابك من قبل إدارة المدرسة. يرجى مراجعة شؤون الطلاب.</p>
          <button 
            onClick={() => window.location.href = '#/'} 
            className="w-full py-3 water-gradient text-white font-bold rounded-xl"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return children;
};
