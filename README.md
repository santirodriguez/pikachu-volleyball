# Pikachu Volleyball

✓ English | Español | Korean(한국어)

Pikachu Volleyball (対戦ぴかちゅ～　ﾋﾞｰﾁﾊﾞﾚｰ編) is an old Windows game that was developed by "(C) SACHI SOFT / SAWAYAKAN Programmers" and "(C) Satoshi Takenouchi" in 1997.

This repository is a fork of the JavaScript reimplementation created by https://github.com/gorisanson/pikachu-volleyball.
This fork keeps that work as its foundation, while focusing on a version I can enjoy natively on Linux without relying on Wine. A big part of the motivation is simple childhood nostalgia, together with the desire to personalize the project carefully and improve it step by step while still maintaining the web version.

<img src="src/resources/assets/images/screenshot.png" alt="Pikachu Volleyball game screenshot" width="648">

## How to run locally

1. Clone this repository and get into the directory.

git clone https://github.com/santirodriguez/pikachu-volleyball.git
cd pikachu-volleyball

2. Install dependencies. (If errors occur, you can try with node v16 and npm v8.)

npm install

3. Bundle the code.

npm run build

4. Run a local web server.

npx http-server dist

5. Open the game in your browser. In most cases, the URL will be http://localhost:8080.

## Linux desktop packaging (AppImage)

This repository includes a minimal Electron wrapper under desktop/ and uses electron-builder for Linux packaging.

1. Build the web assets:

npm run build:web

2. Start the desktop app:

npm run start:desktop

3. Build the AppImage:

npm run build:desktop:linux

The Linux packaging target is restricted to AppImage only.

## Game structure

- Physics Engine: src/resources/js/physics.js
- Rendering: PixiJS (https://github.com/pixijs/pixi.js)

Refer to src/resources/js/main.js for more details.

## About this fork

This fork focuses on:

- keeping the game working on the web
- adding native Linux support via AppImage
- introducing careful improvements without breaking the original experience

The main motivation is to play this game natively on Linux without Wine, while preserving the nostalgia of the original and gradually enhancing the project.

## An intended deviation from the original game

If there is no keyboard input, AI vs AI match starts automatically.

Unlike the original game, there is no time limit, so matches can run indefinitely.
