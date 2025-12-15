import { COLORS } from "@/app/Theme/Colors";
import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface PropsType extends TextProps {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

const SubTitle: React.FunctionComponent<PropsType> = (props: PropsType) => {
  const styles = getStyles();

  return (
    <Text {...props} style={[styles.subTitle, props?.style]}>
      {props.children}
    </Text>
  );
};

const TextBold: React.FunctionComponent<PropsType> = (props: PropsType) => {
  const styles = getStyles();

  return (
    <Text {...props} style={[styles.boldText, props?.style]}>
      {props.children}
    </Text>
  );
};
const TextNormal: React.FunctionComponent<PropsType> = (props: PropsType) => {
  const styles = getStyles();

  return (
    <Text {...props} style={[styles.normalText, props?.style]}>
      {props.children}
    </Text>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    normalText: {
      fontFamily: "Outfit-Regular",
      color: COLORS.textPrimary,
      fontSize: 12,
      fontWeight: 400,
    },
    subTitle: {
      fontFamily: "Outfit-Medium",
      color: COLORS.textPrimary,
      fontSize: 12,
      fontWeight: 600,
    },
    boldText: {
      fontFamily: "Outfit-Bold",
      color: COLORS.textPrimary,
      fontSize: 14,
      fontWeight: 800,
    },
  });
};

export { SubTitle, TextBold, TextNormal };
