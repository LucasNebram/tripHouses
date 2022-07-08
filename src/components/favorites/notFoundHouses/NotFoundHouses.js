import React from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { styles } from "./NotFoundHouses.styles";

export default function NotFoundHouses() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={100} />
      <Text style={styles.text}>
        No se han encontrado Alojamientos en tu lista de favoritos.
      </Text>
    </View>
  );
}
