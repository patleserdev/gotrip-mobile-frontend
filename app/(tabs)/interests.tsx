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
} from "react-native";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter} from "expo-router";
const items = require("@/constants/Items.ts");
export default function InterestScreen() {

  const router = useRouter();

  const colorScheme = useColorScheme() ?? "light";

  // renvoi vers le point sur la carte 
  const linkToMap=(id)=>{

    router.push(`/(tabs)/explore`);
  }

  // placeholder items
  const getItem = (_data, index: number) => ({
    id: Math.random().toString(12).substring(0),
    title: `Lieu ${index + 1}`,
  });

  const getItemCount = (_data) => 5;

  // item de list
  const Item = ({ id,title }) => (
    <View style={[styles.item,{backgroundColor:
      colorScheme == "light"
        ? "#28A046"
        : Colors[colorScheme].background,}]}>
      <Text style={[styles.title,{ color: colorScheme == "light" ? "#fff" : Colors[colorScheme].text,}]}>{title}</Text>
      
         
      <TouchableOpacity onPress={()=>linkToMap(id)}>
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
  const List = () => (
    <ScrollView
      contentContainerStyle={[styles.listContainer,{backgroundColor:
        colorScheme == "light"
          ? "#28A046"
          : Colors[colorScheme].background}]}
      horizontal={true}
      style={{ width: "100%",backgroundColor:
        colorScheme == "light"
          ? "#28A046"
          : Colors[colorScheme].background }}
    >
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        style={{backgroundColor:
          colorScheme == "light"
            ? "#28A046"
            : Colors[colorScheme].background,}}
      />
    </ScrollView>
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

      <ThemedView style={[styles.listContainer,{backgroundColor:
                colorScheme == "light"
                  ? "#ffffff"
                  : Colors[colorScheme].background,}]}>
        {items.map((item,i) => {
          return (
            <Collapsible key={i} title={`${item.title}`}>
              <List />
            </Collapsible>
          );
        })}
      </ThemedView>
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
