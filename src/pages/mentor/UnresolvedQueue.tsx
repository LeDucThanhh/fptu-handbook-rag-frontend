import { useState } from "react";
import { Card, Button, Input, Modal, Select, notification } from "antd";
import {
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  User,
  BookOpen,
  Plus,
} from "lucide-react";

const { TextArea } = Input;

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
  high: { label: "Cao", color: "text-red-600", bg: "bg-red-50" },
  medium: { label: "Trung bình", color: "text-orange-600", bg: "bg-orange-50" },
  low: { label: "Thấp", color: "text-gray-600", bg: "bg-gray-50" },
};

const statusConfig: Record<
  StatusType,
  { label: string; color: string; bg: string }
> = {
  unresolved: {
    label: "Chưa giải quyết",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  pending_review: {
    label: "Chờ xem xét",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  resolved: {
    label: "Đã giải quyết",
    color: "text-green-600",
    bg: "bg-green-50",
  },
};

const UnresolvedQueue = () => {
  const [questions, setQuestions] = useState(mockUnresolvedQuestions);
  const [filterStatus, setFilterStatus] = useState("unresolved");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(
    null
  );
  const [resolveFormData, setResolveFormData] = useState({
    answer: "",
    tags: [] as string[],
    createRecommendation: false,
  });
  const [recommendFormData, setRecommendFormData] = useState({
    title: "",
    description: "",
    resourceUrl: "",
    tags: [] as string[],
  });

  const availableTags = [
    "Học bổng",
    "Đăng ký môn",
    "Lịch thi",
    "Học phí",
    "Câu lạc bộ",
    "Sự kiện",
    "Thực tập",
    "Tốt nghiệp",
  ];
  const [mentorNotes, setMentorNotes] = useState<{ [key: number]: string }>({});
  const [mentorTags, setMentorTags] = useState<{ [key: number]: string[] }>({});

  const handleStatusChange = (id: number, newStatus: string) => {
    if (newStatus === "resolved") {
      // Open resolve modal instead of directly changing status
      setCurrentQuestionId(id);
      setShowResolveModal(true);
      return;
    }

    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, status: newStatus as any } : q
      )
    );

    notification.success({
      message: "Thành công",
      description: "Đã cập nhật trạng thái câu hỏi!",
      placement: "topRight",
      duration: 3,
    });
  };

  const handleResolveQuestion = () => {
    if (!resolveFormData.answer) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập câu trả lời!",
        placement: "topRight",
      });
      return;
    }

    // TODO: Call API to resolve question
    setQuestions(
      questions.map((q) =>
        q.id === currentQuestionId ? { ...q, status: "resolved" as any } : q
      )
    );

    notification.success({
      message: "Thành công",
      description: "Đã giải quyết câu hỏi thành công!",
      placement: "topRight",
      duration: 3,
    });

    setShowResolveModal(false);
    setResolveFormData({ answer: "", tags: [], createRecommendation: false });
    setCurrentQuestionId(null);
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
    setCurrentQuestionId(question.id);
    setRecommendFormData({
      title: `Hướng dẫn: ${question.question}`,
      description: "",
      resourceUrl: "",
      tags: question.suggestedTags || [],
    });
    setShowRecommendModal(true);
  };

  const handleSubmitRecommendation = () => {
    if (!recommendFormData.title || !recommendFormData.description) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng điền đầy đủ tiêu đề và mô tả!",
        placement: "topRight",
      });
      return;
    }

    // TODO: Call API to create recommendation
    notification.success({
      message: "Thành công",
      description: "Đã tạo đề xuất tài liệu thành công!",
      placement: "topRight",
      duration: 3,
    });

    setShowRecommendModal(false);
    setRecommendFormData({
      title: "",
      description: "",
      resourceUrl: "",
      tags: [],
    });
    setCurrentQuestionId(null);
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

        {/* Compact Stats & Filters */}
        <Card className="shadow-md">
          <div className="p-4">
            {/* Stats Row */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-lg font-bold">
                    {questions.filter((q) => q.status === "unresolved").length}
                  </p>
                  <p className="text-xs text-gray-500">Chưa giải quyết</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-lg font-bold">
                    {
                      questions.filter((q) => q.status === "pending_review")
                        .length
                    }
                  </p>
                  <p className="text-xs text-gray-500">Chờ xem xét</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold">
                    {questions.filter((q) => q.status === "resolved").length}
                  </p>
                  <p className="text-xs text-gray-500">Đã giải quyết</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-lg font-bold">{questions.length}</p>
                  <p className="text-xs text-gray-500">Tổng câu hỏi</p>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Tìm kiếm câu hỏi hoặc sinh viên..."
                  prefix={<Search className="w-4 h-4 text-gray-400" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="unresolved">Chưa giải quyết</option>
                  <option value="pending_review">Chờ xem xét</option>
                  <option value="resolved">Đã giải quyết</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">Tất cả mức độ</option>
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Questions List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions List - 1/3 width */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Danh sách câu hỏi</h2>
            <div
              className="space-y-3 overflow-y-auto pr-3 border border-gray-200 rounded-lg p-4 bg-gray-50/50"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db #f3f4f6",
                height: "calc(100vh - 200px)",
              }}
            >
              {filteredQuestions.map((question) => (
                <Card
                  key={question.id}
                  className={`cursor-pointer transition-all hover:shadow-md shadow-sm ${
                    selectedQuestion === question.id
                      ? "ring-2 ring-orange-500"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedQuestion(
                      selectedQuestion === question.id ? null : question.id
                    )
                  }
                  styles={{ body: { padding: "12px" } }}
                >
                  <div className="space-y-2">
                    {/* Title and Badges */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-medium text-sm line-clamp-2 flex-1">
                        {question.question}
                      </h3>
                      <div className="flex gap-1 flex-shrink-0">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap ${
                            statusConfig[question.status as StatusType].bg
                          } ${
                            statusConfig[question.status as StatusType].color
                          }`}
                        >
                          {statusConfig[question.status as StatusType].label}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap ${
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

                    {/* Student Info */}
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <User className="w-3 h-3" />
                      <span className="truncate">{question.studentName}</span>
                      <span className="text-gray-400">•</span>
                      <span>{question.timestamp.split(" ")[0]}</span>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Tin cậy:</span>
                        <span
                          className={`font-medium ${getConfidenceColor(
                            question.confidence
                          )}`}
                        >
                          {getConfidenceLabel(question.confidence)}
                        </span>
                      </div>
                      <span className="text-gray-500">{question.category}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Question Details - 2/3 width */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-semibold">Chi tiết câu hỏi</h2>
            {selectedQuestion ? (
              (() => {
                const question = questions.find(
                  (q) => q.id === selectedQuestion
                );
                if (!question) return null;

                return (
                  <Card
                    className="shadow-md"
                    title={
                      <div className="flex justify-between items-start gap-4 py-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-lg font-semibold line-clamp-2 leading-relaxed mb-2">
                            {question.question}
                          </div>
                          <div className="text-sm text-gray-500 mt-2">
                            {question.studentName} ({question.studentId}) •{" "}
                            {question.timestamp}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2.5 flex-shrink-0 pt-1">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                              statusConfig[question.status as StatusType].bg
                            } ${
                              statusConfig[question.status as StatusType].color
                            }`}
                          >
                            {statusConfig[question.status as StatusType].label}
                          </span>
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
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
                    }
                  >
                    <div className="space-y-4">
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
                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        <Button
                          onClick={() =>
                            handleStatusChange(question.id, "resolved")
                          }
                          disabled={question.status === "resolved"}
                          className="bg-green-600 hover:bg-green-700 text-white flex-shrink-0"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Đánh dấu đã giải quyết
                        </Button>
                        <Button
                          type="default"
                          onClick={() => handleCreateRecommendation(question)}
                          className="flex-shrink-0"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Tạo đề xuất
                        </Button>
                        <Button
                          type="default"
                          onClick={() =>
                            handleStatusChange(question.id, "pending_review")
                          }
                          className="flex-shrink-0"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Chờ xem xét
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })()
            ) : (
              <Card className="shadow-md">
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Chọn một câu hỏi để xem chi tiết
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Resolve Question Modal */}
      <Modal
        title={
          <span className="text-xl font-semibold">Giải quyết câu hỏi</span>
        }
        open={showResolveModal}
        onCancel={() => {
          setShowResolveModal(false);
          setResolveFormData({
            answer: "",
            tags: [],
            createRecommendation: false,
          });
        }}
        onOk={handleResolveQuestion}
        okText="Đánh dấu đã giải quyết"
        cancelText="Hủy"
        width={700}
        okButtonProps={{ className: "bg-orange-500 hover:bg-orange-600" }}
      >
        <div className="space-y-4 py-4">
          {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Câu trả lời <span className="text-red-500">*</span>
            </label>
            <TextArea
              placeholder="Nhập câu trả lời chi tiết cho câu hỏi..."
              value={resolveFormData.answer}
              onChange={(e) =>
                setResolveFormData({
                  ...resolveFormData,
                  answer: e.target.value,
                })
              }
              rows={6}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <Select
              mode="multiple"
              placeholder="Chọn tags"
              value={resolveFormData.tags}
              onChange={(value) =>
                setResolveFormData({ ...resolveFormData, tags: value })
              }
              size="large"
              className="w-full"
              options={availableTags.map((tag) => ({ label: tag, value: tag }))}
            />
          </div>
        </div>
      </Modal>

      {/* Create Recommendation Modal */}
      <Modal
        title={
          <span className="text-xl font-semibold">Tạo đề xuất tài liệu</span>
        }
        open={showRecommendModal}
        onCancel={() => {
          setShowRecommendModal(false);
          setRecommendFormData({
            title: "",
            description: "",
            resourceUrl: "",
            tags: [],
          });
        }}
        onOk={handleSubmitRecommendation}
        okText="Tạo đề xuất"
        cancelText="Hủy"
        width={700}
        okButtonProps={{ className: "bg-orange-500 hover:bg-orange-600" }}
      >
        <div className="space-y-4 py-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Nhập tiêu đề đề xuất"
              value={recommendFormData.title}
              onChange={(e) =>
                setRecommendFormData({
                  ...recommendFormData,
                  title: e.target.value,
                })
              }
              size="large"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <TextArea
              placeholder="Nhập mô tả chi tiết về tài liệu..."
              value={recommendFormData.description}
              onChange={(e) =>
                setRecommendFormData({
                  ...recommendFormData,
                  description: e.target.value,
                })
              }
              rows={5}
            />
          </div>

          {/* Resource URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link tài liệu
            </label>
            <Input
              placeholder="https://..."
              value={recommendFormData.resourceUrl}
              onChange={(e) =>
                setRecommendFormData({
                  ...recommendFormData,
                  resourceUrl: e.target.value,
                })
              }
              size="large"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <Select
              mode="multiple"
              placeholder="Chọn tags"
              value={recommendFormData.tags}
              onChange={(value) =>
                setRecommendFormData({ ...recommendFormData, tags: value })
              }
              size="large"
              className="w-full"
              options={availableTags.map((tag) => ({ label: tag, value: tag }))}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UnresolvedQueue;
