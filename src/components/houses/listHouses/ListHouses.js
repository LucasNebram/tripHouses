import React from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ListHouses.styles";

export default function listHouses(props) {
  const { houses } = props;
  const navigation = useNavigation();

  const goToHouse = (house) => {
    navigation.navigate("house", { id: house.id });
  };

  return (
    <FlatList
      data={houses}
      renderItem={(doc) => {
        const house = doc.item.data();
        return (
          <TouchableOpacity onPress={() => goToHouse(house)}>
            <View style={styles.house}>
              <Image source={{ uri: house.images[0] }} style={styles.image} />

              <View>
                <Text style={styles.name}>{house.name}</Text>
                {/* <Text style={styles.info}>{house.info}</Text> */}
                <Text style={styles.info}>{house.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
