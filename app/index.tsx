import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  const [componentLoaded, setComponentLoaded] = useState("welcome");

  const handleConnect = () => {
    router.replace("/(tabs)/explore");
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          source={require("@/assets/images/gotrip-logo.jpg")}
          style={styles.logo}
        />
      </View>
      <ThemedView
        style={[
          styles.titleContainer,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >

        {componentLoaded == 'welcome' && <ThemedText type="title">Bienvenue !</ThemedText>}
        {componentLoaded == 'signin' && <ThemedText type="title">Connexion</ThemedText>}
        {componentLoaded == 'signup' && <ThemedText type="title">Inscription</ThemedText>}
      </ThemedView>

      {componentLoaded == "welcome" && (
        <ThemedView style={styles.welcomeContainer}>
          <ThemedText type="subtitle" >
            GOTrip vous permet d'enregistrer vos points d'intérêts sur une
            carte.
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
      )}

      {componentLoaded == "welcome" && (
        <ThemedView style={styles.groupbuttonContainer}>

<ThemedView style={styles.buttonContainer}>
            <Button
              color="#28A046"
              onPress={() => router.push("/(tabs)/explore")}
              title="Connexion rapide"
            />
          </ThemedView>

          <ThemedView style={styles.buttonContainer}>
            <Button
              color="#28A046"
              onPress={() => setComponentLoaded("signin")}
              title="Connexion"
            />
          </ThemedView>
          <ThemedView style={styles.buttonContainer}>
            <Button
              color="#008BC5"
              title="Inscription"
              onPress={() => setComponentLoaded("signup")}
            />
          </ThemedView>

        </ThemedView>
      )}

      {componentLoaded == "signin" && (
        <View style={styles.borderedContainer}>
        <ThemedView style={styles.groupbuttonContainer}>
          <ThemedView style={styles.buttonContainer}>
            <ThemedText>Nom d'utilisateur ou email</ThemedText>
            <TextInput
              keyboardType="default"
              style={{ borderWidth: 1, borderColor: "lightgrey" }}
            />

            <ThemedText>Mot de passe</ThemedText>
            <TextInput
              secureTextEntry={true}
              style={{ borderWidth: 1, borderColor: "lightgrey" }}
            />

<View style={{marginVertical:20}}>
            <Button
              color="#28A046"
              onPress={() => handleConnect()}
              title="Se connecter"
            />
            </View>
          </ThemedView>

          <ThemedText>
            <Link href="/forgotpassword">Mot de passe oublié ?</Link>
          </ThemedText>
        </ThemedView>
        </View>
      )}

      {componentLoaded == "signup" && (
        <View style={styles.borderedContainer}>
            <ThemedView style={styles.groupbuttonContainer}>
            <ThemedView style={styles.buttonContainer}>
            <ThemedText>Adresse mail</ThemedText>
              <TextInput
                keyboardType="email-address"
                style={{ borderWidth: 1, borderColor: "lightgrey" }}
              />

              <ThemedText>Nom d'utilisateur</ThemedText>
              <TextInput
                keyboardType="default"
                style={{ borderWidth: 1, borderColor: "lightgrey" }}
              />
  
              <ThemedText>Mot de passe</ThemedText>
              <TextInput
                secureTextEntry={true}
                style={{ borderWidth: 1, borderColor: "lightgrey" }}
              />
  
            <View style={{marginVertical:20}}>
            <Button
              
              color="#28A046"
              onPress={() => handleConnect()}
              title="S'inscrire"
            />
            </View>
         
            </ThemedView>
  
          </ThemedView>
          </View>
      )}

      {componentLoaded != "welcome" && (
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => setComponentLoaded("welcome")}>
            <IconSymbol
              title="Retour"
              size={40}
              name={"arrow-circle-left"}
              color={
                colorScheme == "light" ? "#28A046" : Colors[colorScheme].text
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '20%',
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
  },
  borderedContainer:{
    borderWidth:1,
    borderColor:'#28A046',
    borderRadius:50,
    margin:20
  },
  welcomeContainer: {
    paddingHorizontal: 32,
    gap: 4,
    marginBottom: 4,
    paddingBottom: 32,
  },
  backContainer: {
    paddingHorizontal: 16,
  },
  groupbuttonContainer: {
    paddingHorizontal: 32,
    paddingVertical: '5%',
    gap: 4,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    gap: 4,
    marginBottom: 5,
  },

  logo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    objectFit:'cover'
  },
});
