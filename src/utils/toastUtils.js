// src/utils/toastUtils.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Centralized Toast Config
const defaultConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// ✅ Exported helper functions for reusability
export const showSuccessToast = (message) => {
  console.log("[TOAST SUCCESS]", message);
  toast.success(message, defaultConfig);
};

export const showErrorToast = (message) => {
  console.error("[TOAST ERROR]", message);
  toast.error(message, defaultConfig);
};

export const showWarningToast = (message) => {
  console.warn("[TOAST WARNING]", message);
  toast.warning(message, defaultConfig);
};

export const showInfoToast = (message) => {
  console.info("[TOAST INFO]", message);
  toast.info(message, defaultConfig);
};
