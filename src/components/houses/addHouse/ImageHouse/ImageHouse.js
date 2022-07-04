import React from "react";
import { View, Image } from "react-native";
import { styles } from "./ImageHouse.styles";

export default function ImageHouse(props) {
  const { formik } = props;
  const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage ? { uri: primaryImage }
            : require("../../../../../assets/img/image-not-found.jpg")
        }
        style={styles.image}
      />
    </View>
  );
}
