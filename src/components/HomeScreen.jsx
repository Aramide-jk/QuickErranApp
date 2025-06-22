import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  Plus,
  ShoppingCart,
  UtensilsCrossed,
  FileText,
  ClipboardList,
  Pill,
  Package,
  Menu,
} from "lucide-react";
import BottomNavigation from "./BottomNavigation";
import DesktopSidebar from "./DesktopSidebar";

const HomeScreen = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Grocery Pickup",
      icon: ShoppingCart,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      name: "Food Order",
      icon: UtensilsCrossed,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 3,
      name: "Document Delivery",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      name: "Custom Request",
      icon: ClipboardList,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 5,
      name: "Pharmacy Pickup",
      icon: Pill,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 6,
      name: "Package Delivery",
      icon: Package,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="desktop-layout">
      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage="home" />

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
              currentPage="home"
              mobile
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="container-responsive desktop-main">
        <div className="min-h-screen bg-bg-soft pb-20 lg:pb-0">
          {/* Header */}
          <div className="bg-primary text-white p-6 rounded-b-3xl lg:rounded-none lg:p-8">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 -ml-2 mr-2 hover:bg-white hover:bg-opacity-20 rounded-lg">
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                  {getGreeting()}, {user?.name?.split(" ")[0] || "User"}
                </h1>
                <div className="flex items-center text-white text-opacity-90">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm lg:text-base">
                    {user?.location || "Lagos, Nigeria"}
                  </span>
                </div>
              </div>

              {/* Desktop Quick Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/new-request"
                  className="bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] text-white py-2 px-4 rounded-lg font-medium flex items-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  New Request
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to get done?"
                className="w-full pl-12 pr-4 py-3 lg:py-4 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 text-gray-800 text-base"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Left Column - Categories */}
              <div className="lg:col-span-2">
                {/* Categories */}
                <div className="mb-8">
                  <h2 className="text-xl lg:text-2xl font-bold text-text-dark mb-4 lg:mb-6">
                    Choose Service
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Link
                          key={category.id}
                          to="/new-request"
                          className="category-card lg:p-6">
                          <div
                            className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl ${category.color} flex items-center justify-center mb-3 lg:mb-4`}>
                            <IconComponent className="w-6 h-6 lg:w-8 lg:h-8" />
                          </div>
                          <h3 className="font-medium text-text-dark text-sm lg:text-base">
                            {category.name}
                          </h3>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Quick Action Button */}
                <Link to="/new-request" className="lg:hidden">
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    Post New Request
                  </button>
                </Link>
              </div>

              {/* Right Column - Map and Stats */}
              <div className="hidden lg:block">
                {/* Map Section */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-text-dark mb-4">
                    Nearby Runners
                  </h2>
                  <div className="bg-white rounded-xl h-64 border flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                      <p>Map showing nearby runners</p>
                      <p className="text-sm">Coming soon...</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold text-text-dark mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Runners</span>
                      <span className="font-semibold text-primary">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Response Time</span>
                      <span className="font-semibold text-primary">3 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-primary">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomNavigation currentPage="home" />
      </div>
    </div>
  );
};

export default HomeScreen;
