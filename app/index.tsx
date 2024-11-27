import { Image, StyleSheet, Platform, Button ,View} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter} from "expo-router";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  const handleConnect = () => {
    router.replace("/(tabs)/explore");
  };

  return (
    <>
    <View style={styles.headerContainer}>
      
        <Image
          source={require("@/assets/images/gotrip-logo.jpg")}
          style={styles.logo}/>
        
      
    
    </View>
      <ThemedView style={[styles.titleContainer,{ backgroundColor:  Colors[colorScheme].background }]}>
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
 </>
  );
}

const styles = StyleSheet.create({
  headerContainer:
  {
    height:250
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom:16
   
  },
  welcomeContainer: {
    paddingHorizontal: 32,
    gap: 8,
    marginBottom: 8,
    paddingBottom:32,
    
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
