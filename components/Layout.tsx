
import React from 'react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole, showNav = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      {showNav && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 water-gradient rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                Q
              </div>
              <h1 className="text-xl font-bold text-sky-900 hidden md:block">
                مدرسة مياه الشرب والصرف الصحي بقنا
              </h1>
            </div>
            
            <nav className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-sky-700 transition-colors">
                الرئيسية
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-sky-700 transition-colors">
                المناهج
              </button>
              {userRole ? (
                <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">مرحباً بك</p>
                    <p className="text-sm font-bold text-slate-800">طالب متميز</p>
                  </div>
                  <div className="w-8 h-8 bg-sky-100 rounded-full border border-sky-200"></div>
                </div>
              ) : (
                <button className="px-5 py-2 water-gradient text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all">
                  تسجيل الدخول
                </button>
              )}
            </nav>
          </div>
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h3 className="text-white font-bold mb-4">عن المدرسة</h3>
            <p className="text-sm leading-relaxed">
              صرح تعليمي فني متميز متخصص في إعداد كوادر فنية مؤهلة في تكنولوجيا مياه الشرب والصرف الصحي لمحافظة قنا وصعيد مصر.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>المناهج الدراسية</li>
              <li>لوحة تحكم المعلم</li>
              <li>بوابة ولي الأمر</li>
              <li>سياسة الخصوصية</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">تواصل معنا</h3>
            <p className="text-sm">قنا، مصر - شارع الصالحية</p>
            <p className="text-sm mt-2">info@qenawater.edu.eg</p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {/* Social icons placeholder */}
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} المدرسة الفنية لمياه الشرب بقنا
        </div>
      </footer>
    </div>
  );
};
