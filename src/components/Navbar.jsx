// src/components/Navbar.jsx
import { useState } from "react";
import { User } from "lucide-react"; // ✅ Add this at the top
export default function Navbar({
  userName,
  onLogout,
  setCurrentScreen,
  currentScreen,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", screen: "dashboard" },
    { label: "Tasks", screen: "tasks" },
    { label: "Teams", screen: "teams" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
              TaskTracker Pro
            </h1>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  currentScreen === item.screen
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="ml-6 flex items-center space-x-3">
              {/* User Icon */}
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg shadow-sm">
                <User className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm font-semibold text-gray-800 uppercase">
                  {userName}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => {
                  setCurrentScreen(item.screen);
                  setMobileOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentScreen === item.screen
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="ml-6 flex items-center space-x-3">
              {/* User Icon */}
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg shadow-sm">
                <User className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm font-semibold text-gray-800 uppercase">
                  {userName}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
