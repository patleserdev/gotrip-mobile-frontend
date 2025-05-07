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
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "./ThemedText";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import SelectInput from "./SelectInput";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Badge from "@/components/Badge";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { getMarkers, updateMarker } from "@/functions/markers";
import { CategorieInterface, MarkerInterface } from "@/types/markers";
import { getCategories } from "@/functions/categories";

export function Map({ inView = null }: { inView?: string | string[] | null }) {
  /***
   *      ____  _____ ____ _        _    ____  _____
   *     |  _ \| ____/ ___| |      / \  |  _ \| ____|
   *     | | | |  _|| |   | |     / _ \ | |_) |  _|
   *     | |_| | |__| |___| |___ / ___ \|  _ <| |___
   *     |____/|_____\____|_____/_/   \_\_| \_\_____|
   *
   */
  const colorScheme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState(false);

  const [markers, setMarkers] = useState<any>([]);
  const [categories, setCategories] = useState<CategorieInterface[]>([]);
  const [newMarker, setNewMarker] = useState<MarkerInterface>({
    _id: -1,
    title: "",
    categorie: { _id: -1, title: "" },
    latitude: 0,
    longitude: 0,
  });
  const [markerInModal, setMarkerInModal] = useState<number>(0);
  const [mapKey, setMapKey] = useState<any>();
  const [isEditable, setIsEditable] = useState(false);
  const [isFilterable, setIsFilterable] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const isFocused = useIsFocused();
  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);

  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  /***
   *      _____                          _     _
   *     |  ___|  _   _   _ __     ___  | |_  (_)   ___    _ __    ___
   *     | |_    | | | | | '_ \   / __| | __| | |  / _ \  | '_ \  / __|
   *     |  _|   | |_| | | | | | | (__  | |_  | | | (_) | | | | | \__ \
   *     |_|      \__,_| |_| |_|  \___|  \__| |_|  \___/  |_| |_| |___/
   *
   */

  /**
   * Ajouter un point d'intérêt
   */
  const addMarker = () => {
    setErrors([]);
    for (const property in newMarker) {
      const key = property as keyof MarkerInterface;
      if (newMarker[key] == "" || newMarker[key] == 0) {
        setErrors((prev) => [...prev, `Veuillez saisir ${key}`]);
      }
    }

    if (errors.length == 0) {
      setModalVisible(false);
      setMarkers([...markers, { ...newMarker, id: markers.length + 1 }]);
      setNewMarker({
        _id: -1,
        title: "",
        categorie: { _id: -1, title: "" },
        latitude: 0,
        longitude: 0,
      });
      setErrors([]);
    }
  };

  /**
   * Supprimer un point d'intéret
   */
  const destroyNewMarker = () => {
    setNewMarker({
      _id: -1,
      title: "",
      categorie: { _id: -1, title: "" },
      latitude: 0,
      longitude: 0,
    });
    setErrors([]);
  };

  /**
   * Prend en charge la création du nouveau marqueur
   */
  const handleNewMarker = (e: any) => {
    setMarkerInModal(-1);
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setIsEditable(false);
    setNewMarker({
      _id: markers.length,
      title: "",
      categorie: null,
      latitude,
      longitude,
    });
    setModalVisible(true);
  };

  /**
   * Prend en charge l'ouverture du marqueur
   */
  const handleOpenMarker = (id: number) => {
    //console.log("ouvre modal avec id", id);
    setIsEditable(true);
    setModalVisible(true);
    setMarkerInModal(id);
  };

  /**
   * Prend en charge la sélection de la catégorie
   */
  const handleSelected = (value: { _id: number; title: string }) => {
    // console.log(value)
    setNewMarker({ ...newMarker, categorie: value });
  };

  /**
   * Prend en charge la sélection des filtres
   */
  const handleFilter = () => {
    setMarkerInModal(-1);
    setModalVisible(true);
    setIsFilterable(true);
  };

  const toggleSwitch = (id: number) => {
    setSwitchStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFavoriteForMe= async(marker:MarkerInterface) =>{

    if (!marker || typeof marker === 'string') return;

    // 1. Créer une version modifiée du marker
    const updatedMarker = {
      ...marker,
      isFavorite: !marker.isFavorite,
    };

    // 2. Remplacer ce marker dans le tableau
    const updatedMarkers = markers.map((oneMarker:MarkerInterface) =>
      oneMarker._id === updatedMarker._id ? updatedMarker : oneMarker
    );

    // 3. Mettre à jour le state principal
    setMarkers(updatedMarkers);

    // 4. Appeler ta fonction
     // update for me but first update the marker

  /* const response= await updateMarker(updatedMarker)

   if(response)
   {
  console.log(response)
   }
*/
console.log(updateMarker)
  }


  /***
   *      _   _                  _____    __    __                 _
   *     | | | |  ___    ___    | ____|  / _|  / _|   ___    ___  | |_
   *     | | | | / __|  / _ \   |  _|   | |_  | |_   / _ \  / __| | __|
   *     | |_| | \__ \ |  __/   | |___  |  _| |  _| |  __/ | (__  | |_
   *      \___/  |___/  \___|   |_____| |_|   |_|    \___|  \___|  \__|
   *
   */

  useEffect(() => {
    // console.log("mapRef.current:", mapRef.current);
  }, []);

  /**
   * Récupération et state des marqueurs
   */
  useEffect(() => {
    const fetchData = async () => {
      
      const data = await getMarkers();
      if(data)
      {
        setMarkers(data);
      }
      
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchData();
  }, []);

  /**
   * Déplacement lors de la sélection du marqueur
   */
  useEffect(() => {
    if (!inView || !mapReady || !mapRef.current || !markers?.length) return;

    if (inView && mapRef.current && mapReady && markers.length) {
      const selectedMarker = markers.find(
        (marker: MarkerInterface) => marker.id === Number(inView)
      );

      if (selectedMarker) {
        //console.log('Focusing on marker:', selectedMarker);
        mapRef.current.animateToRegion(
          {
            latitude: selectedMarker.latitude,
            longitude: selectedMarker.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000 // Durée de l'animation en millisecondes
        );
      } else {
        // console.warn('Marker not found for ID:', inView);
      }
    }
  }, [inView, mapReady]);

  useEffect(() => {
    if (categories.length > 0) {
      const initialStates = categories.reduce((acc, cat) => {
        acc[cat._id] = true;
        return acc;
      }, {} as { [key: number]: boolean });
      setSwitchStates(initialStates);
    }
  }, [categories]);

  /***
   *      ____    _                 _
   *     |  _ \  (_)  ___   _ __   | |   __ _   _   _
   *     | | | | | | / __| | '_ \  | |  / _` | | | | |
   *     | |_| | | | \__ \ | |_) | | | | (_| | | |_| |
   *     |____/  |_| |___/ | .__/  |_|  \__,_|  \__, |
   *                       |_|                  |___/
   *
   */

  /**
   * Affichage du nouveau marqueur bleu
   */
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

  /**
   * Marqueur à afficher dans le modal
   */
  const displayMarkerInModal =
    markerInModal != null && markers
      ? markers.find((marker: MarkerInterface) =>
          marker._id == markerInModal ? marker : null
        )
      : "";
  // console.log('displayMarkerInModal',displayMarkerInModal)

  /**
   * Affichage du formulaire d'ajout d'un point d'intérêt
   */
  const displayInputs = (
    <KeyboardAvoidingView
      style={styles.inputContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={300}
    >
      <SelectInput
        title={"Choisir la catégorie"}
        items={categories}
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
        ref={mapRef}
        key={mapKey}
        mapType="standard"
        style={styles.map}
        onMapReady={() => setMapReady(true)}
        initialRegion={{
          latitude: 48.862725,
          longitude: 2.287592,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => handleNewMarker(e)}
      >
        {markers &&
          markers.map((marker: any, i: number) => (
            <Marker
              key={i}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.categorie?.title ?? ""}
              onPress={() => handleOpenMarker(marker._id)}
            />
          ))}
        {displayNewMarker}
      </MapView>

      <View style={styles.bottomContainer}>
        {!markers && (
          <View style={{ padding: 10 }}>
            <Text style={{ color: "red", fontWeight: 600 }}>
              Aucun marqueur récupéré
            </Text>
          </View>
        )}
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
          <IconSymbol
            style={styles.mapButton}
            size={16}
            name={"filter-alt"}
            color={"#fff"}
          />
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
            {displayMarkerInModal && !isFilterable && (
              <View style={styles.displayMarkerInModal}>
                <View style={styles.rowTitleZone}>
                  <ThemedText type="subtitle" style={styles.modalText}>
                    {displayMarkerInModal?.title}
                  </ThemedText>
                  <TouchableOpacity onPress={()=>{handleFavoriteForMe(displayMarkerInModal)}}>
                    {displayMarkerInModal &&
                      displayMarkerInModal.isFavorite && (
                        <IconSymbol
                          size={24}
                          name={"favorite"}
                          color={"#000"}
                        />
                      )}

                    {displayMarkerInModal &&
                      !displayMarkerInModal.isFavorite && (
                        <IconSymbol
                          size={24}
                          name={"favorite-border"}
                          color={"#000"}
                        />
                      )}
                  </TouchableOpacity>
                </View>
                <View>
                  <ThemedText style={styles.modalTextCategorie} type="default">
                    {displayMarkerInModal.categorie?.title}
                  </ThemedText>
                </View>

                <View>
                  <ThemedText style={styles.modalText} type="default">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    nibh metus, lobortis non fermentum nec, euismod non ex.
                    Suspendisse sagittis lorem magna, quis porttitor ex
                    consectetur in. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. In convallis arcu leo, quis venenatis enim
                    vulputate quis. Vivamus fringilla enim mauris, eu ultrices.
                  </ThemedText>
                </View>

                {displayMarkerInModal && (
                  <Image
                    source={{ uri: "https://placehold.co/600x400" }}
                    height={200}
                    width={300}
                    style={{ objectFit: "cover", overflow: "hidden" }}
                  />
                )}
              </View>
            )}

            {/* la petite croix qui ferme ! **/}
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

            {/** Ajouter un point d'intérêts **/}
            {!isFilterable && !isEditable && displayInputs}

            {/* Afficher les FILTRES */}
            {isFilterable && (
              <View style={styles.filterContainer}>
                <Text
                  style={{
                    color:
                      colorScheme == "light"
                        ? "green"
                        : Colors[colorScheme].text,
                    fontSize: 16,
                  }}
                >
                  Filtrer les points d'intérêts
                </Text>
                <FlatList
                  style={{ maxHeight: categories.length * 70 }}
                  data={categories}
                  renderItem={({ item }) => (
                    <Badge
                      key={item._id}
                      title={`${item.title}`}
                      bgColor="#27A046"
                      color="#fff"
                      value={!switchStates[item._id]} // par défaut false si pas défini
                      onValueChange={() => toggleSwitch(item._id)}
                    />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                />
              </View>
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
  },
  modalView: {
    width: "80%",
    minHeight: "50%",
    margin: 0,
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
    width: 300,
    minHeight: 500,
    gap: 10,
    paddingBottom: 10,
  },
  rowTitleZone: {
    marginTop: 10,
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTextCategorie: {
    width: "100%",
    textTransform: "capitalize",
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
  modalText: {},
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
