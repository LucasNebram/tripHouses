import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Houses from "../screens/houses/housesScreen/HousesScreen";
import AddHouseScreen from "../screens/houses/addHouseScreen/AddHouseScreen";
import HouseScreen from "../screens/houses/houseScreen/HouseScreen";
import AddReviewHouseScreen from "../screens/houses/addReviewHouseScreen/AddReviewHouseScreen";

const Stack = createStackNavigator();

export default function HousesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"House-s"}
        component={Houses}
        options={{ title: "Alojamientos" }}
      />
      <Stack.Screen
        name="add-house"
        component={AddHouseScreen}
        options={{ title: "Añadir nuevo alojamiento" }}
      />
      <Stack.Screen
        name="house"
        component={HouseScreen}
        options={{ title: "Alojamiento" }}
      />
      <Stack.Screen
        name="add-review"
        component={AddReviewHouseScreen}
        options={{ title: "Añade tu opinión" }}
      />
    </Stack.Navigator>
  );
}
