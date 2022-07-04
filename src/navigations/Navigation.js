import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";

import HousesStack from "./HousesStack";
import FavouritesStack from "./FavouritesStack";
import TopHousesStack from "./TopHousesStack";
import AccountStack from "./AccountStack";
import SearchStack from "./SearchStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",
          tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        })}
      >
        <Tab.Screen
          name="house"
          component={HousesStack}
          options={{ title: "Casas" }}
        />
        <Tab.Screen
          name="favourites"
          component={FavouritesStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="top-Houses"
          component={TopHousesStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === "house") {
    iconName = "compass-outline";
  }

  if (route.name === "favourites") {
    iconName = "heart-outline";
  }

  if (route.name === "top-Houses") {
    iconName = "star-outline";
  }

  if (route.name === "search") {
    iconName = "magnify";
  }

  if (route.name === "account") {
    iconName = "home-outline";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
