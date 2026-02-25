import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import BookmarksScreen from "../screens/BookmarksScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "ButuanNews" }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Details" }} />
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{ title: "Bookmarks" }}
      />
    </Stack.Navigator>
  );
}
