import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Houses from "../screens/houses/housesScreen/HousesScreen";
import AddHouseScreen from "../screens/houses/addHouseScreen/AddHouseScreen";

const Stack = createStackNavigator();

export default function HousesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"House-s"}
        component={Houses}
        options={{ title: "House" }}
      />
      <Stack.Screen 
        name="add-house"
        component={AddHouseScreen}
        options={{title: 'Añadir nuevo alojamiento'}}
      />
    </Stack.Navigator>
  );
}
