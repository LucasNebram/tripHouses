import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import { db } from "../../../utils/firebase";
import { styles } from "./BtnReviewForm.styles";

export default function BtnReviewForm(props) {
  const { idHouse } = props;
  const [isLogged, setIsLogged] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (isLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idHouse", "==", idHouse),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) setHasReview(true);
      });
    }
  }, [isLogged]);

  const goToAddReview = () => {
    navigation.navigate("add-review", { idHouse });
  };

  const goToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={styles.content}>
      {isLogged ? (
        <Button
          title="Escribe una opinión"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          Para escribir una opinión debes estar logueado{"\n"}
          <Text style={styles.textClick}>Pulsa AQUI para iniciar sesión</Text>
        </Text>
      )}
    </View>
  );
}
