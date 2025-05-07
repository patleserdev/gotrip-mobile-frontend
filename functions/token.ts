import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
    //console.log("Token enregistré");
  } catch (error) {
   // console.error("Erreur de sauvegarde du token", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if(token)
    {
        //console.log("Token récupéré");
        return token
    }
    
  } catch (error) {
    //console.error("Erreur de récupération du token", error);
  }
};

export const destroyToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
    //console.log("Token supprimé");
  } catch (error) {
   // console.error("Erreur de suppression du token", error);
  }
};


