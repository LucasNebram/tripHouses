import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import ListHouses from "../../../components/houses/listHouses/ListHouses";
import Loading from "../../../components/Loading";
import { styles } from "./HousesScreen.styles";

export default function Houses(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [houses, setHouses] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "houses"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setHouses(snapshot.docs);
    });
  }, []);

  const goToAddHouse = () => {
    navigation.navigate("add-house");
  };

  return (
    <View style={styles.viewBody}>
      {!houses ? (
        <Loading show text="Cargando" />
      ) : (
        <ListHouses houses={houses} />
      )}

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddHouse}
        />
      )}
    </View>
  );
}
