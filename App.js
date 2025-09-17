// App.js
import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Home from "./Home";
import Topbar from "./Topbar";
import Body from "./Body";

export default function App() {
	const [poweredOn, setPoweredOn] = useState(false);
	const [showHome, setShowHome] = useState(true);

	return (
		<View style={styles.appBg}>
			<StatusBar style="light" />
			<SafeAreaView style={styles.screen}>
				{showHome ? (
					<Home
						onPowerOn={() => {
							setPoweredOn(true);
							setShowHome(false);
						}}
					/>
				) : (
					<View style={styles.card}>
						<Topbar
							onPowerOff={() => {
								setPoweredOn(false);
								setShowHome(true);
							}}
						/>
						<Body power={poweredOn} setPower={() => setPoweredOn(true)} />
					</View>
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
		// allow topbar + body to layout using flex
		flexDirection: "column",
	},
});
