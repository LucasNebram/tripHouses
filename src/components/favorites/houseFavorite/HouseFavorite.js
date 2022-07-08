import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./HouseFavorite.styles";
import { Icon } from "@rneui/themed";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export default function HouseFavorite(props) {
  const { house } = props;
  const navigation = useNavigation();

  const goToHouse = () => {
    navigation.navigate("houseStack", {
      screen: "house",
      params: { id: house.id },
    });
  };

  const RemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", house.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToHouse}>
      <View style={styles.content}>
        <Image source={{ uri: house.images[0] }} style={styles.img} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{house.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.icon}
            onPress={RemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
