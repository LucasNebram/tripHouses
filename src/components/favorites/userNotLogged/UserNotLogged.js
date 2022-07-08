import React from "react";
import { View, Text } from "react-native";
import { Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./UserNotLogged.styles";

export default function UserNotLogged() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={100} />
      <Text style={styles.text}>
        Para ver este apartado necesita iniciar sesión.
      </Text>

      <Button
        title={"Iniciar Sesión"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={goToLogin}
      />
    </View>
  );
}
