import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";

export default function Nidos(props) {
  return (
    <View style={styles.viewBody}>
      <Text size={24}> Aun no tienes Nidos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});