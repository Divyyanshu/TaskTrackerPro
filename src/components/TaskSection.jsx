// src/components/TaskSection.jsx
import { useState } from "react";

export default function TaskSection({ tasks: initialTasks = [] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "Pending",
    dueDate: "",
    team: "",
  });

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle task creation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.assignee || !form.dueDate)
      return;

    const newTask = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      assignee: form.assignee,
      status: form.status,
      dueDate: form.dueDate,
      team: form.team || "Unassigned",
    };

    setTasks((prev) => [...prev, newTask]);
    setModalOpen(false);
    setForm({
      title: "",
      description: "",
      assignee: "",
      status: "Pending",
      dueDate: "",
      team: "",
    });
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options); // e.g., Oct 20, 2025
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header: All Tasks + New Task Button */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition text-sm font-medium"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Task
        </button>
      </div>

      {/* Filters: Search + Status */}
      <div className="flex flex-col sm:flex-row gap-3 p-6">
        {/* Search */}
        <div className="relative flex-1 border border-gray-300 rounded-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Status Dropdown */}
        <div className="relative border border-gray-300 rounded-lg">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white rounded-lg px-4 py-2.5 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <svg
            className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Task List */}
      <div className="p-6">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            {search || statusFilter !== "All Status"
              ? "No tasks match your filter."
              : "No tasks yet. Create your first task!"}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className="bg-gray-50 rounded-xl p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {t.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      t.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : t.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {t.status === "In Progress" ? (
                      <>
                        <svg
                          className="inline h-3 w-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        In Progress
                      </>
                    ) : (
                      t.status
                    )}
                  </span>
                  {t.assignee && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {t.assignee.split("@")[0]}
                    </span>
                  )}
                  <span className="text-gray-500">
                    Due: {formatDate(t.dueDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-5">Create New Task</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned To (Email) <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="assignee"
                  value={form.assignee}
                  onChange={handleChange}
                  placeholder="employee@example.com"
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team (Optional)
                </label>
                <select
                  name="team"
                  value={form.team}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Select Team</option>
                  <option>Design</option>
                  <option>Development</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
