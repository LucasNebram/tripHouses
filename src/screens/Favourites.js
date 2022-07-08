import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import Loading from "../components/Loading";
import { db } from "../utils/firebase";
import NotFoundHouses from "../components/favorites/notFoundHouses/NotFoundHouses";
import UserNotLogged from "../components/favorites/userNotLogged/UserNotLogged";
import HouseFavorite from "../components/favorites/houseFavorite/HouseFavorite";

export default function Favourites() {
  const [hasLogged, setHasLogged] = useState(null);
  const [houses, setHouses] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "favorites"),
      where("idUser", "==", auth.currentUser.uid)
    );

    onSnapshot(q, async (snapshot) => {
      let houseArray = [];
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "houses", data.idHouse);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.idFavorite = data.id;

        houseArray.push(newData);
      }
      setHouses(houseArray);
    });
  }, []);

  if (!hasLogged) return <UserNotLogged />;
  if (!houses) return <Loading show text="Cargando favoritos" />;
  if (size(houses) === 0) return <NotFoundHouses />;

  return (
    <ScrollView>
      {map(houses, (house) => (
        <HouseFavorite key={house.id} house={house} />
      ))}
    </ScrollView>
  );
}
