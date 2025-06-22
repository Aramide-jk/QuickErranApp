import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, MessageCircle, User, Wallet } from "lucide-react";

const BottomNavigation = ({ currentPage }) => {
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    {
      id: "requests",
      label: "Requests",
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
    <div className="lg:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                active
                  ? "bg-green-900/10 text-green-900 font-semibold"
                  : "text-gray-600 hover:text-green-900"
              }`}>
              <IconComponent
                className={`w-5 h-5 mb-1 ${active ? "text-green-900" : ""}`}
              />
              <span
                className={`text-xs ${
                  active ? "font-semibold text-green-900" : "font-medium"
                }`}>
                {item.label}
              </span>
            </Link>
            // <Link
            //   key={item.id}
            //   to={item.path}
            //   className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            //     active
            //       ? "text-green-900 bg-green-900 opacity-7"
            //       : "text-gray-600 hover:text-green-900"
            //   }`}>
            //   <IconComponent
            //     className={`w-5 h-5 mb-1 ${active ? "text-green-900" : ""}`}
            //   />
            //   <span
            //     className={`text-xs font-medium ${
            //       active ? "text-green-900" : ""
            //     }`}>
            //     {item.label}
            //   </span>
            // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
