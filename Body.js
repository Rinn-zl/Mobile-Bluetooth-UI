// Body.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";

export default function Body() {
  const [speed, setSpeed] = useState(25); // initial visible speed
  const [temperature] = useState(73); // current temperature shown in center

  // 4-button clicks to get 0 -> 100 (step 25)
  const step = 25;
  const inc = () => setSpeed((s) => Math.min(100, s + step));
  const dec = () => setSpeed((s) => Math.max(0, s - step));

  // When speed == 0 we show zero colored arc (empty)
  const progress = speed === 0 ? 0 : speed / 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressWrap}>
        <Progress.Circle
          size={230}
          progress={progress}
          thickness={14}
          color="#38bdf8"
          unfilledColor="#222"
          borderWidth={0}
          showsText={false}
          strokeCap="round"
          // rotate circle so progress starts at top (12 o'clock)
          style={{ transform: [{ rotate: "-90deg" }] }}
        />

        {/* center overlay (not rotated) */}
        <View style={styles.center}>
          <Text style={styles.tempText}>{temperature}°</Text>
          <Text style={styles.centerLabel}>CURRENT TEMP</Text>
        </View>

        <Text style={[styles.marker, styles.markerLeft]}>50</Text>
        <Text style={[styles.marker, styles.markerRight]}>90</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.circleBtn} onPress={dec}>
          <Text style={styles.circleBtnText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleBtn} onPress={inc}>
          <Text style={styles.circleBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>Fan Speed: {speed}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container sits inside the card
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#d7dbe0",
  },

  progressWrap: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  center: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tempText: {
    fontSize: 64,
    fontWeight: "300",
    color: "#111",
    textShadowColor: "rgba(255,255,255,0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  centerLabel: {
    marginTop: 4,
    color: "#7f8790",
    letterSpacing: 2,
    fontSize: 12,
  },

  marker: {
    position: "absolute",
    top: 18,
    color: "#7f8790",
    fontSize: 12,
  },
  markerLeft: { left: 18 },
  markerRight: { right: 18 },

  controls: {
    marginTop: 18,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 28,
    paddingHorizontal: 24,
  },
  circleBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#6b6f76",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  circleBtnText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  statusRow: { marginTop: 18, alignItems: "center" },
  statusText: { color: "#7f8790", fontSize: 14 },
});
