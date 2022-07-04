import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil de TripHouses</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor casa? Busca y visualiza las mejores casas
        rurales de una forma sencilla, vota cual te ha gustado más y comenta
        como ha sido tu experiencia
      </Text>

      <Button
        title={"Ver tu perfil"}
        buttonStyle={styles.btn}
        onPress={goToLogin}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 30,
  },
  image: {
    resizeMode: "contain",
    height: 300,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
