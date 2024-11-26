import { Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter, useFocusEffect } from "expo-router";
import { Link } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleConnect = () => {
    router.replace("/(tabs)/explore");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/gotrip-logo.jpg")}
          style={styles.logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenue !</ThemedText>
      </ThemedView>

      <ThemedView style={styles.welcomeContainer}>
        <ThemedText type="subtitle">
          GOTrip vous permet d'enregistrer vos points d'intérêts sur une carte.
        </ThemedText>
        <ThemedText>
          Vous pouvez y ajouter des
          <ThemedText type="defaultSemiBold"> photos </ThemedText> ou
          <ThemedText type="defaultSemiBold"> vidéos </ThemedText>
          prises pendant ou après la visite du lieu.
        </ThemedText>

        <ThemedText>
          Vous pouvez également déposer un{" "}
          <ThemedText type="defaultSemiBold"> commentaire </ThemedText>{" "}
          concernant les lieux d'intérêts des autres membres.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.groupbuttonContainer}>
        <ThemedView style={styles.buttonContainer}>
          <Button
            color="#28A046"
            onPress={() => handleConnect()}
            title="Se connecter"
          />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <Button color="#008BC5" title="S'inscrire" />
        </ThemedView>
        <ThemedText>
          <Link href="/forgotpassword">Mot de passe oublié ?</Link>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  welcomeContainer: {
    paddingHorizontal: 32,
    gap: 8,
    marginBottom: 8,
    paddingBottom:32
  },
  buttonContainer: {
    paddingHorizontal: 32,
    gap: 8,
    marginBottom: 20,
  },
  groupbuttonContainer: {
    paddingHorizontal: 32,
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  logo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
