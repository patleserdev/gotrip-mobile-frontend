import {
  CameraView,
  Camera,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";

export default function ExpoCamera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); // Type explicite
  const cameraRef = useRef<typeof Camera | null>(null);

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri); // Sauvegarde l'URI de la photo prise
    }
  };

  const handleToSave= async () => {
    // Sauvegarder l'image, la lier à l'id du point 
    // la mettre en mode "à modérer en attendant que l'admin la valide"
  };

  return (
    <View style={styles.container}>
      {!photo && (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              {facing == "back" ? (
                <MaterialIcons
                  name="video-camera-front"
                  size={30}
                  color="white"
                />
              ) : (
                <MaterialIcons
                  name="video-camera-back"
                  size={30}
                  color="white"
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.circleTakePhoto}
            onPress={() => handleTakePhoto()}
          ></TouchableOpacity>

          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
          ></CameraView>
        </>
      )}

      {photo && (
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: photo }}
            alt="takeAPhoto"
            contentFit="scale-down"
            style={{ width: 300, height: 400 }}
          />
          <View style={styles.buttonsPhotoContainer}>
            <TouchableOpacity
              style={[styles.buttonsPhoto, { backgroundColor: "green" }]}
              onPress={()=>handleToSave()}
            >
              <Text style={{ color: "#fff" }}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonsPhoto, { borderColor: "green" }]}
              onPress={()=>setPhoto(null)}
            >
              <Text>Reprendre la photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
  },
  photoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonsPhotoContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: "98%",
  },
  buttonContainer: {
    position: "absolute",
    zIndex: 10,
    elevation: 10,
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  circleTakePhoto: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: 100,
    width: 100,
    borderColor: "white",
    shadowRadius: 10,
    borderRadius: 100,
    borderWidth: 10,
    opacity: 0.5,
    zIndex: 10,
    elevation: 10,
  },
  buttonsPhoto: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
