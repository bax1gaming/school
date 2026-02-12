
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { UserRole, User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const InstructorDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'reports'>('content');

  return (
    <Layout userRole={UserRole.TEACHER}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800">أهلاً {user.fullName.split(' ')[0]}</h2>
            <p className="text-slate-500">لوحة إدارة المناهج والتقارير السلوكية</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
              <button 
                onClick={() => setActiveTab('content')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'content' ? 'water-gradient text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                رفع المحتوى
              </button>
              <button 
                onClick={() => setActiveTab('reports')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'reports' ? 'water-gradient text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                بلاغات الطلاب
              </button>
            </div>
            <button 
              onClick={onLogout}
              className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 transition-all"
            >
              خروج
            </button>
          </div>
        </div>

        {activeTab === 'content' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-sky-800">
                <span className="text-2xl">📹</span> رفع فيديو تعليمي
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">عنوان المحاضرة</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-sky-500" placeholder="مثال: صيانة محابس الهواء في الشبكات" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">المادة العلمية</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none">
                    <option>شبكات المياه والصرف</option>
                    <option>محطات المعالجة</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <p className="text-slate-400 text-sm">اسحب ملف الفيديو هنا أو اضغط للاختيار</p>
                </div>
                <button className="w-full py-4 water-gradient text-white font-bold rounded-xl shadow-lg">بدء الرفع</button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-black mb-4">إرشادات الرفع</h3>
                    <ul className="space-y-4 text-sm text-slate-300">
                        <li className="flex gap-2">✅ يفضل استخدام صيغة MP4 بدقة 720p.</li>
                        <li className="flex gap-2">✅ لا يتجاوز حجم الملف 500 ميجابايت.</li>
                        <li className="flex gap-2">✅ التأكد من وضوح الصوت في المعامل العملية.</li>
                    </ul>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-500/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-black text-slate-800 text-lg">تقديم بلاغ سلوكي جديد</h3>
                <button className="bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-rose-500/20">بلاغ طارئ</button>
            </div>
            <div className="p-8 max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">كود الطالب</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none" placeholder="12345" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">نوع المخالفة</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none">
                            <option>سلوك غير منضبط</option>
                            <option>إهمال في المهمات العملية</option>
                            <option>غياب متكرر</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">تفاصيل الواقعة</label>
                    <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none h-32" placeholder="اشرح ما حدث بالتفصيل لإدارة المدرسة..."></textarea>
                </div>
                <button className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl shadow-xl hover:bg-slate-700 transition-all">إرسال التقرير للإدارة</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
