import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  Eye,
  User,
  BookOpen,
  Calendar,
  Plus,
} from "lucide-react";

// Mock data for demonstration
const mockUnresolvedQuestions = [
  {
    id: 1,
    question: "Làm thế nào để đăng ký học bổng khuyến khích học tập?",
    studentName: "Nguyễn Văn A",
    studentId: "SE123456",
    timestamp: "2024-01-15 14:30",
    category: "Học bổng",
    priority: "high",
    status: "unresolved",
    systemResponse:
      "Xin lỗi, tôi không có thông tin chi tiết về quy trình đăng ký học bổng khuyến khích học tập. Bạn có thể liên hệ trực tiếp với Phòng Đào tạo để được hỗ trợ.",
    confidence: 0.3,
    suggestedTags: ["học bổng", "đăng ký", "khuyến khích học tập"],
    relatedSections: ["Admission", "Student Services"],
  },
  {
    id: 2,
    question: "Thời gian nộp hồ sơ xin học bổng có thay đổi không?",
    studentName: "Trần Thị B",
    studentId: "IT789012",
    timestamp: "2024-01-15 13:45",
    category: "Học bổng",
    priority: "medium",
    status: "pending_review",
    systemResponse:
      "Thông tin về thời gian nộp hồ sơ học bổng có thể đã được cập nhật. Tôi khuyên bạn nên kiểm tra thông báo mới nhất từ trường.",
    confidence: 0.4,
    suggestedTags: ["học bổng", "thời gian nộp hồ sơ", "thông báo"],
    relatedSections: ["Admission"],
  },
  {
    id: 3,
    question: "Có thể đăng ký môn học qua điện thoại không?",
    studentName: "Lê Văn C",
    studentId: "AI345678",
    timestamp: "2024-01-15 12:20",
    category: "Đăng ký môn học",
    priority: "low",
    status: "unresolved",
    systemResponse:
      "Tôi không chắc chắn về việc đăng ký môn học qua điện thoại. Bạn có thể thử truy cập hệ thống online hoặc liên hệ IT Support.",
    confidence: 0.2,
    suggestedTags: ["đăng ký môn học", "điện thoại", "hệ thống online"],
    relatedSections: ["Academic Rules"],
  },
  {
    id: 4,
    question: "Lịch thi cuối kỳ có thay đổi không?",
    studentName: "Phạm Thị D",
    studentId: "CS901234",
    timestamp: "2024-01-15 11:15",
    category: "Lịch thi",
    priority: "high",
    status: "resolved",
    systemResponse:
      "Lịch thi cuối kỳ đã được cập nhật. Bạn có thể xem lịch thi mới nhất tại trang web của trường.",
    confidence: 0.8,
    suggestedTags: ["lịch thi", "cuối kỳ", "cập nhật"],
    relatedSections: ["Academic Calendar"],
  },
];

type PriorityType = "high" | "medium" | "low";
type StatusType = "unresolved" | "pending_review" | "resolved";

const priorityConfig: Record<
  PriorityType,
  { label: string; color: string; bg: string }
> = {
  high: { label: "Cao", color: "text-destructive", bg: "bg-destructive/10" },
  medium: { label: "Trung bình", color: "text-warning", bg: "bg-warning/10" },
  low: { label: "Thấp", color: "text-muted-foreground", bg: "bg-muted/10" },
};

const statusConfig: Record<
  StatusType,
  { label: string; color: string; bg: string }
