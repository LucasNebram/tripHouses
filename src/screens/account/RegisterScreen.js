import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/registerForm/RegisterForm";

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: 180,
    marginTop: 20,
  },
  viewForm: {
    marginHorizontal: 40,
  },
});
