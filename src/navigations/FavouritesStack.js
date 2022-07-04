import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favourites from "../screens/Favourites";

const Stack = createStackNavigator();

export default function FavouritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favourite-s"
        component={Favourites}
        options={{ title: "Casas Favoritas" }}
      />
    </Stack.Navigator>
  );
}
