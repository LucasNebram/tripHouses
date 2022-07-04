import React, { useState } from "react";
import { View, ToastAndroid } from "react-native";
import { Input, Button } from "@rneui/themed";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import { useFormik } from "formik";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { styles } from "./ChangeEmailForm.styles";

export default function changeEmailForm(props) {
  const { onClose, onReload } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );
        reauthenticateWithCredential(currentUser, credentials);

        await updateEmail(currentUser, formValue.email);

        onClose();
        onReload();
      } catch (error) {
        ToastAndroid.show(
          "Error al cambiar de Email, intentelo más tarde",
          ToastAndroid.LONG
        );
      }
    },
  });

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nuevo Email"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
