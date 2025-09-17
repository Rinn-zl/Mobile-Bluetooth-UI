// App.js
import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Home from "./Home";
import Topbar from "./Topbar";
import Body from "./Body";

export default function App() {
  const [poweredOn, setPoweredOn] = useState(false);

  return (
    <View style={styles.appBg}>
      <SafeAreaView style={styles.screen}>
        {poweredOn ? (
          <View style={styles.card}>
            <Topbar onPowerOff={() => setPoweredOn(false)} />
            <Body />
          </View>
        ) : (
          <Home onPowerOn={() => setPoweredOn(true)} />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  appBg: {
    flex: 1,
    backgroundColor: "#0f1a2b",
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    height: "96%",
    borderRadius: 18,
    backgroundColor: "#d7dbe0",
    overflow: "hidden",
    alignItems: "center",
  },
});
