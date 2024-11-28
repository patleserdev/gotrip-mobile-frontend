import { TouchableOpacity ,Text,StyleSheet,Switch,View} from "react-native";


export default function Badge({title,bgColor,color}){


    return (
        <View style={[styles.buttonContainer,{backgroundColor:bgColor}]}>
            <View>
            <Text style={[styles.textButton,{color:color}]}>{title}</Text>

            </View>
            <View>
            <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={'#f5dd4b' }
          ios_backgroundColor="#3e3e3e"
    
          value={true}
        />
            </View>
         
        </View>
    )
}
const styles = StyleSheet.create({

    buttonContainer:
    {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:1,
        padding:5,
        margin:2,

      
    },
    textButton:
    {
        color:'#fff',
        fontSize:16
    }

})