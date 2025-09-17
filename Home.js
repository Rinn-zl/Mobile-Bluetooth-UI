import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function Home({ onPowerOn }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>SMART FAN CONTROLLER</Text>
			<Text style={styles.subtitle}>Press power to start</Text>

			{/* Fan Icon */}
			<View style={styles.fanWrapper}>
				<MaterialCommunityIcons name="fan" size={120} color="#38bdf8" />
			</View>

			<View style={styles.buttonWrapper}>
				<TouchableOpacity style={styles.powerButton} onPress={onPowerOn}>
					<Text style={styles.powerButtonText}>POWER ON</Text>
				</TouchableOpacity>
			</View>
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
		width: "100%",
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
	},
	fanWrapper: {
		marginBottom: 40,
	},
	buttonWrapper: {
		marginTop: 20,
		width: 200, // adjust width
	},
	powerButton: {
		backgroundColor: "#19b354",
		paddingVertical: 14,
		borderRadius: 40, // rounded corners
		alignItems: "center",
		justifyContent: "center",
		// shadow for iOS
		shadowColor: "#19b354",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.55,
		shadowRadius: 20,
		// shadow for Android
		elevation: 12,
	},
	powerButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
	},
});
