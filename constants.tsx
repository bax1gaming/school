
import { UserRole, User } from './types';

export const API_DOCS = {
  auth: {
    login: "POST /api/auth/login -> { token, role, user_data }",
  },
  discipline: {
    sendWarning: "POST /api/warnings/send { student_id, message, severity }",
    getWarnings: "GET /api/warnings/student/:id",
    createReport: "POST /api/reports/create { student_id, description }",
    processReport: "PATCH /api/reports/:id { action: 'accept' | 'reject', comment }",
  },
  lms: {
    uploadVideo: "POST /api/videos/upload (Multipart/form-data)",
    getVideos: "GET /api/videos/subject/:id",
  },
  ai: {
    ask: "POST /api/ai/ask { query } -> Stream responses",
    ingest: "POST /api/ai/ingest { file_id } -> Trigger PDF processing",
  }
};

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'student123', fullName: 'أحمد محمود علي', role: UserRole.STUDENT, password: 'password', classYear: 2, isActive: true },
  { id: 'u2', username: 'teacher456', fullName: 'م. إبراهيم حسن', role: UserRole.TEACHER, password: 'password', isActive: true },
  { id: 'u3', username: 'admin789', fullName: 'د. خالد إبراهيم', role: UserRole.ADMIN, password: 'password', isActive: true },
  { id: 'u4', username: 'banned', fullName: 'طالب مشاغب', role: UserRole.STUDENT, password: 'password', isActive: false },
];

export const AI_LOGIC_PSEUDO = `
# AI RAG Logic Implementation (Python/LangChain)
def ask_qena_water_tutor(query, student_id):
    # 1. Embed the query
    query_embedding = embedding_model.embed(query)
    
    # 2. Vector Search
    context_chunks = vector_db.similarity_search(query_embedding, k=4)
    
    # 3. Augment Prompt
    system_prompt = """أنت المساعد الذكي لمدرسة مياه الشرب بقنا. 
    استخدم السياق التالي فقط للإجابة. إذا لم تجد الإجابة، قل لا أعلم.
    السياق: {context_chunks}"""
    
    # 4. Generate Response using Gemini
    response = gemini.generate(system_prompt + query)
    return response
`;

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
  },
  {
    phase: 'المرحلة الثالثة: الواقع الافتراضي',
    items: ['معامل افتراضية لمحطات المعالجة', 'تدريب عملي بتقنية 3D', 'تطبيق الهاتف المحمول المتكامل']
  },
  {
    phase: 'المرحلة الرابعة: التميز التقني',
    items: ['ربط المنصة بسوق العمل', 'تحليلات الأداء المتقدمة للطلاب', 'شهادات رقمية مؤمنة (Blockchain)']
  }
];

export const SUBJECTS_LIST = [
  { id: 's1', name: 'تكنولوجيا شبكات المياه', code: 'WAT101', teacher: 'م. إبراهيم حسن', progress: 75 },
  { id: 's2', name: 'تشغيل محطات المعالجة', code: 'WAT102', teacher: 'أ.د. محمود سعيد', progress: 45 },
  { id: 's3', name: 'الكيمياء الفنية والمختبرات', code: 'CHM201', teacher: 'أ. سارة أحمد', progress: 90 },
  { id: 's4', name: 'ميكانيكا المضخات والمحركات', code: 'MEC105', teacher: 'م. ياسر جلال', progress: 30 },
  { id: 's5', name: 'الهيدروليكا التطبيقية', code: 'HYD302', teacher: 'م. فوزي علي', progress: 60 }
];
