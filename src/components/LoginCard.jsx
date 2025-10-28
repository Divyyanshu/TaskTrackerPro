import { ToastContainer, toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../services/authService";
import "react-toastify/dist/ReactToastify.css";

export default function LoginCard({ switchForm }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Email validation helper
  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("[LOGIN ATTEMPT] formData:", formData);

    // ✅ Basic validation
    if (!formData.email || !formData.password) {
      toast.warning("Please fill in both email and password fields.");
      console.warn("[VALIDATION FAILED] Missing email or password");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.warning("Please enter a valid email address.");
      console.warn("[VALIDATION FAILED] Invalid email format");
      return;
    }

    if (formData.password.length < 6) {
      toast.warning("Password must be at least 6 characters long.");
      console.warn("[VALIDATION FAILED] Weak password");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(formData);
      console.log("[LOGIN SUCCESS] Response:", response);

      if (response && response.token) {
        // Save user data
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("userId", response.userid);

        toast.success(`Welcome back, ${response.userName}!`);
        setTimeout(() => {
          window.location.href = "/Dashboard";
        }, 1000);
      } else {
        console.error("[LOGIN FAILED] Invalid response structure:", response);
        toast.error("Unexpected response. Please try again later.");
      }
    } catch (err) {
      console.error("[LOGIN ERROR]", err);
      const errorMsg =
        err.response?.data?.message ||
        (err.message.includes("401")
          ? "Incorrect email or password."
          : "Login failed. Please check your credentials.");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg transition font-medium ${
              loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Redirect to Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don’t have an account?
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
  );
}
