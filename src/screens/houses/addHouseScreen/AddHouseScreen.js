import React from "react";
import { ScrollView, Text } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddHouseScreen.data";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import InforForm from "../../../components/houses/addHouse/InfoForm/InforForm";
import ImageHouse from "../../../components/houses/addHouse/ImageHouse/ImageHouse";
import UploadImagesForm from "../../../components/houses/addHouse/uploadImagesForm/UploadImagesForm";
import { db } from "../../../utils/firebase";
import { styles } from "./AddHouseScreen.styles";

export default function AddHouseScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuidv4();
        newData.createdAt = new Date();

        await setDoc(doc(db, "houses", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageHouse formik={formik} />

      <InforForm formik={formik} />

      <UploadImagesForm formik={formik} />

      <Button
        title="Crear alojamiento"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
