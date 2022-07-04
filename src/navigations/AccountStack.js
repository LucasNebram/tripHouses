import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/account/Account";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account-s"
        component={Account}
        options={{ title: "Mi Cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: "Iniciar Sesión" }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{ title: "Nueva Cuenta" }}
      />
    </Stack.Navigator>
  );
}
