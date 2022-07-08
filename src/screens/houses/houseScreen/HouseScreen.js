import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView } from "react-native";
import { db } from "../../../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Loading from "../../../components/Loading";
import Carousel from "../../../components/Shared/carousel/Carousel";
import Header from "../../../components/house/header/Header";
import Info from "../../../components/house/info/Info";
import BtnReviewForm from "../../../components/house/btnReviewForm/BtnReviewForm";
import Reviews from "../../../components/house/reviews/Reviews";
import BtnFavorite from "../../../components/house/btnFavorite/BtnFavorite";
import { styles } from "./HouseScreen.style";

const { width } = Dimensions.get("window");

export default function HouseScreen(props) {
  const { route } = props;
  const [house, setHouse] = useState(null);

  useEffect(() => {
    setHouse(null);
    onSnapshot(doc(db, "houses", route.params.id), (doc) => {
      setHouse(doc.data());
    });
  }, [route.params.id]);

  if (!house) return <Loading show text="Cargando Alojamiento" />;

  return (
    <ScrollView>
      <Carousel arrayImages={house.images} height={250} width={width} />
      <Header house={house} />
      <Info house={house} />
      <BtnReviewForm idHouse={route.params.id} />
      <Reviews idHouse={route.params.id} />
      <BtnFavorite idHouse={route.params.id} />
    </ScrollView>
  );
}
