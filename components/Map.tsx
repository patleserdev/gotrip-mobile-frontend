import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import SelectInput from "./SelectInput";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Badge from "@/components/Badge";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
const items = require("@/constants/Items.ts");
const interests = require("@/constants/Interests.ts");

export function Map() {
  const colorScheme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(false);

  const [markers, setMarkers] = useState<any>([]);
  const [newMarker, setNewMarker] = useState({
    title: "",
    categorie: {title:""},
    latitude: 0,
    longitude: 0,
  });
  const [markerInModal, setMarkerInModal] = useState(null);
  const [mapKey, setMapKey] = useState<any>();
  const [isEditable, setIsEditable] = useState(false);
  const [isFilterable, setIsFilterable] = useState(false);
  const [errors, setErrors] = useState([]);
  const isFocused = useIsFocused();

  // console.log('markers',markers)
  useEffect(() => {
    if (isFocused) {
      setMapKey(Date.now());
    }
  }, []);

  useEffect(()=>{

    setMarkers(interests);

  },[])

  const addMarker = () => {
    setErrors([]);
    for (const property in newMarker) {
      if (newMarker[property] == "" || newMarker[property] == 0) {
        setErrors((prev) => [...prev, `Veuillez saisir ${property}`]);
      }
    }

    if (errors.length == 0) 
      {
      setModalVisible(false);
      setMarkers([...markers, { ...newMarker, id: markers.length }]);
      setNewMarker({ title: "", categorie: {title:""}, latitude: 0, longitude: 0 });
      setErrors([]);
    }
  };


  const destroyNewMarker = () => {
    setNewMarker({ title: "", categorie: {title:""}, latitude: 0, longitude: 0 });
    setErrors([]);
  };

  const handleNewMarker = (e: any) => {
    // console.log(e);
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setIsEditable(false);
    setNewMarker({ title: "", categorie: "", latitude, longitude });
    setModalVisible(true);
  };

  const handleOpenMarker = (id: number) => {
    setIsEditable(true);
    setModalVisible(true);
    setMarkerInModal(id);
  };

  const handleSelected = (value) => {
    // console.log(value)
    setNewMarker({ ...newMarker, categorie: value });
  };

  const handleFilter = () => {
    setModalVisible(true);
    setIsFilterable(true);
  };

  const displayNewMarker = [];
  if (newMarker) {
    displayNewMarker.push(
      <Marker
        key={newMarker.latitude}
        pinColor="#2296F3"
        coordinate={{
          latitude: newMarker.latitude,
          longitude: newMarker.longitude,
        }}
      />
    );
  }
console.log('markerInModal',markerInModal)

  const displayMarkerInModal =
    markerInModal != null ? markers.find((marker)=>  marker.id == markerInModal ? marker : null ) : "";
console.log('displayMarkerInModal',displayMarkerInModal)

  const displayInputs = (
    <KeyboardAvoidingView
      style={styles.inputContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={300}
    >
      <SelectInput
        title={"Choisir la catégorie"}
        items={items}
        selected={handleSelected}
      />
      <Text>Nom du point d'intérêt</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom du point"
        keyboardType="default"
        onChangeText={(text) => setNewMarker({ ...newMarker, title: text })}
        value={newMarker.title}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title="Ajouter un point d'intérêt"
          onPress={addMarker}
          disabled={newMarker.title ? false : true}
          color="#27A046"
        />
        <Button
          title="Annuler le point"
          onPress={() => {
            destroyNewMarker();
            setModalVisible(false);
          }}
          disabled={
            newMarker.latitude || newMarker.longitude || newMarker.title
              ? false
              : true
          }
          color="#e36259"
        />
      </View>
      <View>
        {!isEditable &&
          errors &&
          errors.map((error, i) => (
            <Text key={i} style={styles.errors}>
              {error}
            </Text>
          ))}
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.mapContainer}>
      <MapView
        key={mapKey}
        mapType="standard"
        style={styles.map}
        initialRegion={{
          latitude: 48.862725,
          longitude: 2.287592,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => handleNewMarker(e)}
      >
        {markers.map((marker: any,i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleOpenMarker(marker.id)}
          />
        ))}
        {displayNewMarker}
      </MapView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor:
              colorScheme == "light"
                ? "#28A046"
                : Colors[colorScheme].background,
          }}
          onPress={() => {
            handleFilter();
          }}
        >
          <Text
            style={{
              color: colorScheme == "light" ? "#fff" : Colors[colorScheme].text,
              fontSize: 16,
            }}
          >
            Filtrer les points d'intérêts
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          destroyNewMarker();
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{displayMarkerInModal.title}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                destroyNewMarker();
                setIsEditable(false);
                setIsFilterable(false);
              }}
            >
              <IconSymbol
                style={styles.mapButton}
                size={18}
                name={"close"}
                color={"#fff"}
              />
            </TouchableOpacity>

            {!isFilterable && !isEditable && displayInputs}

            {/* FILTRES */}
            {isFilterable && (
              <ScrollView style={styles.filterContainer}>
                {items.map((item, i) => {
                  return (
                    <Badge
                      key={i}
                      title={`${item.title}`}
                      bgColor="#27A046"
                      color="#fff"
                    />
                  );
                })}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    height: 500,
    margin: 0,
    backgroundColor: "#F5FCFF",
  },
  map: {
    height: 500,
  },

  mapButton: {},
  listContainer: {
    paddingHorizontal: 32,
  },
  inputContainer: {
    paddingHorizontal: 5,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-around",
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
    justifyContent: "space-around",
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    minWidth: "80%",
    minHeight: "50%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    zIndex: 50,
    position: "relative",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  errors: {
    color: "red",
    fontSize: 12,
  },
  bottomContainer: {
    minHeight: "20%",
    borderTopWidth: 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    flex: 1,
    
  },
});
