import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import ToastMessage from "./components/ToastMessage";
import { NAVIGATION } from "./constants/Navigation";
import LoginScreen from "./screens/Login";
import Main from "./screens/Main";
import Signup from "./screens/Signup";
import { AppContext } from "./store/AppContext";
import { COLORS } from "./Theme/Colors";

export default function App() {
  const { toastConfigHook } = useContext(AppContext);
  const Stack = createNativeStackNavigator();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior="padding"
        >
          {toastConfigHook?.toastMsg?.isVisible && <ToastMessage />}
          <NavigationIndependentTree>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: COLORS.background },
                }}
              >
                <Stack.Screen name={NAVIGATION.Login} component={LoginScreen} />
                <Stack.Screen name={NAVIGATION.Signup} component={Signup} />
                <Stack.Screen
                  name={NAVIGATION.Main}
                  options={{
                    headerShown: true,
                  }}
                  component={Main}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NavigationIndependentTree>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}
