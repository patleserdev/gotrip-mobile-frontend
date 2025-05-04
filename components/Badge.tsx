import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Switch, View } from "react-native";

interface BadgeInterface {
  title: string;
  bgColor: string;
  color: string;
  value:boolean;
  onValueChange: (newValue: boolean) => void; // ici, plus d'ID, juste le bool
}

export default function Badge({ title,value, bgColor, color ,onValueChange}: BadgeInterface) {
  /***
   *      ____  _____ ____ _        _    ____  _____
   *     |  _ \| ____/ ___| |      / \  |  _ \| ____|
   *     | | | |  _|| |   | |     / _ \ | |_) |  _|
   *     | |_| | |__| |___| |___ / ___ \|  _ <| |___
   *     |____/|_____\____|_____/_/   \_\_| \_\_____|
   *
   */

  /***
 *      _____                          _     _                       
 *     |  ___|  _   _   _ __     ___  | |_  (_)   ___    _ __    ___ 
 *     | |_    | | | | | '_ \   / __| | __| | |  / _ \  | '_ \  / __|
 *     |  _|   | |_| | | | | | | (__  | |_  | | | (_) | | | | | \__ \
 *     |_|      \__,_| |_| |_|  \___|  \__| |_|  \___/  |_| |_| |___/
 *                                                                   
                                                                   
 */
 
  /***
   *      _   _                  _____    __    __                 _
   *     | | | |  ___    ___    | ____|  / _|  / _|   ___    ___  | |_
   *     | | | | / __|  / _ \   |  _|   | |_  | |_   / _ \  / __| | __|
   *     | |_| | \__ \ |  __/   | |___  |  _| |  _| |  __/ | (__  | |_
   *      \___/  |___/  \___|   |_____| |_|   |_|    \___|  \___|  \__|
   *
   */

  /***
   *      ____    _                 _
   *     |  _ \  (_)  ___   _ __   | |   __ _   _   _
   *     | | | | | | / __| | '_ \  | |  / _` | | | | |
   *     | |_| | | | \__ \ | |_) | | | | (_| | | |_| |
   *     |____/  |_| |___/ | .__/  |_|  \__,_|  \__, |
   *                       |_|                  |___/
   *
   */

  return (
    <View style={[styles.buttonContainer, { backgroundColor: bgColor }]}>
      <View>
        <Text style={[styles.textButton, { color: color }]}>{title}</Text>
      </View>
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#ffffff" }}
          thumbColor={"#f5dd4b"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange}
          value={value}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    margin: 2,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
});
