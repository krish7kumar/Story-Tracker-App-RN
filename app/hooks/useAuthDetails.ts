import { useState } from "react";

export interface AuthDetailsType {
  isLoggedIn: boolean;
  authToken: string;
}

export default function useAuthDetails(): AuthDetailsType {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [userName, setUserName] = useState("");

  return {
    isLoggedIn,
    authToken,
  };
}
