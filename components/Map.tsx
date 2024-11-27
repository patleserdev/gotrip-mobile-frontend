import { StyleSheet, View, Button, TextInput,Text,TouchableOpacity,Modal,Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import SelectInput from "./SelectInput";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export function Map() {
  const colorScheme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(false);

  const [markers, setMarkers] = useState<any>([]);
  const [newMarker, setNewMarker] = useState({ latitude: 0, longitude: 0 });
  const [mapKey, setMapKey] = useState<any>();
  const isFocused = useIsFocused();

  const items = [
    {title: 'Site pitorresque'},
    {title: 'Monument historique'},
    {title: 'Coin de liberté'},
    {title: 'Point de baignade'},
    {title: 'Parc de loisirs'},
    {title: 'Spot de randonnée'},
    {title: 'Commerce à ne pas manquer'},

  ];

  useEffect(() => {
    if (isFocused) {
      setMapKey(Date.now());
    }
  }, []);

  const addMarker = () => {
    setMarkers([...markers, { ...newMarker, id: markers.length }]);
  };

  const handleNewMarker = (e: any) => {
    
    console.log(e);
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setNewMarker({ latitude, longitude });
  };

  const handleOpenMarker = ()=>{
    setModalVisible(true)
  }


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
        {markers.map((marker: any) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={()=>handleOpenMarker(marker.id)}
          />
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <View style={styles.mapButtonsContainer}>
  <TouchableOpacity>
    <Text>
      <IconSymbol
        style={styles.mapButton}
        size={40}
        name={"zoomOut"}
        color={"#000"}
      />
    </Text>
  </TouchableOpacity>
  <TouchableOpacity>
    <Text>
      {" "}
      <IconSymbol
        style={styles.mapButton}
        size={40}
        name={"zoomIn"}
        color={"#000"}
      />
    </Text>
  </TouchableOpacity>
  <TouchableOpacity>
    <Text>
      <IconSymbol
        style={styles.mapButton}
        size={40}
        name={"addLocation"}
        color={"#000"}
      />
    </Text>
  </TouchableOpacity>
  <TouchableOpacity>
    <Text>
      <IconSymbol
        style={styles.mapButton}
        size={40}
        name={"myLocation"}
        color={"#000"}
      />
    </Text>
  </TouchableOpacity>
</View> */}
      <View style={styles.inputContainer}>
        <SelectInput title={"Choisir la catégorie"} items={items}/>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="numeric"
          onChangeText={(text) =>
            setNewMarker({ ...newMarker, latitude: parseFloat(text) || 0 })
          }
          value={newMarker.latitude.toString()}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          keyboardType="numeric"
          onChangeText={(text) =>
            setNewMarker({ ...newMarker, longitude: parseFloat(text) || 0 })
          }
          value={newMarker.longitude.toString()}
        />
        <Button title="Ajouter un point d'intérêt" onPress={addMarker} />
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
    height: 100,
    width: 100,
  },
  mapContainer: {
    margin: 0,
    backgroundColor: "#F5FCFF",
    
    position: "relative",
  },
  map: {
    height: 450,
  },
  mapButtonsContainer: {
    position: "absolute",
    bottom: 180,
    right: 0,
    zIndex: 5,
    flex: 1,
    flexDirection: "column",
    margin: 5,
  },
  mapButton: {},
  listContainer: {
    paddingHorizontal: 32,
  },
  inputContainer: {
    paddingHorizontal: 5,
    backgroundColor: "white",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomWidth: 2,
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth:2,
    zIndex:50
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderWidth:2,
    zIndex:50
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
