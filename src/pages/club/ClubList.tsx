import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, Eye, Edit, BarChart3, Target } from "lucide-react";
import { mockClubs } from "@/services/mock/mockData";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ProfessionalCard } from "@/components/layout/ProfessionalCard";
import RoleHeader from "@/components/layout/RoleHeader";
import { DESIGN_TOKENS, BUTTON_VARIANTS } from "@/design-system/tokens";

export default function ClubList() {
  // Giả sử Club Coordinator có thể quản lý nhiều clubs
  const [myClubs] = useState(mockClubs.slice(0, 2)); // Mock: quản lý 2 clubs
  const navigate = useNavigate();

  return (
    <PageContainer size="large">
      <Section>
        {/* Professional Header */}
        {/* Role-specific Header */}
        <RoleHeader
          title="Quản lý Câu lạc bộ"
          description="Danh sách các câu lạc bộ bạn đang quản lý"
          icon={<Target className="w-8 h-8 text-white" />}
        />

        {/* Professional Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "CLB quản lý",
              value: myClubs.length,
              icon: Target,
              color: "orange",
              suffix: "",
            },
            {
              label: "Tổng thành viên",
              value: myClubs.reduce((sum, c) => sum + c.members, 0),
              icon: Users,
              color: "blue",
              suffix: "",
            },
            {
              label: "Tăng trưởng",
              value: "+12",
              icon: TrendingUp,
              color: "green",
              suffix: "%",
            },
            {
              label: "Engagement",
              value: "85",
              icon: BarChart3,
              color: "purple",
              suffix: "%",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ProfessionalCard key={index} className="text-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-xl flex items-center justify-center mb-3`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <p
                    className={`${DESIGN_TOKENS.typography.caption} ${DESIGN_TOKENS.colors.text.secondary} mb-2`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`${DESIGN_TOKENS.typography.heading3} text-${stat.color}-600`}
                  >
                    {stat.value}
                    {stat.suffix}
                  </p>
                </div>
              </ProfessionalCard>
            );
          })}
        </div>

        {/* Professional Clubs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myClubs.map((club) => (
            <ProfessionalCard
              key={club.id}
              onClick={() => navigate(`/club/detail/${club.id}`)}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-4">
                {/* Club Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-4xl">{club.icon}</span>
                </div>

                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className={`${DESIGN_TOKENS.typography.heading4} ${DESIGN_TOKENS.colors.text.primary} mb-2`}
                      >
                        {club.name}
                      </h3>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                        {club.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`${DESIGN_TOKENS.typography.caption} ${DESIGN_TOKENS.colors.text.secondary} mb-4 line-clamp-2`}
                  >
                    {club.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-orange-50 rounded-xl">
                      <Users className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <p
                        className={`${DESIGN_TOKENS.typography.body} font-bold ${DESIGN_TOKENS.colors.text.primary}`}
                      >
                        {club.members}
                      </p>
                      <p
                        className={`${DESIGN_TOKENS.typography.small} ${DESIGN_TOKENS.colors.text.secondary}`}
                      >
                        Thành viên
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p
                        className={`${DESIGN_TOKENS.typography.body} font-bold text-green-600`}
                      >
                        +15%
                      </p>
                      <p
                        className={`${DESIGN_TOKENS.typography.small} ${DESIGN_TOKENS.colors.text.secondary}`}
                      >
                        Tăng trưởng
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <Eye className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p
                        className={`${DESIGN_TOKENS.typography.body} font-bold ${DESIGN_TOKENS.colors.text.primary}`}
                      >
                        2.5K
                      </p>
                      <p
                        className={`${DESIGN_TOKENS.typography.small} ${DESIGN_TOKENS.colors.text.secondary}`}
                      >
                        Lượt xem
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/club/detail/${club.id}`);
                    }}
                    className={`${BUTTON_VARIANTS.primary} w-full inline-flex items-center justify-center gap-2`}
                  >
                    <Edit className="w-4 h-4" />
                    Quản lý CLB này
                  </button>
                </div>
              </div>
            </ProfessionalCard>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}
