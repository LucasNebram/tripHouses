import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) upLoadImage(result.uri);
  };

  const upLoadImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoURL(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoURL = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);
    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });
    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  avatar: {
    marginRight: 30,
    backgroundColor: "green",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
