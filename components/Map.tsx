import {
  StyleSheet,
  View,
  Button,

  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import React from "react";
import { useIsFocused } from "@react-navigation/native";

export function Map() {
  const [markers, setMarkers] = useState<any>([]);
  const [newMarker, setNewMarker] = useState({ latitude: 0, longitude: 0 });
  const[mapKey,setMapKey]=useState<any>()
  const isFocused = useIsFocused();

  useEffect(()=>{

    if(isFocused)
    {
        setMapKey(Date.now())
    }
  },[])

  const addMarker = () => {
    setMarkers([...markers, { ...newMarker, id: markers.length }]);
  };

  const handleNewMarker = (e: any) => {
    console.log("déclenché");
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setNewMarker({ latitude, longitude });
  };
  console.log(markers);

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
        onPress={(e) => 
          handleNewMarker(e)
        }
      >
        {markers.map((marker:any) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
      </MapView>

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
        <Button title="Ajouter un marqueur" onPress={addMarker} />
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
    height: 600,
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
});
