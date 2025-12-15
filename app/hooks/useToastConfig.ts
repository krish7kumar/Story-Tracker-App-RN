import { useState } from "react";

export interface ToastConfig {
  toastMsg: {
    message: string;
    isVisible: boolean;
    type: string;
  };
  raiseToast: (message: string, type: string) => void;
  resetToast: () => void;
}

const defaultValue = {
  message: "",
  isVisible: false,
  type: "",
};

export default function useToastConfig(): ToastConfig {
  const [toastMsg, setToastMsg] = useState(defaultValue);

  const resetToast = () => {
    setToastMsg(defaultValue);
  };

  const raiseToast = (message: string, type: string) => {
    setToastMsg({
      message: message,
      isVisible: true,
      type: type,
    });
  };

  return {
    toastMsg,
    raiseToast,
    resetToast,
  };
}