> = {
  unresolved: {
    label: "Chưa giải quyết",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  pending_review: {
    label: "Chờ xem xét",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  resolved: {
    label: "Đã giải quyết",
    color: "text-success",
    bg: "bg-success/10",
  },
};

const UnresolvedQueue = () => {
  const [questions, setQuestions] = useState(mockUnresolvedQuestions);
  const [filterStatus, setFilterStatus] = useState("unresolved");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [mentorNotes, setMentorNotes] = useState<{ [key: number]: string }>({});
  const [mentorTags, setMentorTags] = useState<{ [key: number]: string[] }>({});

  const handleStatusChange = (id: number, newStatus: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, status: newStatus as any } : q
      )
    );
  };

  const handleAddTag = (id: number, tag: string) => {
    if (!mentorTags[id]) {
      setMentorTags({ ...mentorTags, [id]: [] });
    }
    if (!mentorTags[id].includes(tag)) {
      setMentorTags({
        ...mentorTags,
        [id]: [...(mentorTags[id] || []), tag],
      });
    }
  };

  const handleRemoveTag = (id: number, tag: string) => {
    setMentorTags({
      ...mentorTags,
      [id]: (mentorTags[id] || []).filter((t) => t !== tag),
    });
  };

  const handleCreateRecommendation = (question: any) => {
    // This would typically open the Resource Recommendation form
    console.log("Creating recommendation for question:", question.id);
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesStatus =
      filterStatus === "all" || question.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || question.priority === filterPriority;
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return "text-success";
    if (confidence >= 0.4) return "text-warning";
    return "text-destructive";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.7) return "Cao";
    if (confidence >= 0.4) return "Trung bình";
    return "Thấp";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Unresolved Queue
            </h1>
            <p className="text-muted-foreground mt-2">
              Xem và xử lý các câu hỏi sinh viên mà hệ thống chưa trả lời đúng
              hoặc chưa được xác nhận
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {questions.filter((q) => q.status === "unresolved").length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chưa giải quyết
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      questions.filter((q) => q.status === "pending_review")
                        .length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Chờ xem xét</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {questions.filter((q) => q.status === "resolved").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Đã giải quyết</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{questions.length}</p>
                  <p className="text-sm text-muted-foreground">Tổng câu hỏi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm câu hỏi hoặc sinh viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="unresolved">Chưa giải quyết</option>
                  <option value="pending_review">Chờ xem xét</option>
                  <option value="resolved">Đã giải quyết</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Tất cả mức độ</option>
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Questions List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Danh sách câu hỏi</h2>
            {filteredQuestions.map((question) => (
              <Card
                key={question.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedQuestion === question.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() =>
                  setSelectedQuestion(
                    selectedQuestion === question.id ? null : question.id
                  )
                }
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">
                        {question.question}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <User className="w-3 h-3" />
                        {question.studentName} ({question.studentId})
                        <Calendar className="w-3 h-3 ml-2" />
                        {question.timestamp}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusConfig[question.status as StatusType].bg
                        } ${statusConfig[question.status as StatusType].color}`}
                      >
                        {statusConfig[question.status as StatusType].label}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          priorityConfig[question.priority as PriorityType].bg
                        } ${
                          priorityConfig[question.priority as PriorityType]
                            .color
                        }`}
                      >
                        {
                          priorityConfig[question.priority as PriorityType]
                            .label
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Độ tin cậy:
                      </span>
                      <span
                        className={`text-xs font-medium ${getConfidenceColor(
                          question.confidence
                        )}`}
                      >
                        {getConfidenceLabel(question.confidence)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        {question.category}
                      </span>
                      <Eye className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Question Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Chi tiết câu hỏi</h2>
            {selectedQuestion ? (
              (() => {
                const question = questions.find(
                  (q) => q.id === selectedQuestion
                );
                if (!question) return null;

                return (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {question.question}
                          </CardTitle>
                          <CardDescription>
                            {question.studentName} ({question.studentId}) •{" "}
                            {question.timestamp}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              statusConfig[question.status as StatusType].bg
                            } ${
                              statusConfig[question.status as StatusType].color
                            }`}
                          >
                            {statusConfig[question.status as StatusType].label}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              priorityConfig[question.priority as PriorityType]
                                .bg
                            } ${
                              priorityConfig[question.priority as PriorityType]
                                .color
                            }`}
                          >
                            {
                              priorityConfig[question.priority as PriorityType]
                                .label
                            }
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* System Response */}
                      <div>
                        <h4 className="font-medium mb-2">
                          Phản hồi của hệ thống:
                        </h4>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm">{question.systemResponse}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              Độ tin cậy:
                            </span>
                            <span
                              className={`text-xs font-medium ${getConfidenceColor(
                                question.confidence
                              )}`}
                            >
                              {getConfidenceLabel(question.confidence)} (
                              {Math.round(question.confidence * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Suggested Tags */}
                      <div>
                        <h4 className="font-medium mb-2">Tags gợi ý:</h4>
                        <div className="flex flex-wrap gap-2">
                          {question.suggestedTags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full cursor-pointer hover:bg-primary/20"
                              onClick={() => handleAddTag(question.id, tag)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mentor Tags */}
                      <div>
                        <h4 className="font-medium mb-2">Tags của mentor:</h4>
                        <div className="flex flex-wrap gap-2">
                          {(mentorTags[question.id] || []).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center gap-1"
                            >
                              {tag}
                              <button
                                onClick={() =>
                                  handleRemoveTag(question.id, tag)
                                }
                                className="hover:text-destructive"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Related Sections */}
                      <div>
                        <h4 className="font-medium mb-2">Phần liên quan:</h4>
                        <div className="flex flex-wrap gap-2">
                          {question.relatedSections.map((section, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-info/10 text-info text-xs rounded-full flex items-center gap-1"
                            >
                              <BookOpen className="w-3 h-3" />
                              {section}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mentor Notes */}
                      <div>
                        <h4 className="font-medium mb-2">
                          Ghi chú của mentor:
                        </h4>
                        <textarea
                          value={mentorNotes[question.id] || ""}
                          onChange={(e) =>
                            setMentorNotes({
                              ...mentorNotes,
                              [question.id]: e.target.value,
                            })
                          }
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={3}
                          placeholder="Thêm ghi chú hoặc hướng dẫn xử lý..."
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(question.id, "resolved")
                          }
                          disabled={question.status === "resolved"}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Đánh dấu đã giải quyết
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCreateRecommendation(question)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Tạo đề xuất
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(question.id, "pending_review")
                          }
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Chờ xem xét
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Chọn một câu hỏi để xem chi tiết
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnresolvedQueue;
