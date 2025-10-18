import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Cảm ơn bạn đã đăng ký nhận tin!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-orange-600 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-6">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/images/Logo_FPT_Education.png"
                alt="FPT Education"
                className="h-8 w-auto bg-white rounded p-1"
              />
            </div>
            <h3 className="font-bold mb-2">FPTU Handbook RAG</h3>
            <p className="text-orange-100 text-sm">
              AI trợ lý thông minh cho sinh viên FPTU
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-3">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/handbook"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Sổ tay A-Z
                </Link>
              </li>
              <li>
                <Link
                  to="/clubs"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Câu lạc bộ
                </Link>
              </li>
              <li>
                <Link
                  to="/qa"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3">Liên hệ</h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:handbook@fpt.edu.vn"
                className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>handbook@fpt.edu.vn</span>
              </a>
              <a
                href="tel:+842873005588"
                className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(028) 7300 5588</span>
              </a>
              <div className="flex items-start gap-2 text-orange-100">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Quận 9, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="font-bold mb-3">Theo dõi</h3>
            <div className="flex gap-2 mb-4">
              <a
                href="https://facebook.com/fptuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-orange-500 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://instagram.com/fptuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-orange-500 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://linkedin.com/school/fpt-university"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-orange-500 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://youtube.com/@fptuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-orange-500 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>
            </div>

            <form onSubmit={handleSubscribe}>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 rounded text-gray-900 text-sm outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-orange-600 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-orange-500 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-orange-100">
            © {new Date().getFullYear()} FPTU Handbook RAG
          </p>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="text-orange-100 hover:text-white transition-colors"
            >
              Bảo mật
            </Link>
            <Link
              to="/terms"
              className="text-orange-100 hover:text-white transition-colors"
            >
              Điều khoản
            </Link>
            <Link
              to="/about"
              className="text-orange-100 hover:text-white transition-colors"
            >
              Về chúng tôi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
