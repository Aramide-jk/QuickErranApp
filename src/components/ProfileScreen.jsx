import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit2,
  Shield,
  Users,
  LogOut,
  ChevronRight,
  Menu,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import BottomNavigation from "./BottomNavigation";
import DesktopSidebar from "./DesktopSidebar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = ({ user, setUser, isRunnerMode, setIsRunnerMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // setUser(null);
    logout();
    navigate("/");
    console.log("out");
  };

  const handleRunnerModeToggle = () => {
    setIsRunnerMode(!isRunnerMode);
  };

  const menuItems = [
    {
      id: 1,
      title: "KYC Verification",
      icon: Shield,
      description: "Verify your identity",
      action: () => alert("KYC Verification coming soon!"),
      color: "text-blue-600 bg-blue-100",
    },
    {
      id: 2,
      title: isRunnerMode ? "Switch to Customer Mode" : "Switch to Runner Mode",
      icon: Users,
      description: isRunnerMode
        ? "Browse and post requests"
        : "Start earning as a runner",
      action: handleRunnerModeToggle,
      color: "text-green-600 bg-green-100",
    },
  ];

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage="profile" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setSidebarOpen(false)}>
          <div
            className="w-80 bg-white h-full"
            onClick={(e) => e.stopPropagation()}>
            <DesktopSidebar
              user={user}
              currentPage="profile"
              mobile
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="container-responsive desktop-main">
        <div className="min-h-screen bg-bg-soft pb-20 lg:pb-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b bg-white">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 mr-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/home" className="lg:hidden p-2">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-xl lg:text-2xl font-semibold text-text-dark ml-2 lg:ml-0">
                Profile
              </h1>
            </div>

            {/* Desktop Mode Toggle */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-2">
                <span
                  className={`text-sm font-medium mr-2 ${
                    !isRunnerMode ? "text-primary" : "text-gray-600"
                  }`}>
                  Customer
                </span>
                <button
                  onClick={handleRunnerModeToggle}
                  className="flex items-center">
                  {isRunnerMode ? (
                    <ToggleRight className="w-10 h-5 text-primary" />
                  ) : (
                    <ToggleLeft className="w-10 h-5 text-gray-400" />
                  )}
                </button>
                <span
                  className={`text-sm font-medium ml-2 ${
                    isRunnerMode ? "text-primary" : "text-gray-600"
                  }`}>
                  Runner
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <div className="bg-white p-6 lg:p-8 border-b lg:rounded-t-2xl">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-2xl lg:text-3xl font-bold text-white">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-white border-2 border-gray-200 rounded-full p-1.5 hover:bg-gray-50">
                      <Edit2 className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>

                  <div className="ml-4 lg:ml-6 flex-1">
                    <h2 className="text-xl lg:text-2xl font-bold text-text-dark">
                      {user?.name || "User Name"}
                    </h2>
                    <p className="text-gray-600">
                      {user?.email || "user@example.com"}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Verified Account
                      </span>
                    </div>

                    {/* Mode Badge */}
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          isRunnerMode
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {isRunnerMode ? "🏃‍♂️ Runner Mode" : "👤 Customer Mode"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="bg-white p-6 lg:p-8 mb-6 lg:rounded-none lg:border-b">
                <h3 className="text-lg font-semibold text-text-dark mb-4">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Full Name</span>
                    <span className="font-medium text-text-dark">
                      {user?.name || "John Doe"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-medium text-text-dark">
                      {user?.phone || "+234 XXX XXX XXXX"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium text-text-dark">
                      {user?.email || "john@example.com"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-text-dark">
                      {user?.location || "Lagos, Nigeria"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="bg-white p-4 lg:p-6 mb-6 lg:rounded-none lg:border-b">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center p-4 hover:bg-gray-50 rounded-xl transition-colors">
                      <div
                        className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mr-4`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-text-dark">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  );
                })}
              </div>

              {/* Logout Button */}
              <div className="bg-white p-4 lg:p-6 lg:rounded-b-2xl">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-50 text-red-600 py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <BottomNavigation currentPage="profile" />
      </div>
    </div>
  );
};

export default ProfileScreen;
