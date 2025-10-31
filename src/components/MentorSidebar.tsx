import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  MessageSquare,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Bell,
  ChevronRight,
} from "lucide-react";

const MentorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: "Analytics",
      href: "/mentor/analytics",
      icon: BarChart3,
      description: "Phân tích dữ liệu",
    },
    {
      title: "Recommendations",
      href: "/mentor/recommendations",
      icon: FileText,
      description: "Đề xuất tài nguyên",
    },
    {
      title: "Unresolved Queue",
      href: "/mentor/queue",
      icon: MessageSquare,
      description: "Hàng đợi chưa giải quyết",
    },
  ];

  const isActive = (href: string) => {
    return location.pathname.startsWith(href);
  };

  return (
    <div
      className={`bg-card border-r border-border h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-card-foreground">
                  Mentor Panel
                </h2>
                <p className="text-xs text-muted-foreground">
                  Academic Advisor
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
              isActive(item.href)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-card-foreground hover:text-foreground"
            }`}
          >
            <item.icon
              className={`w-5 h-5 flex-shrink-0 ${
                isActive(item.href)
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.title}</p>
                <p
                  className={`text-xs truncate ${
                    isActive(item.href)
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            )}
            {!isCollapsed && isActive(item.href) && (
              <ChevronRight className="w-4 h-4 text-primary-foreground/70" />
            )}
          </Link>
        ))}
      </nav>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Thống kê nhanh
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Câu hỏi hôm nay</span>
              <span className="font-medium text-primary">47</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Tỷ lệ chính xác</span>
              <span className="font-medium text-success">78%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Đề xuất chờ</span>
              <span className="font-medium text-warning">12</span>
            </div>
          </div>
        </div>
      )}

      {/* User Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="flex items-center gap-3 p-2 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Dr. Nguyễn Văn A</p>
                <p className="text-xs truncate">Mentor - FPT University</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                isCollapsed ? "justify-center" : "flex-1"
              }`}
            >
              <Settings className="w-4 h-4" />
              {!isCollapsed && <span>Cài đặt</span>}
            </button>
            <button
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                isCollapsed ? "justify-center" : "flex-1"
              }`}
            >
              <Bell className="w-4 h-4" />
              {!isCollapsed && <span>Thông báo</span>}
            </button>
            <button
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors text-sm ${
                isCollapsed ? "justify-center" : "flex-1"
              }`}
            >
              <LogOut className="w-4 h-4" />
              {!isCollapsed && <span>Đăng xuất</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSidebar;
