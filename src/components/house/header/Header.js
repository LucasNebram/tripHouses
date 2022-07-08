import React from "react";
import { View, Text } from "react-native";
import { AirbnbRating } from "@rneui/themed";
import { styles } from "./Header.styles";

export default function Header(props) {
  const { house } = props;
  return (
    <View style={styles.content}>
      <View style={styles.title}>
        <Text style={styles.name}>{house.name}</Text>
        <AirbnbRating
          showRating={false}
          count={5}
          reviews={["Pésimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]}
          isDisabled={true}
          size={25}
          defaultRating={house.ratingMedia}
        />
      </View>
      <Text style={styles.description}>{house.description}</Text>
    </View>
  );
}
