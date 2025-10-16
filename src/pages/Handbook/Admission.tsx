import React from "react";
import { Link } from "react-router-dom";
import { useGlareEffect } from "../../hooks/useGlareEffect";
import {
  GraduationCap,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Info,
} from "lucide-react";

const Admission: React.FC = () => {
  const heroGlare = useGlareEffect<HTMLDivElement>();

  const admissionMethods = [
    {
      title: "Xét tuyển học bạ",
      description: "Xét tuyển dựa trên kết quả học tập THPT",
      requirements: [
        "Tốt nghiệp THPT",
        "Điểm TB lớp 12 ≥ 6.5",
        "Hạnh kiểm Khá trở lên",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Xét tuyển điểm thi THPT",
      description: "Xét tuyển dựa trên kết quả kỳ thi THPT Quốc gia",
      requirements: [
        "Tốt nghiệp THPT",
        "Điểm thi THPT ≥ 15 điểm",
        "Không có môn nào dưới 3 điểm",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Xét tuyển thẳng",
      description: "Dành cho học sinh giỏi và có thành tích đặc biệt",
      requirements: [
        "Học sinh giỏi cấp tỉnh/thành phố",
        "Đạt giải trong các kỳ thi quốc tế",
        "Có chứng chỉ ngoại ngữ quốc tế",
      ],
      color: "from-purple-500 to-purple-600",
    },
  ];

  const timeline = [
    {
      month: "Tháng 3-4",
      title: "Bắt đầu nhận hồ sơ",
      description: "Mở cổng đăng ký xét tuyển online",
    },
    {
      month: "Tháng 5-6",
      title: "Hạn nộp hồ sơ",
      description: "Kết thúc nhận hồ sơ xét tuyển học bạ",
    },
    {
      month: "Tháng 7",
      title: "Công bố kết quả",
      description: "Thông báo kết quả xét tuyển học bạ",
    },
    {
      month: "Tháng 8",
      title: "Xét tuyển THPT",
      description: "Xét tuyển dựa trên điểm thi THPT",
    },
    {
      month: "Tháng 9",
      title: "Nhập học",
      description: "Làm thủ tục nhập học cho tân sinh viên",
    },
  ];

  const documents = [
    "Phiếu đăng ký xét tuyển (điền online)",
    "Bản sao học bạ THPT (có công chứng)",
    "Bản sao bằng tốt nghiệp THPT (có công chứng)",
    "Bản sao CMND/CCCD",
    "Ảnh 3x4 (4 ảnh)",
    "Giấy chứng nhận ưu tiên (nếu có)",
    "Chứng chỉ ngoại ngữ (nếu có)",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-100/50 via-orange-50/30 to-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div
              ref={heroGlare}
              className="glare-effect-orange inline-block p-2 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg mb-6"
            >
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-xl">
                <GraduationCap className="w-12 h-12 text-white mx-auto" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Quy chế tuyển sinh
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Thông tin chi tiết về các phương thức xét tuyển và quy trình đăng
              ký
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/handbook/introduction"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Trước: Giới thiệu chung</span>
            </Link>
            <Link
              to="/handbook/tuition"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>Tiếp theo: Học phí & Học bổng</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Admission Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Phương thức xét tuyển
            </h2>
            <p className="text-lg text-gray-600">
              FPT University áp dụng nhiều phương thức xét tuyển linh hoạt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {admissionMethods.map((method, index) => {
              const methodGlare = useGlareEffect<HTMLDivElement>();

              return (
                <div
                  key={index}
                  ref={methodGlare}
                  className="glare-effect bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div
                    className={`bg-gradient-to-br ${method.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                  >
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    {method.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Điều kiện:
                    </h4>
                    {method.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lịch trình tuyển sinh 2025
            </h2>
            <p className="text-lg text-gray-600">
              Các mốc thời gian quan trọng trong quá trình tuyển sinh
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-orange-600">
                          {item.month}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center relative z-10">
                    <Clock className="w-4 h-4 text-white" />
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hồ sơ đăng ký xét tuyển
            </h2>
            <p className="text-lg text-gray-600">
              Danh sách các giấy tờ cần thiết khi đăng ký xét tuyển
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lưu ý quan trọng
            </h2>
            <p className="text-lg text-gray-600">
              Những điều cần biết khi đăng ký xét tuyển
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Thời gian nộp hồ sơ
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Xét tuyển học bạ: Tháng 3 - Tháng 6</li>
                    <li>• Xét tuyển THPT: Tháng 7 - Tháng 8</li>
                    <li>• Xét tuyển bổ sung: Tháng 9</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Hỗ trợ tuyển sinh
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Hotline: (028) 7300 5588</li>
                    <li>• Email: tuyensinh@fpt.edu.vn</li>
                    <li>• Fanpage: FPT University</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/handbook/introduction"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Trước: Giới thiệu chung</span>
            </Link>
            <Link
              to="/handbook/tuition"
              className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              <span>Tiếp theo: Học phí & Học bổng</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admission;
