# 📚 FPTU Handbook RAG - Frontend

Hệ thống hỏi đáp sổ tay học vụ và hoạt động cho tân sinh viên Đại học FPT sử dụng công nghệ RAG (Retrieval-Augmented Generation).

## 🚀 Tech Stack

- **Framework**: React 19.1.1 với TypeScript
- **Build Tool**: Vite 7.1.9
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Language**: TypeScript 5.9.3

## 📁 Cấu trúc Project

```
fptu-handbook-rag-frontend/
├── src/
│   ├── components/       # Các component tái sử dụng
│   │   └── Navbar.tsx
│   ├── pages/           # Các trang chính
│   │   ├── Home.tsx
│   │   ├── QA.tsx
│   │   └── Clubs.tsx
│   ├── services/        # API services
│   │   └── api.service.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── config/          # Configuration files
│   │   └── api.config.ts
│   ├── hooks/           # Custom React hooks
│   ├── contexts/        # React Context providers
│   ├── utils/           # Utility functions
│   ├── assets/          # Static assets (images, fonts)
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Public static files
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md

```

## 🛠️ Cài đặt và Chạy Project

### Prerequisites

- Node.js >= 18.x
- npm hoặc yarn

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd fptu-handbook-rag-frontend
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình environment variables

Tạo file `.env` từ `.env.example`:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

### Bước 4: Chạy development server

```bash
npm run dev
```

Mở trình duyệt và truy cập: `http://localhost:5173`

## 📜 Available Scripts

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview

# Chạy ESLint
npm run lint
```

## 🎨 Features

### Cho Sinh viên (Freshmen)

- ✅ Hỏi đáp qua AI với natural language processing
- ✅ Tìm kiếm thông tin câu lạc bộ
- ✅ Hỗ trợ đa ngôn ngữ (Tiếng Việt & English)
- ✅ Đánh giá chất lượng câu trả lời
- ✅ Nhận thông báo về lịch học và sự kiện CLB

### Cho Mentors/Academic Advisors

- 📊 Dashboard theo dõi câu hỏi của sinh viên
- 📈 Xem thống kê usage và popular queries
- 💬 Xem feedback từ sinh viên

### Cho University Staff

- 📤 Upload và index tài liệu handbook
- ✏️ Cập nhật thông tin câu lạc bộ
- 📊 Dashboard analytics
- 🔔 Quản lý thông báo

### Cho System Administrator

- 👥 Quản lý users và roles
- ⚙️ Cấu hình AI system và RAG
- 🔒 Quản lý bảo mật
- 📊 Monitor system performance

## 🎯 Main Pages

- **Home** (`/`) - Landing page với search box và quick links
- **Q&A** (`/qa`) - Chat interface với AI assistant
- **Clubs** (`/clubs`) - Danh sách và chi tiết các câu lạc bộ
- **Handbook** (`/handbook`) - Sổ tay sinh viên

## 🔧 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Manual Build

```bash
# Build project
npm run build

# Folder dist/ sẽ chứa static files để deploy
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Sử dụng TypeScript cho type safety
- Follow React best practices và hooks
- Component names sử dụng PascalCase
- File names sử dụng kebab-case hoặc PascalCase
- Sử dụng Tailwind CSS cho styling
- Write clean, readable code với comments khi cần

## 🐛 Known Issues

- [ ] Chưa integrate với backend API
- [ ] Chưa implement authentication
- [ ] Chưa có unit tests

## 📞 Contact

- **Project Lead**: [Your Name]
- **Email**: [your.email@fpt.edu.vn]
- **University**: FPT University

## 📄 License

This project is part of Capstone Project - FPT University
