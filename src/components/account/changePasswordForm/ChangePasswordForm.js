import React, { useState } from "react";
import { View, ToastAndroid } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { initialValues, validationSchema } from "./ChangePasswordForm.data";
import { styles } from "./ChangePasswordForm.styles";

export default function ChangePasswordForm(props) {
  const { onClose } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prevState) => !prevState);
  const onShowRepeatPassword = () =>
    setShowRepeatPassword((prevState) => !prevState);

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
        await updatePassword(currentUser, formValue.newPassword);

        onClose();
      } catch (error) {
        ToastAndroid.show("Error al cambiar la contraseña", ToastAndroid.LONG);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Input
        placeholder="Contraseña actual"
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
      <Input
        placeholder="Nueva Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showRepeatPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showRepeatPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowRepeatPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Repite La Nueva Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        onChangeText={(text) =>
          formik.setFieldValue("confirmNewPassword", text)
        }
        errorMessage={formik.errors.confirmNewPassword}
      />
      <Button
        title="Cambiar Contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
