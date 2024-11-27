import {
  Image,
  StyleSheet,
  Platform,
  Button,
  VirtualizedList,
  View,
  Text,
  ScrollView,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
export default function InterestScreen() {

  const colorScheme = useColorScheme();

  
  const getItem = (_data, index: number) => ({
    id: Math.random().toString(12).substring(0),
    title: `Lieu ${index + 1}`,
  });

  const getItemCount = (_data) => 50;

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Button title="supprimer" />
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f0f0f0", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/gotrip-logo-rounded.png")}
          style={styles.logo}
        />
      }
    >
      
      <ThemedView style={styles.listContainer}>
        <ThemedText type="subtitle">Mes points d'intérêts</ThemedText>

        <ScrollView
          contentContainerStyle={styles.listContainer}
          horizontal={true}
          style={{ width: "100%" }}
        >
          <VirtualizedList
            initialNumToRender={4}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={(item) => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        </ScrollView>
      </ThemedView>

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
    paddingHorizontal:32,
    backgroundColor:"#f0f0f0"
  },
  logo: {
    marginHorizontal: "auto",
    marginVertical:"auto",
    height: 100,
    width: 100,
  },
  titleAndCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    backgroundColor:"#f0f0f0"
    
  },
  listContainer: {
    paddingHorizontal:32,
    width: "100%",
    backgroundColor:"#f0f0f0"
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
    paddingVertical:16,
    paddingHorizontal:32,
    backgroundColor:"#f0f0f0"
  },
  buttonContainer: {
    gap: 8,
    marginBottom: 20,
  },
  groupbuttonContainer: {
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal:32,
    backgroundColor:"#f0f0f0"
  },
});
