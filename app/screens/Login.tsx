import CustomButton from "@/app/components/CustomButton";
import { SubTitle, TextBold, TextNormal } from "@/app/components/CustomeText";
import Divider from "@/app/components/Divider";
import TextInputBox from "@/app/components/TextInputBox";
import { validateEmail } from "@/utility/validations";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NAVIGATION } from "../constants/Navigation";

const ERR_MSG = {
  email: "Invalid email, Please enter valid Email.",
  password: "Invalid password, minimum password length is 8.",
};

export default function LoginScreen(props: any) {
  const [email, setEmail] = useState("");
  //change the state structure
  const [password, setPassword] = useState("");

  const styles = getStyles();

  function resetInput() {
    setEmail("");
    setPassword("");
  }

  function onPressLogin() {
    return;
  }

  return (
    <>
      <View style={styles.container}>
        <SubTitle style={{ fontSize: 30, textAlign: "center" }}>
          {"Welcome Back!"}
        </SubTitle>
        <TextNormal style={{ fontSize: 12, textAlign: "center" }}>
          Log into your existing acount
        </TextNormal>
        <Divider style={{ marginBottom: 36 }} />
        <TextInputBox
          label="Email"
          value={email}
          textInputProps={{
            onChangeText: (value: any) => {
              setEmail(value);
            },
          }}
          inputValidation={validateEmail}
          errMessage={ERR_MSG.email}
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
          password={true}
          containerStyle={{ marginBottom: 36 }}
          inputValidation={() => password?.length >= 8}
          errMessage={ERR_MSG.password}
        />
        <CustomButton
          label="Log In"
          disabled={email === "" || password?.length < 8}
          onPress={onPressLogin}
        />
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 16 }}
        >
          <TextNormal style={{ fontSize: 14 }}>New user? Please, </TextNormal>
          <TouchableOpacity
            onPress={() => {
              resetInput();
              props?.navigation.navigate(NAVIGATION.Signup);
            }}
          >
            <TextBold style={{ borderBottomWidth: 2 }}>Sign Up</TextBold>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const getStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: "12%",
    },
    errMsgContainer: {
      height: 30,
      marginBottom: 8,
      justifyContent: "center",
    },
  });
};
