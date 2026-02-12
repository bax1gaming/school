import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { UserRole, User } from '../types';
import { MOCK_REPORTS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [healthStatus, setHealthStatus] = useState<'IDLE' | 'OK' | 'ERROR'>('IDLE');

  const runDiagnostics = async () => {
    setIsChecking(true);
    setHealthStatus('IDLE');
    try {
      // Create a fresh GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Simple ping to check connection
      // Fix: When setting maxOutputTokens, you must also set thinkingConfig.thinkingBudget
      await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'ping',
        config: { 
          maxOutputTokens: 2,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      setHealthStatus('OK');
    } catch (e) {
      console.error("Health Check Failed:", e);
      setHealthStatus('ERROR');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Layout userRole={UserRole.ADMIN}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800">إدارة المنصة - {user.fullName}</h2>
            <p className="text-slate-500">متابعة الأداء والنظام المدرسي العام</p>
          </div>
          <button 
            onClick={onLogout}
            className="bg-rose-100 hover:bg-rose-200 px-6 py-3 rounded-xl text-sm font-bold text-rose-700 transition-all"
          >
            خروج النظام
          </button>
        </div>
        
        {/* Statistics and Health Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
                { title: 'البلاغات المعلقة', value: '12', color: 'bg-amber-500' },
                { title: 'الطلاب المنذرين', value: '45', color: 'bg-rose-500' },
                { title: 'إجمالي المستخدمين', value: '1,562', color: 'bg-sky-600' },
                { title: 'محاضرات اليوم', value: '8', color: 'bg-emerald-500' },
            ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-1 h-full ${card.color}`}></div>
                    <p className="text-xs font-bold text-slate-400 mb-1">{card.title}</p>
                    <p className="text-3xl font-black text-slate-800">{card.value}</p>
                </div>
            ))}
        </div>

        {/* Diagnostics Panel */}
        <div className="mb-12 bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">
              🩺 فحص حالة النظام (System Diagnostics)
            </h3>
            <p className="text-slate-400 text-sm">تأكد من اتصال المنصة بخوادم الذكاء الاصطناعي وقاعدة البيانات.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-xl border text-sm font-bold ${
              healthStatus === 'OK' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' :
              healthStatus === 'ERROR' ? 'border-rose-500 text-rose-400 bg-rose-500/10' :
              'border-slate-700 text-slate-400'
            }`}>
              {isChecking ? 'جاري الفحص...' : 
               healthStatus === 'OK' ? 'الخدمة تعمل بنجاح' : 
               healthStatus === 'ERROR' ? 'فشل الاتصال (Check API Key)' : 
               'جاهز للفحص'}
            </div>
            <button 
              onClick={runDiagnostics}
              disabled={isChecking}
              className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm hover:bg-sky-100 transition-colors disabled:opacity-50"
            >
              تشغيل الاختبار
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-slate-800 text-xl">مراجعة بلاغات المدربين</h3>
                <span className="text-xs text-slate-400 font-bold">آخر تحديث: منذ 5 دقائق</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">المدرب</th>
                            <th className="px-6 py-4">الطالب</th>
                            <th className="px-6 py-4">الوصف</th>
                            <th className="px-6 py-4">الحالة</th>
                            <th className="px-6 py-4">الإجراء</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_REPORTS.map((report) => (
                            <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-700 text-sm">{report.teacherName}</td>
                                <td className="px-6 py-4 font-bold text-sky-700 text-sm">{report.studentName}</td>
                                <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">{report.description}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                        report.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                    }`}>
                                        {report.status === 'PENDING' ? 'قيد المراجعة' : 'تم الإجراء'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs font-bold hover:bg-sky-200 transition-all">تحويل لإنذار</button>
                                        <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">حفظ</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </Layout>
  );
};