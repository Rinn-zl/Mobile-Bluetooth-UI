# Zephyr Mobile UI

A minimalist React Native app for controlling a smart fan system with servo sweep, temperature display, and timer-based automation. Designed to interface with a Flask backend running on Raspberry Pi + GrovePi hardware.

---

## Features

- Fan speed control (Off / Low / Medium / High)
- Manual and Auto mode switching
- Servo sweep toggle (simulates fan oscillation)
- Real-time temperature display
- Timer-based fan shutdown
- Responsive arc-based UI with smooth transitions

---

## Screenshots

![photo_2025-09-19_01-34-05](https://github.com/user-attachments/assets/3689eef7-a5e0-4a1f-8b94-8a755ed6ea89)

![photo_2025-09-19_01-40-32](https://github.com/user-attachments/assets/5cefc6bd-5e0f-4b7c-bc49-6b8455187e1c)

- Fan speed arc with temperature overlay  
- Mode toggle and sweep control  
- Timer input with validation
  
---

## Getting Started

### Prerequisites

- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)
- React Native development environment (Android/iOS simulator or physical device)

### Installation

```bash
git clone https://github.com/yourusername/zephyr-ui.git
cd zephyr-ui
npm install
```
## Expo Guide
- Zephyr UI is built with Expo, making it easy to run on both Android and iOS.
- Run the App
```bash
expo start
```
This will open the Expo Dev Tools in your browser.

### Launch on Device

- Install Expo Go from the App Store or Google Play
- Scan the QR code shown in the terminal or browser
- The app will load instantly on your device

## Backend Integration
- Ensure the Flask server is running on your Raspberry Pi:
- You can get the program code from this link https://github.com/Rinn-zl/Zephyr-Backend.git

```bash
python3 app.py
```
- Update the API base URL in api.js:
```
const api = axios.create({
  baseURL: "http://<raspberry-pi-ip>:5000",
});
```
## Customization

- Modify speedLevels in Body.js to adjust fan intensity
- Tweak sweep angles and timing in backend sweep_servo_step()


## Credits
- Created by Sai Sai Lin Htet, [Thazin Phyo](https://github.com/Mukimizu), Toe Wai Yan and [Zaw Lin Naing](https://github.com/Rinn-zl) from MIIT University, Mandalay, Myanmar.
- ~ blending elegant UI with embedded hardware control. Inspired by airflow, simplicity, and seamless interaction.
