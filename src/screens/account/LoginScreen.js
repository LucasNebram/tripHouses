import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import LoginForm from "../../components/loginForm/LoginForm";

export default function Login() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate("register");
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
      />

      <View style={styles.viewContainer}>
        <LoginForm />
        <Text>
          ¿Aún no tienes una cuenta?{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Registrate
          </Text>
        </Text>
      </View>
      <Divider />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 180,
    marginTop: 20,
  },
  viewContainer: {
    marginHorizontal: 40,
  },
  textRegister: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
});
