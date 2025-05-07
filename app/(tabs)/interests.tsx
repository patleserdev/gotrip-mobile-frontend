import {
  Image,
  StyleSheet,
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import Separator from "@/components/Separator";
import { getMarkers } from "@/functions/markers";
import { useEffect, useState } from "react";
import { getCategories } from "@/functions/categories";
import { MarkerInterface,CategorieInterface } from "@/types/markers";
//const items = require("@/constants/Items.ts");
//const interests = require("@/constants/Interests.ts");

export default function InterestScreen() {
  /***
   *      ____  _____ ____ _        _    ____  _____
   *     |  _ \| ____/ ___| |      / \  |  _ \| ____|
   *     | | | |  _|| |   | |     / _ \ | |_) |  _|
   *     | |_| | |__| |___| |___ / ___ \|  _ <| |___
   *     |____/|_____\____|_____/_/   \_\_| \_\_____|
   *
   */

  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const [markers,setMarkers]=useState<MarkerInterface[]>([])
  const [categories,setCategories]=useState<CategorieInterface[]>([])

  /***
 *      _____                          _     _                       
 *     |  ___|  _   _   _ __     ___  | |_  (_)   ___    _ __    ___ 
 *     | |_    | | | | | '_ \   / __| | __| | |  / _ \  | '_ \  / __|
 *     |  _|   | |_| | | | | | | (__  | |_  | | | (_) | | | | | \__ \
 *     |_|      \__,_| |_| |_|  \___|  \__| |_|  \___/  |_| |_| |___/
 *                                                                   
                                                                   
 */

  // renvoi vers le point sur la carte
  const linkToMap = (id: number) => {
    router.push({ pathname: `/(tabs)/explore`, params: { id: id } });
  };

  /***
   *      _   _                  _____    __    __                 _
   *     | | | |  ___    ___    | ____|  / _|  / _|   ___    ___  | |_
   *     | | | | / __|  / _ \   |  _|   | |_  | |_   / _ \  / __| | __|
   *     | |_| | \__ \ |  __/   | |___  |  _| |  _| |  __/ | (__  | |_
   *      \___/  |___/  \___|   |_____| |_|   |_|    \___|  \___|  \__|
   *
   */

    /**
   * Récupération et state des marqueurs
   */
    useEffect(() => {
      const fetchData = async () => {
        const data = await getMarkers();
        setMarkers(data);
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      // console.log("mapRef.current:", mapRef.current);
    }, []);
  
    /**
     * Récupération et state des marqueurs
     */
    useEffect(() => {
      const fetchData = async () => {
        const data = await getCategories();
        setCategories(data);
      };
  
      fetchData();
    }, []);

  /***
   *      ____    _                 _
   *     |  _ \  (_)  ___   _ __   | |   __ _   _   _
   *     | | | | | | / __| | '_ \  | |  / _` | | | | |
   *     | |_| | | | \__ \ | |_) | | | | (_| | | |_| |
   *     |____/  |_| |___/ | .__/  |_|  \__,_|  \__, |
   *                       |_|                  |___/
   *
   */

  // item de list
  const Item = (item : CategorieInterface) => (
    <View
      style={[
        styles.item,
        {
          backgroundColor:
            colorScheme == "light" ? "#28A046" : Colors[colorScheme].background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colorScheme == "light" ? "#fff" : Colors[colorScheme].text },
        ]}
      >
        {item.title}
      </Text>

      <TouchableOpacity onPress={() => linkToMap(item._id)}>
        <IconSymbol
          title="Localiser"
          size={24}
          name={"place"}
          color={colorScheme == "light" ? "#fff" : Colors[colorScheme].text}
        />
      </TouchableOpacity>
      <Button color={"#28A046"} title="Détails" />
    </View>
  );

  type ListProps = {
    categorie: string;
  };
  // liste d'items
  const List = ({ categorie  }: ListProps ) => {

    const filteredList = markers.filter(
      (marker) =>
        marker.categorie?.title?.toLowerCase() == categorie.toLowerCase()
    );

    return (
      <ScrollView
        contentContainerStyle={[
          styles.listContainer
        ]}
        horizontal={true}
        style={{
          
          width: "100%",
         
        }}
      >
        <FlatList
          data={filteredList}
          renderItem={({ item }) => <Item key={item._id} {...item} />}
          keyExtractor={(item) => item._id.toString()}
        />
      </ScrollView>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f0f0f0", dark: "#000000" }}
      headerImage={
        <Image
          source={require("@/assets/images/gotrip-logo-rounded.png")}
          style={styles.logo}
        />
      }
    >
      <ThemedView
        style={{
          backgroundColor: Colors[colorScheme].background,
          flexDirection: "row",
          gap: 8,

          paddingHorizontal: 32,
          marginBottom: 20,
        }}
      >
        <ThemedText type="title" style={{ color: Colors[colorScheme].text }}>
          Voir les points d'intérêts
        </ThemedText>
      </ThemedView>

      <ThemedView
        style={[
          styles.listContainer,
          {
            backgroundColor:
              colorScheme == "light"
                ? "#f0f0f0"
                : Colors[colorScheme].background,
          },
        ]}
      >
        {categories && categories?.map((categorie, i) => {
            if (!categorie.title) return null; // 👈 skip si title est vide
          return (
            <Collapsible key={categorie._id} title={`${categorie.title}`}>
              <List categorie={categorie.title} />
            </Collapsible>
          );
        })}
        {categories.length == 0  && <View><Text>Aucune catégorie</Text></View>}

      </ThemedView>

      <Separator />
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
    paddingHorizontal: 32,
  },
  logo: {
    marginHorizontal: "auto",
    marginVertical: "auto",
    height: 100,
    width: 100,
  },
  titleAndCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 5,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical:10,
    paddingHorizontal:10,
    marginBottom:5,

  },
  title: {
    width: "50%",
  },
  profileContainer: {
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonContainer: {
    gap: 8,
    marginBottom: 20,
  },
  groupbuttonContainer: {
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
