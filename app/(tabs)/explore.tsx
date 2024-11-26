import {
  StyleSheet,
  Image,
} from "react-native";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Map } from "@/components/Map"
export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#ffffff", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/gotrip-logo-rounded.png")}
          style={styles.logo}
        />
      }
    >
      <Map/>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Voir les points d'intérêts</ThemedText>
      </ThemedView>

      <ThemedView style={styles.listContainer}>
        <Collapsible title="Historique">
          <ThemedText>ici une liste des points historique</ThemedText>
        </Collapsible>

        <Collapsible title="Parcs et Zoos">
          <ThemedText>ici une liste des points historique</ThemedText>
        </Collapsible>

        <Collapsible title="Musées">
          <ThemedText>ici une liste des points historique</ThemedText>
        </Collapsible>

        <Collapsible title="Grands espaces">
          <ThemedText>ici une liste des points historique</ThemedText>
        </Collapsible>

        <Collapsible title="Points de départ de rando">
          <ThemedText>ici une liste des points historique</ThemedText>
        </Collapsible>

        <Collapsible title="Animations">
          <ThemedText>ici une liste des points historique</ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
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
    height: 750,
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
