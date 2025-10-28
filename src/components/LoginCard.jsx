import { ToastContainer, toast } from "react-toastify";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../services/authService";
export default function LoginCard({ switchForm }) {
  const [formData, setFormData] = useState({});
  async function handleSubmit(e) {
    e.preventDefault(); // prevent page reload

    try {
      const response = await loginUser(formData);
      localStorage.setItem(token, response.token);
      localStorage.setItem(userName, response.userName);
      localStorage.setItem(userid, response.userid);
    } catch (err) {
      console.error("Error registering:", err);
    }
  }
  return (
    <>
      <div>
        <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
          <ToastContainer />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            {/* 
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )} */}

            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 font-medium"
              >
                Sign in
              </button>
            </div>

            {/* Redirect to Signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?
                <button
                  onClick={switchForm}
                  className="text-purple-600 hover:text-purple-700 font-medium p-1"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
