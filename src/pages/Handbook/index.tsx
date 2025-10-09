import React from "react";
import { Link } from "react-router-dom";
import { useGlareEffect } from "../../hooks/useGlareEffect";
import {
  BookOpen,
  GraduationCap,
  CreditCard,
  Users,
  Phone,
  Award,
  Building,
  Heart,
  Shield,
  FileText,
  ChevronRight
} from "lucide-react";

const Handbook: React.FC = () => {
  const heroGlare = useGlareEffect<HTMLDivElement>();

  const handbookSections = {
    "Tuyển sinh & Đào tạo": [
      {
        id: "introduction",
        title: "Giới thiệu chung",
        description: "Tổng quan về FPT University, sứ mệnh, tầm nhìn và giá trị cốt lõi",
        icon: BookOpen,
        path: "/handbook/introduction",
        color: "from-blue-500 to-blue-600",
        bgColor: "from-blue-50 to-blue-100"
      },
      {
        id: "admission",
        title: "Quy chế tuyển sinh",
        description: "Thông tin về quy trình tuyển sinh, điều kiện xét tuyển và thời gian",
        icon: GraduationCap,
        path: "/handbook/admission",
        color: "from-green-500 to-green-600",
        bgColor: "from-green-50 to-green-100"
      },
      {
        id: "tuition",
        title: "Học phí & Học bổng",
        description: "Chi tiết về mức học phí, các loại học bổng và điều kiện nhận",
        icon: CreditCard,
        path: "/handbook/tuition",
        color: "from-yellow-500 to-yellow-600",
        bgColor: "from-yellow-50 to-yellow-100"
      },
      {
        id: "curriculum",
        title: "Chương trình đào tạo",
        description: "Mô tả các ngành học, chương trình đào tạo và lộ trình học tập",
        icon: FileText,
        path: "/handbook/curriculum",
        color: "from-purple-500 to-purple-600",
        bgColor: "from-purple-50 to-purple-100"
      }
    ],
    "Đời sống sinh viên": [
      {
        id: "student-life",
        title: "Hoạt động sinh viên",
        description: "Thông tin về câu lạc bộ, hoạt động ngoại khóa và sự kiện",
        icon: Users,
        path: "/handbook/student-life",
        color: "from-pink-500 to-pink-600",
        bgColor: "from-pink-50 to-pink-100"
      },
      {
        id: "facilities",
        title: "Cơ sở vật chất",
        description: "Giới thiệu ký túc xá, thư viện, phòng thí nghiệm và tiện ích",
        icon: Building,
        path: "/handbook/facilities",
        color: "from-indigo-500 to-indigo-600",
        bgColor: "from-indigo-50 to-indigo-100"
      },
      {
        id: "support-services",
        title: "Dịch vụ hỗ trợ",
        description: "Tư vấn học tập, hỗ trợ tâm lý, hướng nghiệp và các dịch vụ khác",
        icon: Heart,
        path: "/handbook/support-services",
        color: "from-red-500 to-red-600",
        bgColor: "from-red-50 to-red-100"
      }
    ],
    "Quy định & Thông tin": [
      {
        id: "academic-rules",
        title: "Quy định học tập",
        description: "Nội quy, quy chế học tập, thi cử và các quy định quan trọng",
        icon: Shield,
        path: "/handbook/academic-rules",
        color: "from-gray-500 to-gray-600",
        bgColor: "from-gray-50 to-gray-100"
      },
      {
        id: "achievements",
        title: "Thành tích & Danh hiệu",
        description: "Các giải thưởng, thành tích nổi bật và chương trình khen thưởng",
        icon: Award,
        path: "/handbook/achievements",
        color: "from-orange-500 to-orange-600",
        bgColor: "from-orange-50 to-orange-100"
      },
      {
        id: "contact",
        title: "Thông tin liên hệ",
        description: "Liên hệ các phòng ban, bộ phận hỗ trợ và thông tin cần thiết",
        icon: Phone,
        path: "/handbook/contact",
        color: "from-teal-500 to-teal-600",
        bgColor: "from-teal-50 to-teal-100"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-orange-25 to-white py-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div
              ref={heroGlare}
              className="glare-effect-orange inline-block p-2 bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg mb-6"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-4 rounded-xl">
                <BookOpen className="w-12 h-12 text-white mx-auto" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sổ tay Tân sinh viên 2025
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Hướng dẫn toàn diện cho tân sinh viên FPT University
            </p>
          </div>
        </div>
      </section>

      {/* Handbook Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nội dung sổ tay
            </h2>
            <p className="text-lg text-gray-600">
              Khám phá tất cả thông tin cần thiết cho hành trình học tập tại FPTU
            </p>
          </div>

          <div className="space-y-16">
            {Object.entries(handbookSections).map(([categoryName, sections]) => (
              <div key={categoryName}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {categoryName}
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sections.map((section) => {
                    const SectionIcon = section.icon;
                    const sectionGlare = useGlareEffect<HTMLDivElement>();

                    return (
                      <Link
                        key={section.id}
                        to={section.path}
                        className="group block"
                      >
                        <div
                          ref={sectionGlare}
                          className={`glare-effect bg-gradient-to-br ${section.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:scale-105 h-full`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className={`bg-gradient-to-br ${section.color} p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300 mb-4`}>
                              <SectionIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                              {section.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
                              {section.description}
                            </p>
                            <div className="flex items-center text-orange-600 text-sm font-medium">
                              <span>Xem chi tiết</span>
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">Chương chính</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Trang nội dung</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600">Sinh viên sử dụng</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2025</div>
              <div className="text-gray-600">Phiên bản mới</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn sàng bắt đầu hành trình?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Khám phá sổ tay tân sinh viên để có được thông tin đầy đủ và chính xác nhất về FPT University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/handbook/introduction"
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Bắt đầu ngay
            </Link>
            <Link
              to="/faq"
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors font-semibold text-lg"
            >
              Xem FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Handbook;
