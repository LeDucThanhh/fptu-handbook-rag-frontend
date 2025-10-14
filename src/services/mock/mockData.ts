// Mock Data cho FPTU Handbook RAG System
import { UserRole } from "@/types";

// ==================== HANDBOOK DATA ====================
export const mockHandbookSections = [
  {
    id: "hb-001",
    title: "Giới thiệu về FPT University",
    content: "FPT University là trường đại học tư thục hàng đầu Việt Nam...",
    category: "Giới thiệu",
    version: "1.0",
    updatedAt: "2024-10-01",
  },
  {
    id: "hb-002",
    title: "Học phí và Học bổng",
    content: "Học phí trung bình: 18-22 triệu/kỳ. Nhiều học bổng từ 30%-100%...",
    category: "Tài chính",
    version: "1.0",
    updatedAt: "2024-10-05",
  },
  {
    id: "hb-003",
    title: "Quy chế đào tạo",
    content: "Hệ thống tín chỉ, điều kiện tốt nghiệp, quy định về điểm...",
    category: "Học vụ",
    version: "1.0",
    updatedAt: "2024-10-01",
  },
  {
    id: "hb-004",
    title: "Ký túc xá và Cơ sở vật chất",
    content: "KTX hiện đại, phòng 4-6 người, đầy đủ tiện nghi...",
    category: "Sinh viên",
    version: "1.0",
    updatedAt: "2024-09-28",
  },
];

// ==================== CLUBS DATA ====================
export const mockClubs = [
  {
    id: "club-001",
    name: "FPTU Code",
    type: "Học thuật",
    icon: "💻",
    color: "blue",
    description: "Câu lạc bộ lập trình và công nghệ",
    members: 250,
    isActive: true,
    coordinator: "Nguyễn Văn A",
    contactEmail: "fcode@fpt.edu.vn",
  },
  {
    id: "club-002",
    name: "FPTU Football",
    type: "Thể thao",
    icon: "⚽",
    color: "green",
    description: "Câu lạc bộ bóng đá FPT",
    members: 180,
    isActive: true,
    coordinator: "Trần Văn B",
    contactEmail: "football@fpt.edu.vn",
  },
  {
    id: "club-003",
    name: "FPTU Music",
    type: "Nghệ thuật",
    icon: "🎵",
    color: "purple",
    description: "Câu lạc bộ âm nhạc",
    members: 120,
    isActive: true,
    coordinator: "Lê Thị C",
    contactEmail: "music@fpt.edu.vn",
  },
  {
    id: "club-004",
    name: "FPTU Dance",
    type: "Nghệ thuật",
    icon: "💃",
    color: "pink",
    description: "Câu lạc bộ nhảy hiện đại",
    members: 95,
    isActive: true,
    coordinator: "Phạm Thị D",
    contactEmail: "dance@fpt.edu.vn",
  },
  {
    id: "club-005",
    name: "FPTU Business",
    type: "Học thuật",
    icon: "💼",
    color: "orange",
    description: "Câu lạc bộ kinh doanh và khởi nghiệp",
    members: 200,
    isActive: true,
    coordinator: "Hoàng Văn E",
    contactEmail: "business@fpt.edu.vn",
  },
];

// ==================== NOTIFICATIONS DATA ====================
export const mockNotifications = [
  {
    id: "notif-001",
    title: "Hướng dẫn sử dụng FPTU Handbook RAG",
    content: "Tân sinh viên nên tìm hiểu cách sử dụng hệ thống hỏi đáp AI để có thể tra cứu thông tin nhanh chóng...",
    type: "Học vụ",
    priority: "high",
    date: "2024-10-09",
    isRead: false,
    targetAudience: "Tất cả sinh viên",
  },
  {
    id: "notif-002",
    title: "Lịch đăng ký môn học kỳ Fall 2024",
    content: "Sinh viên năm nhất đăng ký môn học từ 12/10 đến 15/10. Sinh viên năm 2+ từ 10/10 đến 13/10...",
    type: "Học vụ",
    priority: "high",
    date: "2024-10-08",
    isRead: false,
    targetAudience: "Tất cả sinh viên",
  },
  {
    id: "notif-003",
    title: "Mở đăng ký học bổng tân sinh viên",
    content: "Học bổng dành cho tân sinh viên có thành tích học tập xuất sắc, hạn nộp hồ sơ: 20/10/2024",
    type: "Tài chính",
    priority: "medium",
    date: "2024-10-07",
    isRead: true,
    targetAudience: "Sinh viên K19",
  },
  {
    id: "notif-004",
    title: "Ngày hội Câu lạc bộ 2024",
    content: "Sự kiện giới thiệu và tuyển thành viên mới cho 50+ CLB. Thứ 6, 18/10/2024 - 9:00 AM",
    type: "Sự kiện",
    priority: "medium",
    date: "2024-10-06",
    isRead: true,
    targetAudience: "Tất cả sinh viên",
  },
];

