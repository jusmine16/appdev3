import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { NewsProvider } from "./src/context/NewsContext";

export default function App() {
  return (
    <NewsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NewsProvider>
  );
}