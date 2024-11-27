import { StyleSheet, Image, View, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Map } from "@/components/Map";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f0f0f0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/gotrip-logo-rounded.png")}
          style={styles.logo}
        />
      }
    >
      <View
        style={[
          styles.mapTitleContainer,
          { backgroundColor: colorScheme == 'light' ? '#28A046' : Colors[colorScheme].background },
        ]}
      >
        <Text style={{ color: colorScheme == 'light' ? '#fff' : Colors[colorScheme].text ,fontSize:16}}>
          Sélectionnez vos points d'intérêts
        </Text>
      </View>
      <Map />

   
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    paddingTop: 32,
    padding: 16,
  },
  logo: {
    marginHorizontal: "auto",
    marginVertical: "auto",
    height: 100,
    width: 100,
  },
  mapTitleContainer: {
    paddingLeft: 16,
    paddingVertical: 8,
  },
  mapContainer: {
    margin: 0,

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

    paddingBottom: 48,
  },
  inputContainer: {
    paddingHorizontal: 5,
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
