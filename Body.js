// Body.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Body() {
  const [step, setStep] = useState(0); // 0 → 1 → 2 → 3
  const [temperature, setTemperature] = useState(25);

  // simulate temperature changing every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTemp = 20 + Math.floor(Math.random() * 10); // between 20–30
      setTemperature(randomTemp);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const maxSteps = 3;
  const speed = Math.round((step / maxSteps) * 100); // fan speed %

  const size = 260;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;

  // === Arc config ===
  const startDeg = -250;
  const endDeg = -290;
  const sweepDeg = (endDeg - startDeg + 360) % 360; // total arc span
  const progressDeg = startDeg + (sweepDeg * step) / maxSteps;

  // === Polar to Cartesian ===
  const polarToCartesian = (angleDeg) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: size / 2 + radius * Math.cos(angleRad),
      y: size / 2 + radius * Math.sin(angleRad),
    };
  };

  // === Describe Arc Path ===
  const describeArc = (fromDeg, toDeg) => {
    const start = polarToCartesian(fromDeg);
    const end = polarToCartesian(toDeg);
    const largeArcFlag = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  };

  const inc = () => setStep((s) => Math.min(maxSteps, s + 1));
  const dec = () => setStep((s) => Math.max(0, s - 1));

  return (
    <View style={styles.container}>
      {/* Arc progress */}
      <View style={styles.progressWrap}>
        <Svg width={size} height={size}>
          {/* Background arc */}
          <Path
            d={describeArc(startDeg, endDeg)}
            stroke="#ccc"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          {step > 0 && (
            <Path
              d={describeArc(startDeg, progressDeg)}
              stroke="#38bdf8"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          )}
        </Svg>

        {/* Center overlay: Temperature */}
        <View style={styles.center}>
          <Text style={styles.tempText}>{temperature}°</Text>
          <Text style={styles.centerLabel}>CURRENT TEMP</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.circleBtn} onPress={dec}>
          <Text style={styles.circleBtnText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleBtn} onPress={inc}>
          <Text style={styles.circleBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Fan speed text */}
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>Fan Speed: {speed}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    alignItems: "center",
    justifyContent: "center",
  },
  tempText: {
    fontSize: 64,
    fontWeight: "300",
    color: "#111",
  },
  centerLabel: {
    marginTop: 4,
    color: "#7f8790",
    fontSize: 12,
    letterSpacing: 2,
  },
  controls: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
  },
  circleBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#6b6f76",
    alignItems: "center",
    justifyContent: "center",
  },
  circleBtnText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  statusRow: { marginTop: 18, alignItems: "center" },
  statusText: { color: "#7f8790", fontSize: 14 },
});
