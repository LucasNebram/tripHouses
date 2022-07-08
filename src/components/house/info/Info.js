import React from "react";
import { View, Text } from "react-native";
import { Icon, ListItem } from "@rneui/themed";
import { map } from "lodash";
import Map from "../../Shared/map/Map";
import { styles } from "./Info.styles";

export default function Infor(props) {
  const { house } = props;

  const listInfo = [
    {
      text: house.address,
      iconType: "material-community",
      inconName: "map-marker",
    },
    {
      text: house.phone,
      iconType: "material-community",
      inconName: "phone",
    },
    {
      text: house.email,
      iconType: "material-community",
      inconName: "at",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Informacion sobre el Alojamiento</Text>
      <Map location={house.location} name={house.name} />
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.inconName} color='#00a680' />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
