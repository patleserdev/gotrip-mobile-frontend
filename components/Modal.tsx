import {
    View,
    Modal,

  } from "react-native";
  import React from "react";
  const items = require("@/constants/Items.ts")

export default function Modal({children,modalVisible,isVisible})
{
    return( <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          destroyNewMarker();
          isVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           {children}
          </View>
        </View>
      </Modal>)
}