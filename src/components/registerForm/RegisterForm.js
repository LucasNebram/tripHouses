import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { Input, Button, Icon } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { initialValues, validationSchema } from "./RegisterForm.data";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigation = useNavigation();

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);
  const showRepeatHiddenPassword = () =>
    setShowRepeatPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        ToastAndroid.show("Cuenta Creada", ToastAndroid.SHORT);
        navigation.navigate("account-s");
      } catch (error) {
        ToastAndroid.show(
          "Error al registrarse, intentelo más tarde",
          ToastAndroid.LONG
        );
      }
    },
  });

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
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
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showRepeatPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye"}
            iconStyle={styles.iconRight}
            onPress={showRepeatHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnRegister}
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
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
