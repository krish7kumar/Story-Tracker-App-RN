import { COLORS } from "@/app/Theme/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, FadeInUp, FadeOutUp } from "react-native-reanimated";
import { TOAST_TYPE } from "../constants/Toast";
import { SubTitle } from "./CustomeText";
import { useToastStore } from "../store/toastStore";

const ToastColor = {
  [TOAST_TYPE.SUCCESS]: COLORS.success,
  [TOAST_TYPE.ERROR]: COLORS.error,
  [TOAST_TYPE.WARNING]: COLORS.warning,
};

const ToastImage = {
  [TOAST_TYPE.SUCCESS]: "check-decagram",
  [TOAST_TYPE.ERROR]: "alert-decagram",
  [TOAST_TYPE.WARNING]: "alert-decagram",
};

export default function ToastMessage() {
  const { toastMsg, resetToast } = useToastStore((state) => state);
  const styles = getStyles();

  useEffect(() => {
    if (toastMsg.isVisible) {
      const timer = setTimeout(() => {
        resetToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg.isVisible]);

  return (
    <Animated.View
      entering={FadeInUp.duration(400).easing(Easing.inOut(Easing.quad))}
      exiting={FadeOutUp.duration(400).easing(Easing.inOut(Easing.quad))}
      style={styles.rootContainer}
    >
      <View
        style={[{ borderColor: ToastColor[toastMsg?.type] }, styles.container]}
      >
        <MaterialCommunityIcons
          color={ToastColor[toastMsg?.type]}
          // @ts-ignore
          name={ToastImage[toastMsg?.type]}
          size={24}
          style={{ width: "12%" }}
        />
        <SubTitle style={{ color: COLORS.accent, width: "88%" }}>
          {toastMsg.message}
        </SubTitle>
      </View>
    </Animated.View>
  );
}

const getStyles = () => {
  return StyleSheet.create({
    rootContainer: {
      zIndex: 9999,
      marginHorizontal: "8%",
      position: "absolute",
    },
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.secondary,
      paddingHorizontal: "4%",
      paddingVertical: "3%",
      borderRadius: 3,
      borderBottomWidth: 4,
      shadowColor: "black",
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffset: { height: 5, width: 0 },
    },
  });
};
