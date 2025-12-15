import { COLORS } from "@/app/Theme/Colors";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FunctionComponent<DividerProps> = (
  props: DividerProps
) => {
  const styles = getStyles();

  return <View style={[styles.containerStyle, props.style]} />;
};

function getStyles() {
  const styles = StyleSheet.create({
    containerStyle: {
      borderTopWidth: 1,
      marginVertical: 10,
      borderColor: COLORS.border,
    },
  });
  return styles;
}

export default Divider;
