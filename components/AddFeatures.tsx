import { TouchableOpacity } from "react-native";
import {
  launchCamera,
  CameraOptions,
  CameraType,
} from "react-native-image-picker";
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from "react-native-image-picker";
import { ThemedText } from "./ThemedText";
import ExpoCamera from "./CameraExpo";

export default function AddFeatures() {
 
  

  return (
    <>
      {/* <TouchableOpacity onPress={() => handleCamera()}>
        <ThemedText style={{ color: "#000000" }}>Prendre une photo</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleGallery()}>
        <ThemedText style={{ color: "#000000" }}>
          Ajouter une photo de la galerie
        </ThemedText>
      </TouchableOpacity> */}

      <ExpoCamera />
    </>
  );
}
