import {
  Image,
  StyleSheet,
  Button,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { addUser, connectUser } from "@/functions/users";
import { setToken } from "@/functions/token";


const apiUrl = process.env.EXPO_PUBLIC_API_BACKEND ?? '';

const formFields = [
  {
    context: ["signup"],
    name: "email",
    label: "Adresse mail",
    type: "email-address" as KeyboardTypeOptions,
    comments: "",
  },
  {
    context: ["signup"],
    name: "username",
    label: "Nom d'utilisateur",
    type: "default" as KeyboardTypeOptions,
  },
  {
    context: ["signin"],
    name: "username",
    label: "Nom d'utilisateur ou adresse mail",
    type: "default" as KeyboardTypeOptions,
  },
  {
    context: ["signin", "signup"],
    name: "password",
    label: "Mot de passe",
    type: "default" as KeyboardTypeOptions,
    secure: true,
    comments: `8 caractères, une majuscule, une minuscule, un caractère spécial.`,
  },
];

// Définition d'un type pour les valeurs du formulaire
interface FormValues {
  email: string;
  username: string;
  password: string;
}

// Définition d'un type pour les erreurs
interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  default?: string;
}

export default function HomeScreen() {
  /***
   *      _____            _                 _   _
   *     |  __ \          | |               | | (_)
   *     | |  | | ___  ___| | __ _ _ __ __ _| |_ _  ___  _ __  ___
   *     | |  | |/ _ \/ __| |/ _` | '__/ _` | __| |/ _ \| '_ \/ __|
   *     | |__| |  __/ (__| | (_| | | | (_| | |_| | (_) | | | \__ \
   *     |_____/ \___|\___|_|\__,_|_|  \__,_|\__|_|\___/|_| |_|___/
   *
   *
   */
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  const [componentLoaded, setComponentLoaded] = useState("welcome");
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string>();

  /***
   *      ______               _   _
   *     |  ____|             | | (_)
   *     | |__ ___  _ __   ___| |_ _  ___  _ __  ___
   *     |  __/ _ \| '_ \ / __| __| |/ _ \| '_ \/ __|
   *     | | | (_) | | | | (__| |_| | (_) | | | \__ \
   *     |_|  \___/|_| |_|\___|\__|_|\___/|_| |_|___/
   *
   *
   */

  /** 
  Validation du formulaire et gestion des erreurs
  */
  const validateForm = () => {
    const newErrors: any = {}; // Objet pour stocker les erreurs
    setErrors(newErrors);
    formFields.forEach((field) => {
      if (field.context.includes(componentLoaded)) {
        const value = formValues[field.name as keyof FormValues]?.trim();
        if (!value) {
          newErrors[field.name] = `${field.label} est requis.`;
        }

        // Validation d'email (si le champ est un email)
        if (field.name === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
          newErrors.email = "Adresse mail invalide.";
        }

        if (
          field.name === "password" &&
          value &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value)
        ) {
          newErrors.password = "Mot de passe invalide";
        }
      }
    });

    setErrors(newErrors); // Mettre à jour l'état des erreurs
    return Object.keys(newErrors).length === 0; // Retourner true si le formulaire est valide
  };

  /** 
  Gestion des changements de valeurs du formulaire
  */
  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  /** 
  Routine d'inscription 
  */
  const handleSignup = async () => {
    const newErrors: any = {}; // Objet pour stocker les erreurs
    if (validateForm() && componentLoaded == "signup") {
      const response = await addUser(formValues);
      const rewriteValues = formValues;

      if (response.error) {
        newErrors["default"] = response.error.errorResponse.errmsg;
        setErrors(newErrors); // Mettre à jour l'état des erreurs
      } else {
        setSuccess("Inscription réussie");
        setTimeout(() => {
          setComponentLoaded("signin");
        }, 1000);
        setTimeout(() => {
          setFormValues(rewriteValues);
        }, 1500);
      }
    }
  };

  /** 
  Routine de connexion 
  */
  const handleConnect = async () => {
    const newErrors: any = {}; // Objet pour stocker les erreurs
    // se connecter
    if (validateForm() && componentLoaded == "signin") {
      const response = await connectUser(formValues);
      if(response)
      {
        if (response.error)
          {
            newErrors["default"] = response.error
            setErrors(newErrors); // Mettre à jour l'état des erreurs
          }
          else
          {
            if(response.jwtToken)
            {
              setToken(response.jwtToken)
              setSuccess("Connexion réussie");
              setTimeout(() => {
                // confirmer
                router.replace("/(tabs)/explore");
              }, 2000);
            }
                      
          }
      }
      else
      {
        newErrors["default"] = "Erreur de connexion serveur"
        setErrors(newErrors); // Mettre à jour l'état des erreurs
      }
      

      }
      
    
  };

  /***
   *      _    _            ______  __  __          _
   *     | |  | |          |  ____|/ _|/ _|        | |
   *     | |  | |___  ___  | |__  | |_| |_ ___  ___| |_ ___
   *     | |  | / __|/ _ \ |  __| |  _|  _/ _ \/ __| __/ __|
   *     | |__| \__ \  __/ | |____| | | ||  __/ (__| |_\__ \
   *      \____/|___/\___| |______|_| |_| \___|\___|\__|___/
   *
   *
   */

  useEffect(() => {
    setErrors({});
    setSuccess("");
    setFormValues({ email: "", username: "Patrice", password: "Al020910!!" });
  }, [componentLoaded]);

  /***
   *      _____  _           _
   *     |  __ \(_)         | |
   *     | |  | |_ ___ _ __ | | __ _ _   _
   *     | |  | | / __| '_ \| |/ _` | | | |
   *     | |__| | \__ \ |_) | | (_| | |_| |
   *     |_____/|_|___/ .__/|_|\__,_|\__, |
   *                  | |             __/ |
   *                  |_|            |___/
   */

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
        {componentLoaded == "welcome" && (
          <ThemedText type="title">Bienvenue !</ThemedText>
        )}
        {componentLoaded == "signin" && (
          <ThemedText type="title">Connexion</ThemedText>
        )}
        {componentLoaded == "signup" && (
          <ThemedText type="title">Inscription</ThemedText>
        )}
        <ThemedText>{apiUrl}</ThemedText>
      </ThemedView>

      {componentLoaded == "welcome" && (
        <ThemedView style={styles.welcomeContainer}>
          <ThemedText type="subtitle">
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

      {componentLoaded !== "welcome" && (
        <View style={styles.borderedContainer}>
          <ThemedView style={styles.groupbuttonContainer}>
            <ThemedView style={styles.buttonContainer}>
              <KeyboardAvoidingView>
                {formFields.map((field, i) =>
                  field.context.includes(componentLoaded) ? (
                    <View key={i} style={{ marginBottom: 10 }}>
                      {/* Label pour le champ */}
                      <Text>{field.label}</Text>

                      {/* Input dynamique */}
                      <TextInput
                        keyboardType={field.type}
                        secureTextEntry={field.secure || false}
                        style={{
                          borderWidth: 1,
                          borderColor: "lightgrey",
                          padding: 10,
                          marginVertical: 5,
                        }}
                        onChangeText={(text) =>
                          handleChange(field.name as keyof FormValues, text)
                        }
                        value={formValues[field.name as keyof FormValues]}
                      />

                      {field.comments && (
                        <Text
                          style={{
                            color: "black",
                            fontStyle: "italic",
                            fontSize: 10,
                          }}
                        >
                          {field.comments}
                        </Text>
                      )}

                      {/* Affichage des erreurs sous chaque champ */}
                      {errors[field.name as keyof FormValues] && (
                        <Text style={{ color: "red", fontSize: 12 }}>
                          {errors[field.name as keyof FormValues]}
                        </Text>
                      )}
                    </View>
                  ) : null
                )}

                <View style={{ marginVertical: 10 }}>
                  <Button
                    color="#28A046"
                    onPress={() => {
                      componentLoaded == "signup"
                        ? handleSignup()
                        : handleConnect();
                    }}
                    title={
                      componentLoaded == "signup"
                        ? "S'inscrire"
                        : "Se connecter"
                    }
                  />

                  {errors["default" as keyof FormValues] && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 10 }}>
                      {errors["default" as keyof FormValues]}
                    </Text>
                  )}

                  {success && (
                    <Text
                      style={{ color: "green", fontSize: 12, marginTop: 10 }}
                    >
                      {success}
                    </Text>
                  )}
                </View>
              </KeyboardAvoidingView>

              {componentLoaded != "signup" && (
                <ThemedText style={{ textAlign: "center" }}>
                  <Link href="/forgotpassword">Mot de passe oublié ?</Link>
                </ThemedText>
              )}
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
    height: "20%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
  },
  borderedContainer: {
    borderWidth: 1,
    borderColor: "#28A046",
    borderRadius: 50,
    margin: 20,
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
    paddingVertical: "5%",
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
    objectFit: "cover",
  },
});
