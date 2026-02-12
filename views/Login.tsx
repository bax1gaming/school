
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API Delay
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.username === username && u.password === password);
      
      if (user) {
        onLogin(user);
      } else {
        setError('بيانات الدخول غير صحيحة. يرجى التأكد من الكود وكلمة المرور.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <Layout showNav={false}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-[480px]">
          <div className="text-center mb-8">
            <div 
              onClick={() => window.location.href = '#/'}
              className="w-16 h-16 water-gradient rounded-2xl mx-auto flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-sky-900/20 mb-6 cursor-pointer hover:scale-105 transition-transform"
            >
              Q
            </div>
            <h1 className="text-2xl font-black text-slate-800 mb-2">منصة الخدمات الرقمية</h1>
            <p className="text-slate-500 text-sm">مدرسة مياه الشرب والصرف الصحي بقنا</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-r-4 border-sky-600 pr-3">تسجيل الدخول</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 mr-1">كود المستخدم / الرقم القومي</label>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-700 font-bold"
                  placeholder="أدخل الكود الخاص بك"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 mr-1">كلمة المرور</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-700 font-bold"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl text-sm font-bold animate-shake">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 water-gradient text-white font-black rounded-2xl shadow-xl shadow-sky-900/30 hover:shadow-sky-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'دخول للمنصة'
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
              <button className="text-sm font-bold text-sky-700 hover:text-sky-800 text-center">نسيت كلمة المرور؟</button>
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-2 font-bold">للمساعدة الفنية، تواصل مع الدعم</p>
                <p className="text-sm font-black text-slate-700 tracking-wider">0123 456 7890</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Secure RBAC System &copy; 2024
          </div>
        </div>
      </div>
    </Layout>
  );
};
