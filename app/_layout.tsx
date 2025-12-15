import "react-native-reanimated";

import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import App from "./App";
import { AppContextProvider } from "./store/AppContext";
import { COLORS } from "./Theme/Colors";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Outfit-Regular": require("./assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Bold": require("./assets/fonts/Outfit-Bold.ttf"),
  });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </SafeAreaView>
  );
}
