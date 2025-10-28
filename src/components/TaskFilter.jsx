// src/components/TaskFilters.jsx
import { useState } from "react";

const statuses = ["All Status", "Pending", "In Progress", "Completed"];

export default function TaskFilters({ search, setSearch, status, setStatus }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* Search */}
      <div className="relative flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-between w-full sm:w-48 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          <span>{status}</span>
          <svg
            className={`h-4 w-4 ml-2 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
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
        </button>

        {dropdownOpen && (
          <div className="absolute top-full mt-1 w-full sm:w-48 bg-white border rounded-lg shadow-lg z-20">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  s === status ? "bg-blue-50 text-blue-700" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
