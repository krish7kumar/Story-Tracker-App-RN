import React, { createContext } from "react";

interface ContextTypes {}

export const AppContext = createContext<ContextTypes>({});

export function AppContextProvider(props: any) {
  const defaultValue: ContextTypes = {};
}
