
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string; // Student Code or National ID
  fullName: string;
  role: UserRole;
  password?: string; // Hashed in production
  classYear?: number; // 1, 2, or 3
  isActive: boolean;
  avatar?: string;
}

export interface Warning {
  id: string;
  studentId: string;
  senderId: string;
  senderName: string;
  message: string;
  date: string;
  isRead: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Report {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  description: string;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
  adminAction?: string;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  subjectId: string;
  url: string;
  uploaderId: string;
  duration: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  progress: number;
}
