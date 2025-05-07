import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Map } from "@/components/Map";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";

export default function ExploreScreen() {
  /***
   *      ____  _____ ____ _        _    ____  _____
   *     |  _ \| ____/ ___| |      / \  |  _ \| ____|
   *     | | | |  _|| |   | |     / _ \ | |_) |  _|
   *     | |_| | |__| |___| |___ / ___ \|  _ <| |___
   *     |____/|_____\____|_____/_/   \_\_| \_\_____|
   *
   */

  const colorScheme = useColorScheme() ?? "light";
  const [isTutored, setIsTutored] = useState(false);
  const params = useLocalSearchParams();
  const { id } = params;

  /***
   *      _   _                  _____    __    __                 _
   *     | | | |  ___    ___    | ____|  / _|  / _|   ___    ___  | |_
   *     | | | | / __|  / _ \   |  _|   | |_  | |_   / _ \  / __| | __|
   *     | |_| | \__ \ |  __/   | |___  |  _| |  _| |  __/ | (__  | |_
   *      \___/  |___/  \___|   |_____| |_|   |_|    \___|  \___|  \__|
   *
   */

  useEffect(() => {
    if (id) {
      //console.log('il y a un id',id)
      setIsTutored(true);
    }
  });

  /***
 *      _____                          _     _                       
 *     |  ___|  _   _   _ __     ___  | |_  (_)   ___    _ __    ___ 
 *     | |_    | | | | | '_ \   / __| | __| | |  / _ \  | '_ \  / __|
 *     |  _|   | |_| | | | | | | (__  | |_  | | | (_) | | | | | \__ \
 *     |_|      \__,_| |_| |_|  \___|  \__| |_|  \___/  |_| |_| |___/
 *                                                                   
                                                                   
 */

  /***
   *      ____    _                 _
   *     |  _ \  (_)  ___   _ __   | |   __ _   _   _
   *     | | | | | | / __| | '_ \  | |  / _` | | | | |
   *     | |_| | | | \__ \ | |_) | | | | (_| | | |_| |
   *     |____/  |_| |___/ | .__/  |_|  \__,_|  \__, |
   *                       |_|                  |___/
   *
   */

  return (
    <SafeAreaView
      style={{ position: "relative", height: "100%", paddingVertical: 30 }}
    >
      {!isTutored && (
        <View style={styles.tuto}>
          <View
            style={{
              width: "80%",
              padding: 32,
              backgroundColor: "#fff",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Appuyer sur la carte pour ajouter de nouveaux points d'intérêts
            </Text>
            <Image
              style={styles.touchlogo}
              source={require("@/assets/images/doigt.gif")}
              alt="touch"
            />

            <TouchableOpacity
              style={{ width: "50%", padding: 16, backgroundColor: "#27A046" }}
              onPress={() => setIsTutored(true)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Compris ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View>
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
        <Map inView={id} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tuto: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
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
    height: 50,
    width: 50,
  },
  mapTitleContainer: {
    paddingLeft: 16,
    paddingVertical: 8,
  },
});
