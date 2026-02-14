import { create } from "zustand";

type Toast = {
  toastMsg: {
    message: string;
    isVisible: boolean;
    type: string;
  };
  raiseToast: (message: string, type: string) => void;
  resetToast: () => void;
};

export const useToastStore = create<Toast>()((set) => {
  return {
    toastMsg: {
      message: "",
      isVisible: false,
      type: "",
    },
    raiseToast: (message, type) => {
      set(() => ({
        toastMsg: {
          message: message ? message : "An error occurred. Please try again.",
          isVisible: true,
          type,
        },
      }));
    },
    resetToast: () => {
      set(() => ({
        toastMsg: {
          message: "",
          isVisible: false,
          type: "",
        },
      }));
    },
  };
});
