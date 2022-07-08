import React from "react";
import { View, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AirbnbRating, Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import {
  query,
  doc,
  setDoc,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../utils/firebase";
import { initialValues, validationSchema } from "./AddReviewHouseScreen.data";
import { styles } from "./AddReviewHouseScreen.styles";

export default function AddReviewHouseScreen(props) {
  const { route } = props;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuidv4();
        const newData = formValue;
        newData.id = idDoc;
        newData.idHouse = route.params.idHouse;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateHouse();
      } catch (error) {
        ToastAndroid.show("Error al enviar la review", ToastAndroid.LONG);
      }
    },
  });

  const updateHouse = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idHouse", "==", route.params.idHouse)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review) => review.data().rating);

      const media = mean(arrayStars);

      const houseRef = doc(db, "houses", route.params.idHouse);

      await updateDoc(houseRef, {
        ratingMedia: media,
      });

      navigation.goBack();
    });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, marginHorizontal: 15 }}>
      <View>
        <View>
          <View style={styles.rating}>
            <AirbnbRating
              count={5}
              reviews={[
                "Pésimo",
                "Deficiente",
                "Normal",
                "Muy bueno",
                "Excelente",
              ]}
              defaultRating={formik.values.rating}
              size={35}
              onFinishRating={(rating) =>
                formik.setFieldValue("rating", rating)
              }
            />
          </View>

          <View>
            <Input
              placeholder="Titulo"
              onChangeText={(text) => formik.setFieldValue("title", text)}
              errorMessage={formik.errors.title}
            />
            <Input
              placeholder="Comentario"
              multiline
              inputContainerStyle={styles.opinion}
              onChangeText={(text) => formik.setFieldValue("comment", text)}
              errorMessage={formik.errors.comment}
            />
          </View>
        </View>

        <Button
          title={"Enviar opinión"}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
