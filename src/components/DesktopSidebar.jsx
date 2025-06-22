import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ClipboardList,
  MessageCircle,
  User,
  Wallet,
  X,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DesktopSidebar = ({ user, currentPage, mobile, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // setUser(null);
    logout();
    navigate("/");
    console.log("out");
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    {
      id: "requests",
      label: "My Requests",
      icon: ClipboardList,
      path: "/requests",
    },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/chat" },
    { id: "wallet", label: "Wallet", icon: Wallet, path: "/wallet" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  const isActive = (path) =>
    location.pathname === path || currentPage === path.replace("/", "");

  return (
    <div className="desktop-sidebar">
      <div className="p-6 border-b border-gray-300">
        {mobile && (
          <button
            onClick={onClose}
            className="float-right p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Logo */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">QE</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">QuickErran</h1>
            <p className="text-xs text-gray-600">Get Things Done</p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-dark text-sm">
              {user?.name || "User Name"}
            </h3>
            <p className="text-xs text-gray-600">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={mobile ? onClose : undefined}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <IconComponent className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-300">
        <Link
          to="/profile"
          onClick={mobile ? onClose : undefined}
          className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-2">
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
