import { StyleSheet, Image, View, Text,Button } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Map } from "@/components/Map";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import Badge from "@/components/Badge";
const items = require("@/constants/Items.ts")
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
      <View style={styles.bottomContainer}>
        {items.map((item)=>{
          return(
            <Badge title={`${item.title}`} bgColor='#30d15c' color='#fff'/> 
          )
       
        })}
        
        
        
      </View>

   
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
  bottomContainer:
  {
    minHeight:'25%',
    borderTopWidth:2,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    flexWrap:'wrap',
    padding:5
  }
});
