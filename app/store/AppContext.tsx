import React, { createContext } from "react";
import useAuthDetails, { AuthDetailsType } from "../hooks/useAuthDetails";
import useToastConfig, { ToastConfig } from "../hooks/useToastConfig";

interface ContextTypes {
  toastConfigHook: ToastConfig;
  authDetailsHook: AuthDetailsType;
}

export const AppContext = createContext<ContextTypes>({});

export function AppContextProvider(props: any) {
  const defaultValue: ContextTypes = {
    toastConfigHook: useToastConfig(),
    authDetailsHook: useAuthDetails(),
  };

  return <AppContext.Provider value={defaultValue} {...props} />;
}
