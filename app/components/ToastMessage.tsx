import { COLORS } from "@/app/Theme/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, FadeInUp, FadeOutUp } from "react-native-reanimated";
import { TOAST_TYPE } from "../constants/Toast";
import { AppContext } from "../store/AppContext";
import { SubTitle } from "./CustomeText";

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
  const { toastConfigHook } = useContext(AppContext);
  const styles = getStyles();

  useEffect(() => {
    if (toastConfigHook.toastMsg.isVisible) {
      const timer = setTimeout(() => {
        toastConfigHook.resetToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastConfigHook.toastMsg.isVisible]);

  return (
    <Animated.View
      entering={FadeInUp.duration(400).easing(Easing.inOut(Easing.quad))}
      exiting={FadeOutUp.duration(400).easing(Easing.inOut(Easing.quad))}
      style={styles.rootContainer}
    >
      <View
        style={[
          { borderColor: ToastColor[toastConfigHook?.toastMsg?.type] },
          styles.container,
        ]}
      >
        <MaterialCommunityIcons
          color={ToastColor[toastConfigHook?.toastMsg?.type]}
          // @ts-ignore
          name={ToastImage[toastConfigHook?.toastMsg?.type]}
          size={24}
          style={{ width: "12%" }}
        />
        <SubTitle style={{ color: COLORS.accent, width: "88%" }}>
          {toastConfigHook.toastMsg.message}
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
