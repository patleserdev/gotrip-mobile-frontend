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
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ProfileScreen() {
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
      headerBackgroundColor={{ light: "#ffffff", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/gotrip-logo-rounded.png")}
          style={styles.logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Votre profil</ThemedText>
      </ThemedView>

      <ThemedView style={styles.profileContainer}>
        <ThemedText type="subtitle">Mes coordonnées personnelles</ThemedText>
        <ThemedText type="defaultSemiBold">Nom :</ThemedText>

        <ThemedText type="defaultSemiBold">Prénom :</ThemedText>

        <ThemedText type="defaultSemiBold">Adresse mail :</ThemedText>

        <ThemedText type="defaultSemiBold">
          Modifier mon mot de passe :
        </ThemedText>

        <ThemedText type="subtitle">Mes préférences</ThemedText>

        <ThemedView style={styles.titleAndCheckRow}>
          <ThemedText type="defaultSemiBold" style={{ width: "70%" }}>
            Recevoir la newsletter
          </ThemedText>
          <BouncyCheckbox onPress={(isChecked: boolean) => {}} />
        </ThemedView>

        <ThemedText>
          (contient des suggestions de points d'intérêts) :
        </ThemedText>
      </ThemedView>

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

      <ThemedView style={styles.groupbuttonContainer}>
        <ThemedText>
          Saisissez votre mot de passe pour valider les modifications
        </ThemedText>
        <ThemedView style={styles.buttonContainer}>
          <Button color="#28A046" title="Valider" />
        </ThemedView>
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
    paddingHorizontal:32
  },
  logo: {
    marginHorizontal: "auto",
    marginVertical: 60,
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
    paddingHorizontal:32,
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
    marginBottom: 8,
    paddingHorizontal:32
  },
  buttonContainer: {
    gap: 8,
    marginBottom: 20,
  },
  groupbuttonContainer: {
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal:32
  },
});