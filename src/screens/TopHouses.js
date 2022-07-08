import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { map } from "lodash";
import { db } from "../utils/firebase";
import HouseRanking from "../components/house/houseRanking/HouseRanking";

export default function TopHouses() {
  const [houses, setHouses] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "houses"),
      orderBy("ratingMedia", "desc"),
      limit(5)
    );

    onSnapshot(q, (snapshot) => {
      setHouses(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(houses, (house, index) => (
        <HouseRanking key={index} index={index} house={house.data()} />
      ))}
    </ScrollView>
  );
}
