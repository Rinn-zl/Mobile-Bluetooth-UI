// Home.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Home({ onPowerOn }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMART FAN CONTROLLER</Text>
      <Text style={styles.subtitle}>Press power to start</Text>

      <View style={styles.fanCircle}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png" }}
          style={styles.fanIcon}
        />
      </View>

      <TouchableOpacity style={styles.powerBtn} onPress={onPowerOn}>
        <Text style={styles.powerBtnText}>POWER ON</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1a2b",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  subtitle: {
    color: "#9aa6b3",
    fontSize: 12,
    marginBottom: 28,
  },
  fanCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 10,
    borderColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
  fanIcon: {
    width: 140,
    height: 140,
    tintColor: "#8b94a0",
    resizeMode: "contain",
  },
  powerBtn: {
    backgroundColor: "#19b354",
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 40,
    elevation: 12,
    shadowColor: "#19b354",
    shadowOpacity: 0.55,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  powerBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
