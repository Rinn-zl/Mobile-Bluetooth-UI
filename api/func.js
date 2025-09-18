import api from "./api";

// Set fan speed
export const sendFanSpeed = async (stepValue) => {
	try {
		const res = await api.post("/api/fan", { step: stepValue });
		console.log("Fan speed:", res.data.speed);
	} catch (err) {
		console.error("Fan speed error:", err.message);
	}
};

// Set mode
export const sendMode = async (newMode) => {
	try {
		const res = await api.post("/api/mode", { mode : newMode});
		console.log("Mode:", res.data.mode);
	} catch (err) {
		console.error("Mode error:", err.message);
	}
};

// Power off
export const sendPower = async () => {
    console.log("sendPower called");
    try {
        await api.post("/api/power", { power: "off" });
        console.log("Fan powered off");
    } catch (err) {
        console.error("Power off error:", err.message);
    }
};


//servo toggle
export const sendServoToggle = async (action) => {
    try {
        const res = await api.post("/api/servo", { action }); // "on" or "off"
        return res.data.servo;
    } catch (err) {
        console.error("Failed to toggle servo:", err.message);
    }
};

//timer
export const sendTimer = async (hours, minutes) => {
    try {
        const res = await api.post("/api/timer", { hours, minutes });
        return res.data;
    } catch (err) {
        console.error("Failed to set timer:", err.message);
        return { status: "error", message: err.message };
    }
};
//temperature
export const getTemperature = async () => {
    try {
        const res = await api.get("/api/temperature");
        return res.data.temperature;
    } catch (err) {
        console.error("Failed to fetch temperature:", err.message);
        return null;
    }
};

export const sendTemperature = async (temperature) => {
    try {
        const res = await api.post("/api/temperature", { temperature });
        return res.data.temperature;
    } catch (err) {
        console.error("Failed to send temperature:", err.message);
        return null;
    }
};
