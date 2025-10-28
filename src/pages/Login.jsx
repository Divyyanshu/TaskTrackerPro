import { useState } from "react";
import LoginCard from "../components/LoginCard";
import SignUp from "../components/Singup";
export default function Login() {
 const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <LoginCard switchForm={() => setIsLogin(false)} />
      ) : (
        <SignUp switchForm={() => setIsLogin(true)} />
      )}
    </>
  );
}