import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { AirbnbRating, ListItem, Avatar } from "@rneui/themed";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { create, map } from "lodash";

import { db } from "../../../utils/firebase";
import Loading from "../../Loading";
import { styles } from "./Reviews.styles";

export default function Reviews(props) {
  const { idHouse } = props;
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "reviews"), where("idHouse", "==", idHouse));

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, []);

  if (!reviews) return <Loading show text="Cargando" />;

  return (
    <View style={styles.content}>
      {map(reviews, (review) => {
        const data = review.data();
        const createReview = new Date(data.createdAt.seconds * 1000);

        return (
          <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatar }} size={60} rounded={true} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{data.comment}</Text>
                <View style={styles.contentRatingDate}>
                  <AirbnbRating
                    showRating={false}
                    defaultRating={data.rating}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.starContainer}
                  />
                  <Text style={styles.date}>
                    {createReview.getDate()}/{createReview.getMonth() + 1}/
                    {createReview.getFullYear()}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
