import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Map } from "@/components/Map";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function ExploreScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const [isTutored, setIsTutored] = useState(false);

  return (
    <View style={{position:'relative',height:'100%'}}>
      {!isTutored && (
        <View style={styles.tuto}>
          <View style={{ width: "80%",padding:32, backgroundColor:"#fff",flexDirection:'column',alignItems:"center",justifyContent:"space-around" }}>
            <Text style={{fontSize:16,textAlign:'center'}}>Appuyer sur la carte pour ajouter de nouveaux points d'intérêts</Text>
            <Image
              style={styles.touchlogo}
              source={require("@/assets/images/doigt.gif")}
              alt="touch"
            />
           
            

            <TouchableOpacity style={{width:'50%',padding:16,backgroundColor:'#27A046'}} onPress={() => setIsTutored(true)}>
              <Text style={{textAlign:'center',color:"#fff",fontSize:16,fontWeight:'500'}}>Compris ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
            {
              backgroundColor:
                colorScheme == "light"
                  ? "#28A046"
                  : Colors[colorScheme].background,
            },
          ]}
        >
          <Text
            style={{
              color: colorScheme == "light" ? "#fff" : Colors[colorScheme].text,
              fontSize: 16,
            }}
          >
            Sélectionnez vos points d'intérêts
          </Text>
        </View>
        <Map />
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tuto: {
    height:'100%',
    width:'100%',
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.5)',
    position:'absolute',
    top:0,
    left:0,
    zIndex:5
  },
  touchlogo: {
    width: 100,
    height: 100,
    marginHorizontal: "auto",
  },
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
});
