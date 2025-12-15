import { COLORS } from "@/app/Theme/Colors";
import { validatePassword } from "@/utility/validations";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SubTitle, TextBold } from "./CustomeText";

interface PropsType {
  value: string;
  label: string;
  textInputProps?: TextInputProps;
  placeholder?: string;
  password?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  onBlur?: () => void;
  onFocus?: () => void;
  passwordToMatch?: string;
  showPassWordRules?: boolean;
  errMessage?: string;
  inputValidation?: (value: string) => boolean | string;
}

export default function TextInputBox(props: PropsType) {
  const [showPassword, setShowPassword] = useState(false);
  const inputBoxRef = useRef<TextInput | null>(null);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const styles = getStyles();

  const inputErr =
    isEdited &&
    !!props?.value &&
    props?.inputValidation &&
    !props?.inputValidation(props?.value);

  const getPasswordRules = () => {
    const { rules } = validatePassword(props?.value, props?.passwordToMatch);
    return <TextInputRules rules={rules} />;
  };

  return (
    <Animated.View
      layout={LinearTransition}
      style={[{ width: "100%" }, props?.containerStyle]}
    >
      <TextBold style={[{ marginBottom: 8 }, props?.labelStyle]}>
        {props?.label}
      </TextBold>
      <TouchableWithoutFeedback onPress={() => inputBoxRef?.current?.focus()}>
        <View
          style={[
            styles.inputContainer,
            { borderColor: inputErr ? COLORS.error : COLORS.primary },
          ]}
        >
          <TextInput
            ref={(input) => {
              inputBoxRef.current = input;
            }}
            style={[styles.textInput, props?.valueStyle]}
            value={props?.value}
            {...props?.textInputProps}
            placeholder={props?.placeholder}
            onBlur={() => {
              if (props?.showPassWordRules) setShowPasswordRules(false);
              if (!isEdited && !!props?.value) {
                setIsEdited(true);
              }
              if (props?.onBlur) props?.onBlur();
            }}
            onFocus={() => {
              if (props?.showPassWordRules) setShowPasswordRules(true);
              if (props?.onFocus) props?.onFocus();
            }}
            secureTextEntry={props?.password && !showPassword}
          />
          {props?.password && !!props?.value && (
            <TouchableOpacity
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Ionicons
                size={20}
                name={showPassword ? "eye-off" : "eye"}
                color={COLORS.primary}
                style={{ marginEnd: 4 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      {inputErr && (
        <View style={{ marginVertical: 4 }}>
          <SubTitle style={{ color: COLORS.error }}>
            {props?.errMessage}
          </SubTitle>
        </View>
      )}
      {showPasswordRules && getPasswordRules()}
    </Animated.View>
  );
}

function TextInputRules(props: { rules: any[] }) {
  const styles = getStyles();
  return (
    <View style={styles.rulesContainer}>
      {props.rules.map((rule: any, index: number) => (
        <View key={index} style={{ flexDirection: "row", marginVertical: 2 }}>
          <MaterialCommunityIcons
            name={rule.isValid ? "check-circle" : "alert-circle"}
            size={12}
            color={rule.isValid ? COLORS.success : COLORS.error}
            style={{ width: "6%" }}
          />
          <TextBold
            style={[
              {
                color: rule.isValid ? COLORS.success : COLORS.error,
                fontSize: 10,
                width: "94%",
              },
            ]}
          >
            {rule.text}
          </TextBold>
        </View>
      ))}
    </View>
  );
}

const getStyles = () => {
  return StyleSheet.create({
    rulesContainer: {
      backgroundColor: COLORS.secondary,
      marginTop: 8,
      paddingHorizontal: 12,
      borderRadius: 10,
      paddingVertical: 12,
    },
    inputContainer: {
      flexDirection: "row",
      borderWidth: 2,
      paddingHorizontal: 8,
      borderRadius: 6,
      alignItems: "center",

      height: 40,
    },
    textInput: {
      flex: 1,
      fontSize: 14,
      color: COLORS.textPrimary,
      backgroundColor: "transparent",
    },
  });
};
