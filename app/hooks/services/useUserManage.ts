import { TOAST_TYPE } from "@/app/constants/Toast";
import { AppContext } from "@/app/store/AppContext";
import axios from "axios";
import { useContext } from "react";

interface NewUserData {
  email: string;
  password: string;
  fName: string;
  lName: string;
}

interface UserAuthFunction {
  loginUser: (email: string, password: string) => void;
  createNewUser: (userData: NewUserData) => void;
}

const API_KEY = "AIzaSyD6TxS8spjDebhlpHovFy4Fr6W-yYL48w4";

export default function useUserManage(): UserAuthFunction {
  const { toastConfigHook, authDetailsHook } = useContext(AppContext);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=" +
          API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
    } catch (err) {
      if (err) {
        toastConfigHook.raiseToast(
          `Incorrect email or password.\nPlease try again or create an account.`,
          TOAST_TYPE.ERROR
        );
      }
    }
  };

  const createNewUser = async (userData: NewUserData) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          API_KEY,
        {
          email: "email@ondo.com",
          password: "passworD!99880",
          returnSecureToken: true,
        }
      );
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      console.log(err);
      if (err) {
        toastConfigHook.raiseToast(
          `This email address is already registered.\nPlease log in or use a different email address to sign up.`,
          TOAST_TYPE.WARNING
        );
      }
    }
  };

  return {
    loginUser,
    createNewUser,
  };
}
