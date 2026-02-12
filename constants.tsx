import { UserRole, User } from './types';

// Production API Base
export const API_BASE_URL = '/api';

export const API_DOCS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  discipline: {
    sendWarning: `${API_BASE_URL}/warnings/send`,
    getWarnings: (id: string) => `${API_BASE_URL}/warnings/student/${id}`,
    createReport: `${API_BASE_URL}/reports/create`,
  },
  lms: {
    uploadVideo: `${API_BASE_URL}/videos/upload`,
    getVideos: (id: string) => `${API_BASE_URL}/videos/subject/${id}`,
  }
};

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'student123', fullName: 'أحمد محمود علي', role: UserRole.STUDENT, password: 'password', classYear: 2, isActive: true },
  { id: 'u2', username: 'teacher456', fullName: 'م. إبراهيم حسن', role: UserRole.TEACHER, password: 'password', isActive: true },
  { id: 'u3', username: 'admin789', fullName: 'د. خالد إبراهيم', role: UserRole.ADMIN, password: 'password', isActive: true },
];

export const MOCK_REPORTS = [
  { id: 'r1', teacherName: 'م. أحمد علي', studentName: 'ياسين محمد', description: 'تغيب متكرر عن حصة الشبكات العملية', status: 'PENDING', createdAt: '2024-05-20' },
  { id: 'r2', teacherName: 'أ. سارة كامل', studentName: 'عمر خالد', description: 'عدم الالتزام بزي المعمل الكيميائي', status: 'RESOLVED', createdAt: '2024-05-18' }
];

export const MOCK_WARNINGS = [
  { id: 'w1', senderName: 'الإدارة', message: 'إنذار أول: غياب بدون عذر مقبول لمدة 3 أيام.', date: '2024-05-21', isRead: false, severity: 'HIGH' }
];

export const ROADMAP = [
  {
    phase: 'المرحلة الأولى: التأسيس الرقمي',
    items: ['إطلاق منصة التعليم الموحدة', 'رقمنة سجلات الطلاب والمعلمين', 'نظام البلاغات والتقارير السلوكية']
  },
  {
    phase: 'المرحلة الثانية: التفاعل الذكي',
    items: ['تفعيل المساعد الذكي (AI Tutor)', 'بوابة ولي الأمر التفاعلية', 'نظام إدارة المحتوى التعليمي (LMS)']
  }
];

export const SUBJECTS_LIST = [
  { id: 's1', name: 'تكنولوجيا شبكات المياه', code: 'WAT101', teacher: 'م. إبراهيم حسن', progress: 75 },
  { id: 's2', name: 'تشغيل محطات المعالجة', code: 'WAT102', teacher: 'أ.د. محمود سعيد', progress: 45 },
  { id: 's3', name: 'الكيمياء الفنية والمختبرات', code: 'CHM201', teacher: 'أ. سارة أحمد', progress: 90 }
];