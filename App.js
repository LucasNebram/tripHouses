import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import React from "react";
import Navigation from "./src/navigations/Navigation";
import { initFireBase } from "./src/utils/firebase";
import "react-native-get-random-values";
export default function App() {
  return <Navigation />;
}
