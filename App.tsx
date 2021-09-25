import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./src/hooks/AuthContext";
import Routes from "./src/routes";

export default function App() {
  const { userStorageLoading } = useAuth();

  // Mantém o aplicativo carregando enquanto as fontes são carregadas
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