// ==================== QUERY LOGS & UNRESOLVED ====================
export const mockQueryLogs = [
  {
    id: "query-001",
    question: "Học phí kỳ Fall 2024 là bao nhiêu?",
    answer: "Học phí kỳ Fall 2024 trung bình từ 18-22 triệu VNĐ tùy theo ngành học...",
    confidence: 0.95,
    sources: ["Handbook: Học phí và Học bổng"],
    userId: "student-001",
    timestamp: "2024-10-09 10:30:00",
    feedback: "positive",
  },
  {
    id: "query-002",
    question: "Làm sao để xin ở ký túc xá?",
    answer: "Để đăng ký ở ký túc xá, bạn cần nộp đơn qua hệ thống FAP trong tuần đầu của kỳ học...",
    confidence: 0.88,
    sources: ["Handbook: Ký túc xá"],
    userId: "student-002",
    timestamp: "2024-10-09 11:45:00",
    feedback: null,
  },
  {
    id: "query-003",
    question: "Có thể chuyển ngành không?",
    answer: "Tôi không tìm thấy thông tin chính xác về chuyển ngành. Vui lòng liên hệ phòng Đào tạo...",
    confidence: 0.45,
    sources: [],
    userId: "student-003",
    timestamp: "2024-10-09 14:20:00",
    feedback: "negative",
  },
];

export const mockUnresolvedQueries = [
  {
    id: "unresolved-001",
    question: "Có thể chuyển ngành không?",
    askedBy: "Nguyễn Văn C",
    askedAt: "2024-10-09 14:20:00",
    category: "Học vụ",
    aiConfidence: 0.45,
    status: "pending",
    assignedTo: null,
  },
  {
    id: "unresolved-002",
    question: "Quy trình xin nghỉ học tạm thời như thế nào?",
    askedBy: "Trần Thị D",
    askedAt: "2024-10-08 16:00:00",
    category: "Học vụ",
    aiConfidence: 0.52,
    status: "in_progress",
    assignedTo: "mentor-001",
  },
  {
    id: "unresolved-003",
    question: "Có được làm thêm trong campus không?",
    askedBy: "Lê Văn E",
    askedAt: "2024-10-08 09:30:00",
    category: "Sinh viên",
    aiConfidence: 0.38,
    status: "pending",
    assignedTo: null,
  },
];

// ==================== MENTOR POSTS ====================
export const mockMentorPosts = [
  {
    id: "post-001",
    title: "Hướng dẫn đăng ký học phần trực tuyến",
    content: "Các bước đăng ký học phần:\n1. Đăng nhập FAP\n2. Chọn 'Đăng ký học phần'\n3. Chọn môn học...",
    author: "Trần Thị Mentor",
    category: "Học vụ",
    status: "public",
    createdAt: "2024-10-05",
    views: 1250,
    helpful: 98,
  },
  {
    id: "post-002",
    title: "Câu hỏi thường gặp về học bổng",
    content: "Tổng hợp các câu hỏi về học bổng và học phí...",
    author: "Trần Thị Mentor",
    category: "Tài chính",
    status: "public",
    createdAt: "2024-10-03",
    views: 890,
    helpful: 75,
  },
  {
    id: "post-003",
    title: "Quy trình xin chuyển ngành",
    content: "Nội dung đang được biên tập...",
    author: "Nguyễn Văn Mentor 2",
    category: "Học vụ",
    status: "draft",
    createdAt: "2024-10-09",
    views: 0,
    helpful: 0,
  },
];

