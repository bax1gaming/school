
import React from 'react';
import { Layout } from '../components/Layout';
import { UserRole, User } from '../types';
import { SUBJECTS_LIST, MOCK_WARNINGS } from '../constants';
import { AITutor } from '../components/AITutor';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const StudentDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <Layout userRole={UserRole.STUDENT}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Urgent Warnings Section */}
        {MOCK_WARNINGS.length > 0 && MOCK_WARNINGS.some(w => !w.isRead) && (
          <div className="mb-8 bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 flex items-start gap-4 animate-bounce">
            <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-rose-500/20">⚠️</div>
            <div className="flex-1">
              <h4 className="font-black text-rose-800 text-lg">تحذير رسمي عاجل</h4>
              <p className="text-rose-700 text-sm">{MOCK_WARNINGS[0].message}</p>
              <button className="mt-3 px-4 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-md">لقد قرأت التحذير</button>
            </div>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="water-gradient rounded-3xl p-8 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-sky-900/30">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-2">أهلاً بك يا {user.fullName.split(' ')[0]}، فني المستقبل! 🛠️</h2>
            <p className="text-sky-100 opacity-90">اليوم هو الثلاثاء، 20 أكتوبر - تذكر أن تراجع محاضرة محطات المعالجة.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-center min-w-[120px]">
              <p className="text-3xl font-black">95%</p>
              <p className="text-xs font-bold opacity-80 uppercase tracking-wider">الحضور</p>
            </div>
            <button 
              onClick={onLogout}
              className="bg-white/20 hover:bg-white/30 p-4 rounded-2xl text-sm font-bold transition-all"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Subjects & AI Tutor */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-800">موادي الدراسية - الصف {user.classYear}</h3>
                <button className="text-sm font-bold text-sky-700 hover:underline">عرض الكل</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUBJECTS_LIST.slice(0, 4).map((subject) => (
                  <div key={subject.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded text-[10px] font-bold border border-sky-100">{subject.code}</span>
                      <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all">➔</button>
                    </div>
                    <h4 className="font-black text-slate-800 mb-1">{subject.name}</h4>
                    <p className="text-xs text-slate-500 mb-4">{subject.teacher}</p>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full transition-all duration-1000" style={{ width: `${subject.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
                <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-xl font-black text-slate-800">مساعد الذكاء الاصطناعي الفني</h3>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Beta</span>
                </div>
                <AITutor />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 water-gradient rounded-full"></span>
                جدول اليوم
              </h3>
              <div className="space-y-4">
                {[
                  { time: '08:00 ص', subject: 'كيمياء تحليلية', room: 'معمل 1' },
                  { time: '10:00 ص', subject: 'شبكات مياه', room: 'قاعة 4' },
                  { time: '01:00 م', subject: 'ميكانيكا', room: 'الورشة الفنية' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="text-sky-600 font-bold text-xs whitespace-nowrap bg-sky-50 p-2 rounded-lg">{item.time}</div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">{item.subject}</h5>
                      <p className="text-xs text-slate-500">{item.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
