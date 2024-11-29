import { View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function Separator(){


    const colorScheme = useColorScheme() ?? "light";

    return (

 <View style={{backgroundColor:colorScheme == 'light' ? '#000':'#fff', height:1,width:'80%',margin:'auto',marginVertical:40,borderRadius:50}}/>

    )
}