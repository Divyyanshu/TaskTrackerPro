// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ManageButton from "../components/ManageButton";
import TaskSection from "../components/TaskSection";
import TeamSection from "../components/TeamSection";

export default function Dashboard() {
  // ---------- Auth check ----------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // ---------- Mock data ----------
  const [tasks] = useState([
    { id: 1, title: "Design homepage", status: "In Progress" },
    { id: 2, title: "Fix login bug", status: "Pending" },
    { id: 3, title: "Deploy v2", status: "Completed" },
  ]);

  const [members] = useState([
    { id: 1, name: "Harsh", role: "Admin" },
    { id: 2, name: "Priya", role: "Developer" },
  ]);

  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [showConfirm, setShowConfirm] = useState(false);

  // ---------- Stats ----------
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
  };

  // ---------- Logout logic ----------
  const handleLogout = () => setShowConfirm(true);

  const confirmLogout = () => {
    console.log("✅ Logging out...");
    localStorage.removeItem("token");

    // Optional: clear all storage for security
    // localStorage.clear();

    setShowConfirm(false);
    window.location.href = "/login";
  };

  const cancelLogout = () => {
    console.log("❌ Logout cancelled by user.");
    setShowConfirm(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar
        userName="harsh"
        onLogout={handleLogout}
        setCurrentScreen={setCurrentScreen}
        currentScreen={currentScreen}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard view */}
        {currentScreen === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Task Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <StatsCard title="Total Tasks" value={stats.total} />
              <StatsCard
                title="Pending"
                value={stats.pending}
                bgColor="bg-yellow-50"
                textColor="text-yellow-800"
              />
              <StatsCard
                title="In Progress"
                value={stats.inProgress}
                bgColor="bg-blue-50"
                textColor="text-blue-800"
              />
              <StatsCard
                title="Completed"
                value={stats.completed}
                bgColor="bg-green-50"
                textColor="text-green-800"
              />
            </div>

            {/* Manage buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ManageButton
                title="Manage Tasks"
                description="Create, view, and manage all tasks"
                bg="bg-blue-600"
                onClick={() => setCurrentScreen("tasks")}
              />
              <ManageButton
                title="Manage Teams"
                description="Create and manage team members"
                bg="bg-purple-600"
                onClick={() => setCurrentScreen("teams")}
              />
            </div>
          </>
        )}

        {/* Tasks view */}
        {currentScreen === "tasks" && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentScreen("dashboard")}
              className="text-blue-600 hover:underline mb-4"
            >
              ← Back to Dashboard
            </button>
            <TaskSection tasks={tasks} />
          </div>
        )}

        {/* Teams view */}
        {currentScreen === "teams" && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentScreen("dashboard")}
              className="text-blue-600 hover:underline mb-4"
            >
              ← Back to Dashboard
            </button>
            <TeamSection members={members} />
          </div>
        )}
      </main>

      {/* ---------- Logout Confirmation Modal ---------- */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
