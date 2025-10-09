import React from "react";
import { Link } from "react-router-dom";
import { useGlareEffect } from "../../hooks/useGlareEffect";
import {
  CreditCard,
  Award,
  DollarSign,
  Calculator,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Info,
  TrendingUp,
  Shield
} from "lucide-react";

const Tuition: React.FC = () => {
  const heroGlare = useGlareEffect<HTMLDivElement>();

  const tuitionRates = [
    {
      program: "Công nghệ thông tin",
      rate: "28-32 triệu/kỳ",
      description: "Tùy theo chuyên ngành và năm học",
      color: "from-blue-500 to-blue-600"
    },
    {
      program: "Kinh tế số",
      rate: "25-30 triệu/kỳ",
      description: "Bao gồm các ngành quản trị, marketing",
      color: "from-green-500 to-green-600"
    },
    {
      program: "Ngoại ngữ",
      rate: "22-28 triệu/kỳ",
      description: "Chương trình đào tạo ngôn ngữ",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const scholarships = [
    {
      name: "Học bổng tài năng",
      amount: "50-100% học phí",
      requirements: [
        "GPA >= 3.5",
        "Điểm thi THPT >= 24",
        "Có thành tích nổi bật"
      ],
      color: "from-yellow-500 to-yellow-600",
      icon: Star
    },
    {
      name: "Học bổng khuyến khích",
      amount: "30-50% học phí",
      requirements: [
        "GPA >= 3.0",
        "Tham gia hoạt động tích cực",
        "Có hoàn cảnh khó khăn"
      ],
      color: "from-green-500 to-green-600",
      icon: Award
    },
    {
      name: "Học bổng ngoại ngữ",
      amount: "20-40% học phí",
      requirements: [
        "IELTS >= 6.5",
        "TOEFL >= 80",
        "Chứng chỉ quốc tế khác"
      ],
      color: "from-blue-500 to-blue-600",
      icon: Shield
    }
  ];

  const additionalFees = [
    { name: "Phí ký túc xá", amount: "2-4 triệu/kỳ", description: "Tùy loại phòng" },
    { name: "Phí thực tập", amount: "5-10 triệu", description: "Một lần trong quá trình học" },
    { name: "Phí tốt nghiệp", amount: "2 triệu", description: "Nộp khi làm luận văn" },
    { name: "Bảo hiểm y tế", amount: "500k/năm", description: "Bắt buộc cho tất cả SV" },
    { name: "Phí đồng phục", amount: "500k", description: "Mua một lần khi nhập học" },
    { name: "Phí thẻ sinh viên", amount: "100k", description: "Làm mới mỗi năm" }
  ];

  const paymentMethods = [
    {
      method: "Trả góp qua ngân hàng",
      description: "Hỗ trợ trả góp 0% lãi suất",
      banks: ["Vietcombank", "BIDV", "Agribank", "Techcombank"],
      color: "from-green-500 to-green-600"
    },
    {
      method: "Thanh toán online",
      description: "Qua cổng thanh toán điện tử",
      banks: ["VNPay", "Momo", "ZaloPay", "Banking"],
      color: "from-blue-500 to-blue-600"
    },
    {
      method: "Chuyển khoản trực tiếp",
      description: "Chuyển khoản đến tài khoản trường",
      banks: ["Tất cả ngân hàng", "ATM", "Internet Banking"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-yellow-25 to-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-yellow-200/40 via-yellow-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-yellow-200/40 via-yellow-100/30 to-transparent rounded-full -ml-40 -mb-40 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div
              ref={heroGlare}
              className="glare-effect-orange inline-block p-2 bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-lg mb-6"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-xl">
                <CreditCard className="w-12 h-12 text-white mx-auto" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Học phí & Học bổng
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Thông tin chi tiết về mức học phí và các chương trình học bổng
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/handbook/admission"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Trước: Quy chế tuyển sinh</span>
            </Link>
            <Link
              to="/handbook/curriculum"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>Tiếp theo: Chương trình đào tạo</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tuition Rates */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mức học phí theo chương trình
            </h2>
            <p className="text-lg text-gray-600">
              Học phí được tính theo kỳ học, có thể thay đổi theo từng năm
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tuitionRates.map((program, index) => {
              const programGlare = useGlareEffect<HTMLDivElement>();

              return (
                <div
                  key={index}
                  ref={programGlare}
                  className="glare-effect bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className={`bg-gradient-to-br ${program.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {program.program}
                  </h3>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-orange-600">
                      {program.rate}
                    </span>
                  </div>
                  <p className="text-gray-600 text-center text-sm">
                    {program.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chương trình học bổng
            </h2>
            <p className="text-lg text-gray-600">
              Nhiều loại học bổng hấp dẫn dành cho sinh viên xuất sắc
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {scholarships.map((scholarship, index) => {
              const ScholarshipIcon = scholarship.icon;
              const scholarshipGlare = useGlareEffect<HTMLDivElement>();

              return (
                <div
                  key={index}
                  ref={scholarshipGlare}
                  className="glare-effect bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className={`bg-gradient-to-br ${scholarship.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <ScholarshipIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {scholarship.name}
                  </h3>
                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold text-orange-600">
                      {scholarship.amount}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Điều kiện:</h4>
                    {scholarship.requirements.map((req, reqIndex) => (
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

      {/* Additional Fees */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Các khoản phí khác
            </h2>
            <p className="text-lg text-gray-600">
              Các khoản phí bổ sung trong quá trình học tập
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="space-y-6">
              {additionalFees.map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-lg">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{fee.name}</h3>
                      <p className="text-gray-600 text-sm">{fee.description}</p>
                    </div>
                  </div>
                  <span className="font-bold text-orange-600">{fee.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Phương thức thanh toán
            </h2>
            <p className="text-lg text-gray-600">
              Nhiều cách thức thanh toán linh hoạt và tiện lợi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {paymentMethods.map((method, index) => {
              const methodGlare = useGlareEffect<HTMLDivElement>();

              return (
                <div
                  key={index}
                  ref={methodGlare}
                  className="glare-effect bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className={`bg-gradient-to-br ${method.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {method.method}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    {method.description}
                  </p>
                  <div className="space-y-2">
                    {method.banks.map((bank, bankIndex) => (
                      <div key={bankIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700 text-sm">{bank}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Aid Info */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hỗ trợ tài chính
            </h2>
            <p className="text-lg text-gray-600">
              Các chương trình hỗ trợ tài chính cho sinh viên
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Vay học phí 0% lãi suất
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Hỗ trợ vay tối đa 100% học phí</li>
                    <li>• Lãi suất 0% trong suốt quá trình học</li>
                    <li>• Trả góp sau khi tốt nghiệp</li>
                    <li>• Thủ tục đơn giản, nhanh chóng</li>
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
                    Hỗ trợ sinh viên khó khăn
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Miễn giảm phí ký túc xá</li>
                    <li>• Hỗ trợ việc làm part-time</li>
                    <li>• Chương trình "Bữa cơm sinh viên"</li>
                    <li>• Hỗ trợ tâm lý và học tập</li>
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
              to="/handbook/admission"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Trước: Quy chế tuyển sinh</span>
            </Link>
            <Link
              to="/handbook/curriculum"
              className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              <span>Tiếp theo: Chương trình đào tạo</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tuition;
