import React, { useState } from "react";
import { useGlareEffect } from "../hooks/useGlareEffect";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  X
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Làm thế nào để đăng ký môn học?",
      answer: "Bạn có thể đăng ký môn học thông qua hệ thống FAP (FPT Academic Portal). Truy cập vào fap.fpt.edu.vn, đăng nhập bằng tài khoản sinh viên, chọn mục 'Đăng ký môn học' và làm theo hướng dẫn. Thời gian đăng ký thường bắt đầu từ tuần thứ 2 của kỳ học.",
      category: "Học vụ",
      tags: ["đăng ký", "môn học", "FAP", "học vụ"]
    },
    {
      id: 2,
      question: "Điều kiện xét học bổng là gì?",
      answer: "FPTU có nhiều loại học bổng: Học bổng tài năng (GPA >= 3.5), Học bổng khuyến khích học tập (GPA >= 3.0), Học bổng hoạt động ngoại khóa (tham gia tích cực CLB, hoạt động tình nguyện). Hồ sơ bao gồm: bảng điểm, giấy chứng nhận hoạt động, thư giới thiệu.",
      category: "Học bổng",
      tags: ["học bổng", "GPA", "tài năng", "khuyến khích"]
    },
    {
      id: 3,
      question: "Làm sao để tham gia câu lạc bộ?",
      answer: "FPTU có hơn 50 câu lạc bộ đa dạng từ thể thao, công nghệ, nghệ thuật đến tình nguyện. Bạn có thể tìm hiểu thông tin các CLB tại sự kiện 'Ngày hội CLB' đầu năm học hoặc truy cập trang web sinh viên. Liên hệ trực tiếp với ban chủ nhiệm CLB để đăng ký tham gia.",
      category: "Hoạt động",
      tags: ["câu lạc bộ", "CLB", "hoạt động", "sinh viên"]
    },
    {
      id: 4,
      question: "Thời gian học và lịch thi như thế nào?",
      answer: "Một năm học có 3 kỳ: Fall (9-12), Spring (1-4), Summer (5-8). Mỗi kỳ có 15 tuần học + 2 tuần thi. Lịch học từ thứ 2 đến thứ 6, ca sáng (7:30-11:30) và ca chiều (13:30-17:30). Lịch thi được thông báo trước 2 tuần, thường kéo dài 2 tuần cuối kỳ.",
      category: "Học vụ",
      tags: ["lịch học", "lịch thi", "kỳ học", "thời gian"]
    },
    {
      id: 5,
      question: "Chi phí học phí và các khoản phí khác?",
      answer: "Học phí dao động từ 25-35 triệu/kỳ tùy ngành học. Các khoản phí khác: phí ký túc xá (2-4 triệu/kỳ), phí thực tập (5-10 triệu), phí tốt nghiệp (2 triệu), bảo hiểm y tế (500k/năm). Có chính sách trả góp học phí qua ngân hàng đối tác.",
      category: "Tài chính",
      tags: ["học phí", "chi phí", "ký túc xá", "tài chính"]
    },
    {
      id: 6,
      question: "Cơ sở vật chất và ký túc xá ra sao?",
      answer: "Campus FPTU có cơ sở vật chất hiện đại: phòng lab máy tính, thư viện 24/7, phòng gym, sân bóng đá, căng tin. Ký túc xá có phòng đôi và phòng đơn, đầy đủ tiện ích: wifi, điều hòa, tủ lạnh, máy giặt. An ninh 24/7, có bảo vệ và camera giám sát.",
      category: "Cơ sở vật chất",
      tags: ["ký túc xá", "campus", "cơ sở vật chất", "tiện ích"]
    },
    {
      id: 7,
      question: "Làm thế nào để xin nghỉ học tạm thời?",
      answer: "Sinh viên có thể xin nghỉ học tạm thời (tối đa 2 kỳ liên tiếp) khi có lý do chính đáng: sức khỏe, gia đình, công việc. Nộp đơn xin nghỉ học tại phòng Đào tạo kèm giấy tờ chứng minh. Thời hạn nộp đơn: trước khi kỳ học bắt đầu ít nhất 1 tuần.",
      category: "Học vụ",
      tags: ["nghỉ học", "tạm thời", "đào tạo", "thủ tục"]
    },
    {
      id: 8,
      question: "Cơ hội thực tập và việc làm sau tốt nghiệp?",
      answer: "FPTU có mạng lưới đối tác rộng lớn: Google, Microsoft, FPT Software, Viettel, VNPT... Sinh viên năm 3-4 được thực tập tại các công ty này. Tỷ lệ có việc làm sau tốt nghiệp >95%, mức lương khởi điểm 8-15 triệu. Có chương trình hỗ trợ tìm việc và kết nối với cựu sinh viên.",
      category: "Nghề nghiệp",
      tags: ["thực tập", "việc làm", "tốt nghiệp", "nghề nghiệp"]
    },
    {
      id: 9,
      question: "Làm sao để đổi ngành học?",
      answer: "Sinh viên có thể đổi ngành học sau kỳ 1 nếu đạt GPA >= 3.0 và có lý do chính đáng. Nộp đơn xin đổi ngành tại phòng Đào tạo, kèm bảng điểm và thư giải thích lý do. Cần đóng phí đổi ngành 2 triệu và học lại các môn chuyên ngành mới.",
      category: "Học vụ",
      tags: ["đổi ngành", "chuyển ngành", "GPA", "thủ tục"]
    },
    {
      id: 10,
      question: "Hệ thống thư viện và tài liệu học tập?",
      answer: "Thư viện FPTU mở cửa 24/7, có hơn 50,000 đầu sách và hàng nghìn tài liệu điện tử. Sinh viên có thể mượn sách online, truy cập cơ sở dữ liệu học thuật quốc tế. Có phòng học nhóm, phòng máy tính, không gian yên tĩnh để học tập. Thẻ thư viện được cấp miễn phí cho tất cả sinh viên.",
      category: "Cơ sở vật chất",
      tags: ["thư viện", "sách", "tài liệu", "học tập"]
    },
    {
      id: 11,
      question: "Chính sách hỗ trợ sinh viên khó khăn?",
      answer: "FPTU có nhiều chương trình hỗ trợ: học bổng khó khăn (50-100% học phí), vay học phí lãi suất 0%, hỗ trợ việc làm part-time, miễn giảm phí ký túc xá. Sinh viên cần nộp hồ sơ chứng minh hoàn cảnh khó khăn tại phòng Công tác sinh viên.",
      category: "Hỗ trợ",
      tags: ["hỗ trợ", "khó khăn", "học bổng", "vay học phí"]
    },
    {
      id: 12,
      question: "Quy định về đồng phục và nội quy sinh viên?",
      answer: "Sinh viên FPTU mặc đồng phục áo thun trắng + quần jean/khaki khi đến trường. Nội quy: không hút thuốc, uống rượu bia trong campus; tôn trọng giảng viên và bạn bè; tham gia đầy đủ các hoạt động bắt buộc. Vi phạm nội quy có thể bị cảnh cáo, đình chỉ học tập.",
      category: "Quy định",
      tags: ["đồng phục", "nội quy", "quy định", "sinh viên"]
    }
  ];

  const categories = ["Tất cả", "Học vụ", "Học bổng", "Hoạt động", "Tài chính", "Cơ sở vật chất", "Nghề nghiệp", "Hỗ trợ", "Quy định"];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "Tất cả" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tất cả");
  };

  const heroGlare = useGlareEffect<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-orange-25 to-white py-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Câu hỏi thường gặp
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Tìm câu trả lời cho những thắc mắc phổ biến về FPT University
            </p>

            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-white border-2 border-gray-300 rounded-full px-6 py-4 focus-within:border-orange-500 transition-all shadow-lg">
                <Search className="w-6 h-6 text-gray-400 mr-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm câu hỏi..."
                  className="flex-1 outline-none text-gray-700 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600 mr-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:border-orange-500 transition-colors shadow-sm"
                >
                  <Filter className="w-5 h-5" />
                  <span>Bộ lọc</span>
                </button>

                {(searchQuery || selectedCategory !== "Tất cả") && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Xóa bộ lọc</span>
                  </button>
                )}
              </div>

              <div className="text-sm text-gray-600">
                Tìm thấy {filteredFAQs.length} câu hỏi
              </div>
            </div>

            {/* Category Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy câu hỏi phù hợp
                </h3>
                <p className="text-gray-600">
                  Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                </p>
              </div>
            ) : (
              filteredFAQs.map((faq) => {
                const isExpanded = expandedItems.has(faq.id);
                const faqGlare = useGlareEffect<HTMLDivElement>();

                return (
                  <div
                    key={faq.id}
                    ref={faqGlare}
                    className="glare-effect bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                              {faq.category}
                            </span>
                            <div className="flex gap-1">
                              {faq.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <div className="pt-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Không tìm thấy câu trả lời?
              </h3>
              <p className="text-gray-600 mb-6">
                Liên hệ với chúng tôi để được hỗ trợ trực tiếp
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                  Liên hệ hỗ trợ
                </button>
                <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                  Đặt câu hỏi mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
