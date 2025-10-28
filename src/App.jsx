import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { isAuth } from "./services/authService"; // adjust path as needed
import Dashboard from "./pages/DashBoard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const result = await isAuth();
      setIsAuthenticated(result);
      setIsLoading(false);
    };

    checkAuth(); // ✅ runs automatically when page loads
  }, []);

  if (isLoading === true) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      </>
    );
  }
  if (isAuthenticated === true) {
    return (
      <>
        <Dashboard />
      </>
    );
  }

  return (
    <>
      <Login />
    </>
  );
}

export default App;
