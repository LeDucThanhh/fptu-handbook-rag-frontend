import React from "react";
import { Link } from "react-router-dom";
import { useGlareEffect } from "../../hooks/useGlareEffect";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Handbook: React.FC = () => {
  const handbookSections = {
    "Tuyển sinh & Đào tạo": [
      {
        id: "introduction",
        title: "Giới thiệu chung",
        description:
          "Tổng quan về FPT University, sứ mệnh, tầm nhìn và giá trị cốt lõi",
        image: "/images/Logo_FPT_Education.png",
        path: "/handbook/introduction",
        color: "from-blue-500 to-blue-600",
        bgColor: "from-blue-50 to-blue-100",
      },
      {
        id: "admission",
        title: "Quy chế tuyển sinh",
        description:
          "Thông tin về quy trình tuyển sinh, điều kiện xét tuyển và thời gian",
        image: "/images/Quality_lecturers.png",
        path: "/handbook/admission",
        color: "from-green-500 to-green-600",
        bgColor: "from-green-50 to-green-100",
      },
      {
        id: "tuition",
        title: "Học phí & Học bổng",
        description:
          "Chi tiết về mức học phí, các loại học bổng và điều kiện nhận",
        image: "/images/Attractive_scholarships.jpg",
        path: "/handbook/tuition",
        color: "from-yellow-500 to-yellow-600",
        bgColor: "from-yellow-50 to-yellow-100",
      },
      {
        id: "curriculum",
        title: "Chương trình đào tạo",
        description:
          "Mô tả các ngành học, chương trình đào tạo và lộ trình học tập",
        image: "/images/Diverse_programs.jpg",
        path: "/handbook/curriculum",
        color: "from-purple-500 to-purple-600",
        bgColor: "from-purple-50 to-purple-100",
      },
    ],
    "Đời sống sinh viên": [
      {
        id: "student-life",
        title: "Hoạt động sinh viên",
        description: "Thông tin về câu lạc bộ, hoạt động ngoại khóa và sự kiện",
        image: "/images/Startup_Incubator.jpg",
        path: "/handbook/student-life",
        color: "from-pink-500 to-pink-600",
        bgColor: "from-pink-50 to-pink-100",
      },
      {
        id: "facilities",
        title: "Cơ sở vật chất",
        description:
          "Giới thiệu ký túc xá, thư viện, phòng thí nghiệm và tiện ích",
        image: "/images/Modern_facilities.jpeg",
        path: "/handbook/facilities",
        color: "from-indigo-500 to-indigo-600",
        bgColor: "from-indigo-50 to-indigo-100",
      },
      {
        id: "support-services",
        title: "Dịch vụ hỗ trợ",
        description:
          "Tư vấn học tập, hỗ trợ tâm lý, hướng nghiệp và các dịch vụ khác",
        image: "/images/Alumni_Network.jpg",
        path: "/handbook/support-services",
        color: "from-red-500 to-red-600",
        bgColor: "from-red-50 to-red-100",
      },
    ],
    "Quy định & Thông tin": [
      {
        id: "academic-rules",
        title: "Quy định học tập",
        description:
          "Nội quy, quy chế học tập, thi cử và các quy định quan trọng",
        image: "/images/Modern_library.jpg",
        path: "/handbook/academic-rules",
        color: "from-gray-500 to-gray-600",
        bgColor: "from-gray-50 to-gray-100",
      },
      {
        id: "achievements",
        title: "Thành tích & Danh hiệu",
        description:
          "Các giải thưởng, thành tích nổi bật và chương trình khen thưởng",
        image: "/images/Business_Connection.jpg",
        path: "/handbook/achievements",
        color: "from-orange-500 to-orange-600",
        bgColor: "from-orange-50 to-orange-100",
      },
      {
        id: "contact",
        title: "Thông tin liên hệ",
        description:
          "Liên hệ các phòng ban, bộ phận hỗ trợ và thông tin cần thiết",
        image: "/images/International_environment.jpg",
        path: "/handbook/contact",
        color: "from-teal-500 to-teal-600",
        bgColor: "from-teal-50 to-teal-100",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Modern_facilities.jpeg')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-900/80"></div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-400/20 via-blue-300/10 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400/20 via-indigo-300/10 to-transparent rounded-full -ml-40 -mb-40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Khám phá FPT University
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hành trình học tập đầy cảm hứng và cơ hội phát triển không giới
              hạn
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Handbook Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {Object.entries(handbookSections).map(
              ([categoryName, sections], categoryIndex) => (
                <motion.div
                  key={categoryName}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {categoryName}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, sectionIndex) => {
                      const sectionGlare = useGlareEffect<HTMLDivElement>();

                      return (
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: categoryIndex * 0.2 + sectionIndex * 0.1,
                          }}
                        >
                          <Link
                            to={section.path}
                            className="group block h-full"
                          >
                            <motion.div
                              ref={sectionGlare}
                              className="glare-effect bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:scale-105 h-48 overflow-hidden"
                              whileHover={{ y: -5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="flex h-full">
                                {/* Image Section */}
                                <div className="w-48 h-full flex-shrink-0 relative overflow-hidden">
                                  <img
                                    src={section.image}
                                    alt={section.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                  <div
                                    className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                                  ></div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                  <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                      {section.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                      {section.description}
                                    </p>
                                  </div>

                                  <div className="flex items-center text-orange-600 text-sm font-medium mt-4">
                                    <span>Xem chi tiết</span>
                                    <motion.div
                                      className="ml-1"
                                      whileHover={{ x: 3 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 400,
                                      }}
                                    >
                                      <ChevronRight className="w-4 h-4" />
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Handbook;
