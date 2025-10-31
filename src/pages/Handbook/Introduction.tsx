import React from "react";
import { Link } from "react-router-dom";
import { useGlareEffect } from "../../hooks/useGlareEffect";
import {
  BookOpen,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Globe,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
} from "lucide-react";

const Introduction: React.FC = () => {
  const heroGlare = useGlareEffect<HTMLDivElement>();

  const values = [
    {
      icon: Target,
      title: "Sứ mệnh",
      description:
        "Đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực công nghệ thông tin và kinh tế số, góp phần xây dựng nền kinh tế tri thức của Việt Nam.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Eye,
      title: "Tầm nhìn",
      description:
        "Trở thành trường đại học hàng đầu Việt Nam về đào tạo công nghệ thông tin và kinh tế số, được công nhận quốc tế.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Heart,
      title: "Giá trị cốt lõi",
      description:
        "Tôn trọng, trung thực, sáng tạo, hợp tác và phát triển bền vững. Luôn đặt sinh viên làm trung tâm của mọi hoạt động.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const achievements = [
    {
      title: "20+ năm kinh nghiệm",
      description:
        "Thành lập từ năm 2006, FPTU đã có hơn 20 năm kinh nghiệm trong đào tạo CNTT",
    },
    {
      title: "50,000+ sinh viên",
      description:
        "Đã đào tạo hơn 50,000 sinh viên, trong đó có nhiều người thành công trong lĩnh vực công nghệ",
    },
    {
      title: "95% có việc làm",
      description: "Tỷ lệ sinh viên có việc làm sau tốt nghiệp đạt trên 95%",
    },
    {
      title: "Top 1 Việt Nam",
      description:
        "Được xếp hạng số 1 Việt Nam về đào tạo CNTT theo nhiều bảng xếp hạng uy tín",
    },
  ];

  const programs = [
    {
      title: "Công nghệ thông tin",
      specializations: [
        "Khoa học máy tính",
        "Kỹ thuật phần mềm",
        "An toàn thông tin",
        "Trí tuệ nhân tạo",
      ],
    },
    {
      title: "Kinh tế số",
      specializations: [
        "Quản trị kinh doanh",
        "Marketing số",
        "Tài chính ngân hàng",
        "Kế toán",
      ],
    },
    {
      title: "Ngoại ngữ",
      specializations: ["Tiếng Anh", "Tiếng Nhật", "Tiếng Hàn", "Tiếng Trung"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-100/50 via-orange-50/30 to-white py-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-screen-2xl mx-auto">
            <div
              ref={heroGlare}
              className="glare-effect-orange inline-block p-2 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg mb-6"
            >
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-xl">
                <BookOpen className="w-12 h-12 text-white mx-auto" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Giới thiệu chung
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Tìm hiểu về FPT University - Trường đại học hàng đầu về công nghệ
              thông tin tại Việt Nam
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/handbook"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Quay lại Sổ tay</span>
            </Link>
            <Link
              to="/handbook/admission"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>Tiếp theo: Quy chế tuyển sinh</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sứ mệnh, Tầm nhìn & Giá trị
            </h2>
            <p className="text-lg text-gray-600">
              Những nguyên tắc cốt lõi định hướng mọi hoạt động của FPT
              University
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const ValueIcon = value.icon;
              const valueGlare = useGlareEffect<HTMLDivElement>();

              return (
                <div
                  key={index}
                  ref={valueGlare}
                  className="glare-effect bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div
                    className={`bg-gradient-to-br ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                  >
                    <ValueIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thành tựu nổi bật
            </h2>
            <p className="text-lg text-gray-600">
              Những con số ấn tượng thể hiện chất lượng đào tạo của FPT
              University
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chương trình đào tạo
            </h2>
            <p className="text-lg text-gray-600">
              Đa dạng các ngành học và chuyên ngành phù hợp với xu hướng thời
              đại
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {program.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {program.specializations.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FPTU */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn FPT University?
            </h2>
            <p className="text-lg text-gray-600">
              Những lý do khiến FPTU trở thành lựa chọn hàng đầu của sinh viên
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl flex-shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Chương trình đào tạo tiên tiến
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cập nhật liên tục theo xu hướng công nghệ mới nhất, đảm bảo
                    sinh viên có kiến thức thực tế và ứng dụng cao.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Môi trường quốc tế
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cơ hội học tập và trao đổi với sinh viên quốc tế, chương
                    trình đào tạo bằng tiếng Anh.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-xl flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cơ hội việc làm cao
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Mạng lưới đối tác rộng lớn với các công ty công nghệ hàng
                    đầu, tỷ lệ có việc làm sau tốt nghiệp trên 95%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Thông tin liên hệ
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hotline</p>
                    <p className="text-gray-600">(028) 7300 5588</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <Globe className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Website</p>
                    <p className="text-gray-600">daihoc.fpt.edu.vn</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Địa chỉ</p>
                    <p className="text-gray-600 leading-relaxed">
                      Khu Công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội
                    </p>
                  </div>
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
              to="/handbook"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Quay lại Sổ tay</span>
            </Link>
            <Link
              to="/handbook/admission"
              className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              <span>Tiếp theo: Quy chế tuyển sinh</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
