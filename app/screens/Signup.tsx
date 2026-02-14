import CustomButton from "@/app/components/CustomButton";
import { SubTitle, TextBold, TextNormal } from "@/app/components/CustomeText";
import Divider from "@/app/components/Divider";
import TextInputBox from "@/app/components/TextInputBox";
import { COLORS } from "@/app/Theme/Colors";
import { validateEmail, validatePassword } from "@/utility/validations";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TOAST_TYPE } from "../constants/Toast";
import { useToastStore } from "../store/toastStore";

export default function Signup(props: any) {
  const raiseToast = useToastStore((state) => state.raiseToast);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const styles = getStyles();

  const disableSignUp = () => {
    return !(fName || lName || email || password || confirmPass);
  };

  const newUserValidation = () => {
    if (!fName || !lName) {
      raiseToast("Please enter both first and last name.", TOAST_TYPE.ERROR);
    } else if (!validateEmail(email)) {
      raiseToast("Invalid email, please enter valid email.", TOAST_TYPE.ERROR);
    } else if (!validatePassword(password).isValidPassword) {
      raiseToast(
        "Invalid password, please enter valid password.",
        TOAST_TYPE.ERROR,
      );
    } else if (password !== confirmPass) {
      raiseToast(
        `Your passwords don't match.\nMake sure both fields contain the exact same password.`,
        TOAST_TYPE.ERROR,
      );
    } else {
      return;
    }
  };

  const resetData = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };

  return (
    <View style={styles.container}>
      <SubTitle style={{ fontSize: 30, textAlign: "center" }}>
        {"Welcome!"}
      </SubTitle>
      <TextNormal style={{ fontSize: 12, textAlign: "center" }}>
        Signup to start tracking stories you witnessed.
      </TextNormal>
      <Divider style={{ marginBottom: 36 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInputBox
          label="First Name"
          value={fName}
          textInputProps={{
            onChangeText: (value: any) => {
              setFname(value);
            },
          }}
          containerStyle={{ width: "48.5%" }}
        />
        <TextInputBox
          label="Last Name"
          value={lName}
          textInputProps={{
            onChangeText: (value: any) => {
              setLname(value);
            },
          }}
          containerStyle={{ marginBottom: 12, width: "48.5%" }}
        />
      </View>
      <TextInputBox
        label="Email"
        value={email}
        textInputProps={{
          onChangeText: (value: any) => {
            setEmail(value);
          },
        }}
        containerStyle={{ marginBottom: 12 }}
      />
      <TextInputBox
        label="Password"
        value={password}
        textInputProps={{
          onChangeText: (value: any) => {
            setPassword(value);
          },
        }}
        showPassWordRules={true}
        password={true}
        containerStyle={{ marginBottom: 12 }}
      />
      <TextInputBox
        label="Re-enter Password"
        value={confirmPass}
        textInputProps={{
          onChangeText: (value: any) => {
            setConfirmPass(value);
          },
        }}
        showPassWordRules={true}
        password={true}
        containerStyle={{ marginBottom: 36 }}
        passwordToMatch={password}
      />
      <CustomButton
        disabled={disableSignUp()}
        label="Sign Up"
        onPress={() => {
          newUserValidation();
        }}
      />
      <View
        style={{ flexDirection: "row", alignSelf: "center", marginTop: 16 }}
      >
        <TextNormal style={{ fontSize: 14 }}>
          Existing user? Please,{" "}
        </TextNormal>
        <TouchableOpacity
          onPress={() => {
            resetData();
            props?.navigation.goBack();
          }}
        >
          <TextBold
            style={{
              borderBottomWidth: 2,
            }}
          >
            Log in
          </TextBold>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: COLORS.background,
      paddingHorizontal: "12%",
    },
  });
};
