
import React from 'react';
import { Layout } from '../components/Layout';
import { ROADMAP } from '../constants';

export const LandingPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-sky-950/60 z-10"></div>
        <img 
          src="https://picsum.photos/seed/water-tech/1920/1080" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Water Technology"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            نحو جيل من الكوادر الفنية <br/> المبدعة في <span className="text-sky-400">تكنولوجيا المياه</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 text-slate-200">
            المنصة التعليمية الموحدة لطلاب المدرسة الثانوية الفنية لمياه الشرب والصرف الصحي بمحافظة قنا.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href = '#/login'}
              className="w-full sm:w-auto px-8 py-4 water-gradient text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-sky-900/40"
            >
              بوابة الخدمات الرقمية (دخول)
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              اكتشف المناهج
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'طالب وطالبة', value: '+1500' },
            { label: 'مادة تخصصية', value: '18' },
            { label: 'محطة تدريبية', value: '4' },
            { label: 'معلم خبير', value: '+45' }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-slate-50 rounded-2xl">
              <p className="text-3xl font-black text-sky-800 mb-1">{stat.value}</p>
              <p className="text-slate-500 font-bold text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialized Curriculum */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sky-600 font-bold uppercase tracking-widest text-sm mb-2 block">التميز الأكاديمي</span>
          <h3 className="text-3xl font-black text-slate-800">تخصصات تكنولوجيا المياه</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'شبكات المياه', icon: '💧', desc: 'دراسة أنظمة التوزيع والضخ والصيانة الدورية للشبكات.' },
            { title: 'محطات المعالجة', icon: '🏭', desc: 'فهم عمليات تنقية مياه الشرب ومعالجة مياه الصرف الصحي.' },
            { title: 'الكيمياء الفنية', icon: '🧪', desc: 'إجراء التحاليل المخبرية لضمان جودة المياه والمعايير الصحية.' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="text-4xl mb-6 bg-sky-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
              <h4 className="text-xl font-black text-slate-800 mb-4">{item.title}</h4>
              <div className="h-1 w-12 water-gradient rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Development Roadmap Section */}
      <section className="py-20 bg-slate-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-slate-800">خطة التطوير (System Roadmap)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROADMAP.map((phase, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-slate-200 group-hover:bg-sky-500 transition-colors"></div>
                <h4 className="font-black text-sky-700 mb-4 text-lg">{phase.phase}</h4>
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-sky-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
