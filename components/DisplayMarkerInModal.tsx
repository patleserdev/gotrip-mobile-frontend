import { View, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import { MarkerInterface } from "@/types/markers";
import { useState } from "react";

export default function DisplayMarkerInModal({marker}:{marker:MarkerInterface}) 
{
const [markerIn,setMarkerIn]=useState(marker)

    const handleFavoriteForMe = async (marker: MarkerInterface) => {
        if (!marker || typeof marker === "string") return;
    
        // 1. Créer une version modifiée du marker
        const updatedMarker = {
          ...marker,
          isFavorite: !marker.isFavorite,
        };
    
        setMarkerIn(updatedMarker)
        // 2. Remplacer ce marker dans le tableau
        // const updatedMarkers = markers.map((oneMarker: MarkerInterface) =>
        //   oneMarker._id === updatedMarker._id ? updatedMarker : oneMarker
        // );
    
        // 3. Mettre à jour le state principal
        // setMarkers(updatedMarkers);
    
        // 4. Appeler ta fonction
        // update for me but first update the marker
    
        /* const response= await updateMarker(updatedMarker)
    
       if(response)
       {
      console.log(response)
       }
    */
    
      };


  return (
    <View style={styles.displayMarkerInModal}>
      <View style={styles.rowTitleZone}>
        <ThemedText type="subtitle" style={styles.modalText}>
          {markerIn?.title}
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            handleFavoriteForMe(markerIn);
          }}
        >
          { markerIn.isFavorite && (
            <IconSymbol size={24} name={"favorite"} color={"#000"} />
          )}

          {!markerIn.isFavorite && (
            <IconSymbol size={24} name={"favorite-border"} color={"#000"} />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <ThemedText style={styles.modalTextCategorie} type="default">
          {markerIn.categorie?.title ?? "Sans catégorie"}
        </ThemedText>
      </View>

      <View>
        <ThemedText
          style={{
            color: "#000000",
          }}
          type="default"
        >
          {markerIn.description ?? ""}
        </ThemedText>
      </View>

      <View style={{ width: "100%" }}>
        <Image
          source={{ uri: "https://placehold.co/600x400" }}
          contentFit="cover" // remplace resizeMode
          transition={100} // animation fluide
          style={{
            width: "100%",
            height: 250,
            borderRadius: 8,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
  },
  logo: {
    marginHorizontal: "auto",
    marginVertical: 60,
    maxHeight: 100,
    width: 100,
  },
  // map
  mapContainer: {
    height: "97%",
    backgroundColor: "#F5FCFF",
  },
  map: {
    height: "100%",
  },

  mapButton: {},
  listContainer: {
    paddingHorizontal: 32,
  },
  inputContainer: {
    paddingHorizontal: 5,
    minHeight: 300,
    width: "100%",

    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
  },
  buttonsContainer: {
    flex: 0.5,
    height: 50,
    gap: 10,
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 50,
    paddingHorizontal: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    zIndex: 50,
    position: "relative",
  },
  displayMarkerInModal: {
    alignItems: "flex-start",
    width: "100%",
    minHeight: 500,
    gap: 10,
    paddingBottom: 10,
  },
  rowTitleZone: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTextCategorie: {
    width: "100%",
    textTransform: "capitalize",
    color: "#000000",
  },
  button: {
    borderRadius: 100,
    padding: 5,
    elevation: 2,
    zIndex: 50,
    position: "absolute",
    top: 0,
    right: 0,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#27A046",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: { color: "#000000" },
  errors: {
    color: "red",
    fontSize: 12,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 8,
    right: 80,
    minHeight: "10%",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 10,
  },
  filterContainer: {
    gap: 10,
  },
});
