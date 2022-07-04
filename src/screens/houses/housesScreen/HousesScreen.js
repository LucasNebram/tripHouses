import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { styles } from "./HousesScreen.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Houses(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const goToAddHouse = () => {
    navigation.navigate("add-house");
  };

  return (
    <View style={styles.viewBody}>
      <Text>Houses...</Text>

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
