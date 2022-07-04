import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopHouses from "../screens/TopHouses";

const Stack = createStackNavigator();

export default function TopHousesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-s"
        component={TopHouses}
        options={{ title: "Las Mejores Casas" }}
      />
    </Stack.Navigator>
  );
}
