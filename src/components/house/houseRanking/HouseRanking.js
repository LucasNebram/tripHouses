import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Icon, AirbnbRating } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./HouseRanking.styles";

export default function HouseRanking(props) {
  const { house, index } = props;
  const navigation = useNavigation();

  const goToHouse = () => {
    navigation.navigate("houseStack", {
      screen: "house",
      params: { id: house.id },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToHouse}>
      <View style={styles.content}>
        <Image source={{ uri: house.images[0] }} style={styles.img} />
        <View style={styles.info}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{house.name}</Text>
          </View>
          <AirbnbRating
            showRating={false}
            size={15}
            isDisabled={true}
            defaultRating={house.ratingMedia}
          />
        </View>
        <Text style={styles.description}>{house.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
