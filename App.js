import React from "react";
import { LogBox } from "react-native";
import Navigation from "./src/navigations/Navigation";
import { initFireBase } from "./src/utils/firebase";
import "react-native-get-random-values";

LogBox.ignoreAllLogs();
export default function App() {
  return <Navigation />;
}
