import { COLORS } from "@/app/Theme/Colors";
import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { TextBold } from "./CustomeText";

interface PropsType {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
}

export default function CustomButton(props: PropsType) {
  const { label, onPress, containerStyle, labelStyle, disabled } = props;
  const styles = getStyles();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        { backgroundColor: disabled ? COLORS.disableBtn : COLORS.secondary },
        styles.btnContainer,
        containerStyle,
      ]}
    >
      <TextBold
        style={[
          {
            fontWeight: 800,
            color: disabled ? COLORS.disableBtnText : COLORS.accent,
          },
          labelStyle,
        ]}
      >
        {label}
      </TextBold>
    </TouchableOpacity>
  );
}

const getStyles = () => {
  return StyleSheet.create({
    btnContainer: {
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
  });
};
