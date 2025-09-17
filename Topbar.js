import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // recommended for Expo projects

export default function Topbar({ onPowerOff }) {
	return (
		<View style={styles.headerWrap}>
			<View style={styles.titleBlock}>
				<Text style={styles.title}>Zephyr</Text>
				<View style={styles.underline} />
			</View>

			<TouchableOpacity
				style={styles.powerOff}
				onPress={onPowerOff}
				accessibilityLabel="Power Off"
			>
				<Ionicons name="power" size={22} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	headerWrap: {
		width: "100%",
		paddingTop: 18,
		paddingHorizontal: 18,
		paddingBottom: 10,
		backgroundColor: "#e6e9ec",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	title: {
		fontSize: 30,
		fontWeight: "500",
		color: "#111",
	},
	underline: {
		height: 1,
		backgroundColor: "rgba(0,0,0,0.06)",
		marginTop: 8,
		width: 160,
	},
	powerOff: {
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: "#e84b4b",
		alignItems: "center",
		justifyContent: "center",
		elevation: 8,
		shadowColor: "#e84b4b",
		shadowOpacity: 0.35,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		marginRight: 6,
	},
});
