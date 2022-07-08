import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { ListItem, Icon, SearchBar, Avatar } from "@rneui/themed";
import {
  query,
  collection,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { size, map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { db } from "../utils/firebase";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "houses"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResults(querySnapshot.docs);
    })();
  }, [searchText]);

  const goToHouse = (idHouse) => {
    navigation.navigate("houseStack", {
      screen: "house",
      params: { id: idHouse },
    });
  };

  return (
    <>
      <SearchBar
        lightTheme
        round
        placeholder="Busca tu alojamiento..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        inputStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
      />

      {!searchResults && <Loading show text="Cargando" />}

      <ScrollView>
        {size(searchResults) === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            const data = item.data();

            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => goToHouse(data.id)}
              >
                <Avatar source={{ uri: data.images[0] }} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
}
