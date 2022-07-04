import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { initialValues, validationSchema } from "./LoginForm.data";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const showHiddenPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate("account-s");
      } catch (error) {
        ToastAndroid.show(
          "Usuario o Contraseña incorrectos",
          ToastAndroid.SHORT
        );
      }
    },
  });

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye"}
            iconStyle={styles.iconRight}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "90%",
    marginBottom: 10,
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