// ==================== ACTIVITIES ====================
export const mockClubActivities = [
  {
    id: "activity-001",
    clubId: "club-001",
    clubName: "FPTU Code",
    title: "Workshop: Introduction to React",
    description: "Buổi workshop giới thiệu về React cho người mới bắt đầu",
    date: "2024-10-15",
    time: "14:00 - 16:00",
    location: "Phòng 501, Tòa nhà Alpha",
    status: "upcoming",
    registrations: 45,
    maxParticipants: 50,
  },
  {
    id: "activity-002",
    clubId: "club-002",
    clubName: "FPTU Football",
    title: "Giao hữu bóng đá liên khoa",
    description: "Trận giao hữu giữa các khoa tại FPT",
    date: "2024-10-18",
    time: "16:00 - 18:00",
    location: "Sân bóng FPT",
    status: "upcoming",
    registrations: 22,
    maxParticipants: 30,
  },
  {
    id: "activity-003",
    clubId: "club-003",
    clubName: "FPTU Music",
    title: "Đêm nhạc Acoustic",
    description: "Đêm nhạc Acoustic với các ca khúc nhẹ nhàng",
    date: "2024-10-12",
    time: "19:00 - 21:00",
    location: "Hội trường B",
    status: "completed",
    registrations: 120,
    maxParticipants: 150,
  },
];

// ==================== SYSTEM METRICS ====================
export const mockSystemMetrics = {
  totalUsers: 10523,
  activeUsers: 8940,
  totalQueries: 45678,
  resolvedQueries: 42130,
  aiAccuracy: 0.92,
  avgResponseTime: 1.8,
  systemUptime: 0.998,
  totalClubs: 52,
  totalNotifications: 234,
  handbookSections: 156,
};

// ==================== USERS DATA ====================
export const mockUsersData = [
  {
    id: "user-001",
    email: "student1@fpt.edu.vn",
    fullName: "Nguyễn Văn An",
    roles: [UserRole.STUDENT],
    studentId: "SE170001",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "user-002",
    email: "student2@fpt.edu.vn",
    fullName: "Trần Thị Bình",
    roles: [UserRole.STUDENT],
    studentId: "SE170002",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "user-003",
    email: "mentor@fpt.edu.vn",
    fullName: "Lê Văn Mentor",
    roles: [UserRole.MENTOR],
    department: "Computer Science",
    isActive: true,
    createdAt: "2023-08-01",
  },
  {
    id: "user-004",
    email: "academic@fpt.edu.vn",
    fullName: "Phạm Thị Academic",
    roles: [UserRole.ACADEMIC_STAFF],
    department: "Academic Affairs",
    isActive: true,
    createdAt: "2023-06-15",
  },
];

// ==================== AUDIT LOGS ====================
export const mockAuditLogs = [
  {
    id: "log-001",
    action: "LOGIN",
    user: "student1@fpt.edu.vn",
    timestamp: "2024-10-09 08:30:15",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "log-002",
    action: "HANDBOOK_UPDATE",
    user: "academic@fpt.edu.vn",
    timestamp: "2024-10-09 09:15:23",
    ipAddress: "192.168.1.50",
    status: "success",
    details: "Updated section: Học phí và Học bổng",
  },
  {
    id: "log-003",
    action: "QUERY_SUBMIT",
    user: "student2@fpt.edu.vn",
    timestamp: "2024-10-09 10:20:45",
    ipAddress: "192.168.1.101",
    status: "success",
    details: "Question about dormitory",
  },
  {
    id: "log-004",
    action: "NOTIFICATION_SEND",
    user: "affairs@fpt.edu.vn",
    timestamp: "2024-10-09 11:00:00",
    ipAddress: "192.168.1.55",
    status: "success",
    details: "Sent notification to all students",
  },
];

// ==================== ANALYTICS DATA ====================
export const mockAnalyticsData = {
  popularTopics: [
    { topic: "Học phí", count: 1250, trend: "+12%" },
    { topic: "Ký túc xá", count: 980, trend: "+8%" },
    { topic: "Học bổng", count: 850, trend: "+15%" },
    { topic: "Đăng ký môn học", count: 720, trend: "+5%" },
    { topic: "Quy chế đào tạo", count: 650, trend: "-3%" },
  ],
  queryTrends: [
    { date: "2024-10-01", count: 450 },
    { date: "2024-10-02", count: 520 },
    { date: "2024-10-03", count: 480 },
    { date: "2024-10-04", count: 550 },
    { date: "2024-10-05", count: 610 },
    { date: "2024-10-06", count: 580 },
    { date: "2024-10-07", count: 620 },
  ],
  userSatisfaction: {
    positive: 3456,
    neutral: 890,
    negative: 234,
  },
};



