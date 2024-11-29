import {
  Image,
  StyleSheet,
  Platform,
  Button,
  VirtualizedList,
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
import { useEffect } from "react";
import Separator from "@/components/Separator";

const items = require("@/constants/Items.ts");
const interests = require("@/constants/Interests.ts");
export default function InterestScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme() ?? "light";

  // renvoi vers le point sur la carte
  const linkToMap = (id) => {
    router.push(`/(tabs)/explore`);
  };

  // item de list
  const Item = (item) => (
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

      <TouchableOpacity onPress={() => linkToMap(id)}>
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

  // liste d'items
  const List = ({ categorie }) => {

    if(interests)
    {
      
    }
    const filteredList = interests.filter(
      (interest) =>
        interest.categorie.title.toLowerCase() == categorie.toLowerCase()
    );
    console.log(filteredList)

    return (
      <ScrollView
        contentContainerStyle={[
          styles.listContainer,
          {
            backgroundColor:
              colorScheme == "light"
                ? "#28A046"
                : Colors[colorScheme].background,
          },
        ]}
        horizontal={true}
        style={{
          width: "100%",
          backgroundColor:
            colorScheme == "light" ? "#28A046" : Colors[colorScheme].background,
        }}
      >
        <FlatList
          data={filteredList}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={(item) => item.id}
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
          paddingTop: 32,
          padding: 16,
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
        {items.map((item, i) => {
          return (
            <Collapsible key={i} title={`${item.title}`}>
              <List categorie={item.title} />
            </Collapsible>
          );
        })}
      </ThemedView>

      <Separator/>
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
    paddingHorizontal: 8,
    width: "100%",
    
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
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
