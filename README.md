# Pikachu Volleyball

✓ English | Español | Korean(한국어)

Pikachu Volleyball (対戦ぴかちゅ～　ﾋﾞｰﾁﾊﾞﾚｰ編) is an old Windows game that was developed by "(C) SACHI SOFT / SAWAYAKAN Programmers" and "(C) Satoshi Takenouchi" in 1997.

This repository is a fork of the JavaScript reimplementation created by https://github.com/gorisanson/pikachu-volleyball.
This fork keeps that work as its foundation, while focusing on a version that works cleanly on Linux through AppImage, with desktop UX improvements, offline-safe behavior, accessibility fixes, and ongoing gameplay and interface improvements, while still maintaining the web version.

<img src="src/resources/assets/images/screenshot.png" alt="Pikachu Volleyball game screenshot" width="648">

## How to run locally

1. Clone this repository and get into the directory.

git clone https://github.com/santirodriguez/pikachu-volleyball.git
cd pikachu-volleyball

2. Install dependencies.

npm install

3. Bundle the code.

npm run build

4. Run a local web server.

npx http-server dist

5. Open the game in your browser. In most cases, the URL will be http://localhost:8080.

## Linux desktop packaging (AppImage)

This repository includes an Electron wrapper under desktop/ and uses electron-builder for Linux packaging.

1. Build the web assets:

npm run build:web

2. Start the desktop app:

npm run start:desktop

3. Build the AppImage:

npm run build:desktop:linux

The Linux packaging target is restricted to AppImage only.

### AppImage release artifact details

For convenience, you can also run:

npm run build:appimage

After a successful build, release artifacts are written to:

- release/Pikachu-Volleyball-1.1x86_64.AppImage
- release/latest-linux.yml

For repeatable CI builds, this fork includes .github/workflows/release-appimage.yml:
- workflow_dispatch: manually build and upload a pikachu-volleyball-appimage workflow artifact.
- release.published: build the AppImage and automatically attach it to the published GitHub Release.

## Quality-check baseline

This fork now includes a small, reproducible quality-check baseline that matches the current web-first project and Linux/AppImage flow.

Run this command after installing dependencies:

npm run quality:check

What it does:

- npm run lint: runs ESLint on the web game JavaScript, webpack config files, and Electron entry file.
- npm run build:web: verifies that the production web bundle still builds correctly.

For convenience, npm test now runs the same baseline check.

## Game structure

- Physics Engine: src/resources/js/physics.js
- Rendering: PixiJS (https://github.com/pixijs/pixi.js)

Refer to src/resources/js/main.js for more details.

## About this fork

This fork focuses on:

- keeping the game working on the web
- adding native Linux support via AppImage
- improving the desktop experience so it feels like a proper standalone app
- introducing careful improvements without breaking the original gameplay feel

The project is based on the JavaScript reverse-engineering and reimplementation work published by Kyutae Lee, and continues that foundation with Linux support, release automation, UI/UX fixes, accessibility improvements, and fork-specific cleanup.

Source code for this fork:
https://github.com/santirodriguez/pikachu-volleyball

## Tips

- In 1-player mode, press Z to play as Player 1 or Enter to play as Player 2.
- Player 1 has an extra down input on the V key. It behaves differently from F, so you can use whichever feels more comfortable.
- Press Esc to hide or show the menu bar.
- Practice mode is available at Options → Practice mode.
- In practice mode, press B to reset the ball quickly.
- After a match ends, use Power Hit for a quick rematch.
- For offline browser play, you can still install the web version as an app from your browser.

## An intended deviation from the original game

If there is no keyboard input, AI vs AI match starts automatically.

Unlike the original game, there is no time limit, so matches can run indefinitely.
