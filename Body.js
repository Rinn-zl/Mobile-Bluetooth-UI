// Body.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TextInput } from "react-native";

export default function Body({ power, setPower }) {
	const [step, setStep] = useState(0); // 0 → 1 → 2 → 3
	const [temperature, setTemperature] = useState(25);

	//handler for toggle mode
	const [mode, setMode] = useState("manual");
	const [controlsDisabled, setControlsDisabled] = useState(false);

	//spin toggle
	const [spin, setSpin] = useState(false);
	const toggleSpin = () => {
		if (!power) return;
		setSpin((prev) => !prev);
	};

	//timer
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);

	//status
	const [hvacAction, setHvacAction] = useState("idle"); // "heating", "cooling", or "idle"
	const statusMessage = !power
		? "System is powered off"
		: mode === "manual"
		? "Manual: adjust with + / −"
		: hvacAction === "heating"
		? "Auto: Heating..."
		: hvacAction === "cooling"
		? "Auto: Cooling..."
		: "Auto: Idle";

	const cycleMode = () => {
		if (!power) return;

		const newMode = mode === "auto" ? "manual" : "auto";
		setMode(newMode);

		// Disable other controls when in auto mode
		setControlsDisabled(newMode === "auto");
	};

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
	const speedLabel = ["Off", "Low", "Medium", "High"][step];

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

	//sync power and fan speed
	useEffect(() => {
		if (step === 0 && power) {
			setPower(false);
		}
	}, [step]);
	useEffect(() => {
		if (!power) {
			setStep(0);
		}
	}, [power]);

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
				<TouchableOpacity
					style={[
						styles.circleBtn,
						(!power || controlsDisabled) && { backgroundColor: "#999" },
					]}
					onPress={dec}
					disabled={!power || controlsDisabled}
				>
					<Text style={styles.circleBtnText}>-</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.circleBtn,
						(!power || controlsDisabled) && { backgroundColor: "#999" },
					]}
					onPress={inc}
					disabled={!power || controlsDisabled}
				>
					<Text style={styles.circleBtnText}>+</Text>
				</TouchableOpacity>
			</View>
			{/* Fan speed text */}
			<View style={styles.statusRow}>
				<Text style={styles.statusText}>Fan Speed: {speedLabel}</Text>
			</View>
			{/* Toggle Mode */}
			<View style={styles.controls}>
				<TouchableOpacity
					onPress={cycleMode}
					disabled={!power}
					style={{
						backgroundColor: mode === "auto" ? "#f59e0b" : "#2563eb",
						opacity: !power ? 0.5 : 1,
						padding: 12,
						borderRadius: 999,
						marginTop: 16,
					}}
				>
					<Text
						style={{ color: "#fff", fontWeight: "600", textAlign: "center" }}
					>
						{mode === "auto" ? "Auto Mode" : "Manual Mode"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={toggleSpin}
					disabled={!power}
					style={[
						styles.spinBtn,
						spin ? styles.spinOn : styles.spinOff,
						!power && styles.disabledBtn,
					]}
				>
					<Text style={styles.spinBtnText}>Sweep: {spin ? "ON" : "OFF"}</Text>
				</TouchableOpacity>
			</View>
			{/* timer */}
			<View style={styles.timerRow}>
				<Text style={styles.timerLabel}>Timer:</Text>

				<TextInput
					value={String(hours)}
					onChangeText={(text) => {
						const num = parseInt(text);
						if (!isNaN(num) && num >= 0) setHours(num);
					}}
					editable={power && mode === "manual"}
					keyboardType="numeric"
					style={[
						styles.timerInput,
						(!power || mode === "auto") && styles.disabledInput,
					]}
				/>
				<Text style={styles.timerLabel}>hr</Text>
				<TextInput
					value={String(minutes)}
					onChangeText={(text) => {
						const num = parseInt(text);
						if (!isNaN(num) && num >= 0 && num < 60) setMinutes(num);
					}}
					editable={power && mode === "manual"}
					keyboardType="numeric"
					style={[
						styles.timerInput,
						(!power || mode === "auto") && styles.disabledInput,
					]}
				/>
				<Text style={styles.timerLabel}>min</Text>
			</View>
			<Text style={styles.statusNote}>{statusMessage}</Text>
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

	//spin
	spinBtn: {
		paddingVertical: 10,
		paddingHorizontal: 24,
		borderRadius: 999,
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		alignSelf: "center",
		marginTop: 12,
	},
	spinOn: {
		backgroundColor: "#16a34a", // green-600
		shadowColor: "#22c55e", // green-500
	},
	spinOff: {
		backgroundColor: "#4b5563", // gray-600
		shadowColor: "#6b7280", // gray-500
	},
	disabledBtn: {
		opacity: 0.5,
	},
	spinBtnText: {
		color: "#fff",
		fontWeight: "600",
		textAlign: "center",
	},

	//timer
	timerRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginTop: 20,
	},
	timerInput: {
		width: 60,
		height: 40,
		borderRadius: 8,
		backgroundColor: "#3f3f46", // zinc-700
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
		fontWeight: "500",
	},
	disabledInput: {
		opacity: 0.4,
	},

	timerLabel: {
		color: "#111",
		fontSize: 14,
	},
	disabledBtn: {
		opacity: 0.4,
	},
	//status
	statusNote: {
		marginTop: 16,
		fontSize: 12,
		color: "#a1a1aa", // zinc-400
	},
});
