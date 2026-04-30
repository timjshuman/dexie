# Dexie

Dexie is a dyslexia-friendly spelling and word challenge game built for kids. The game uses a princess land theme with unicorns, castles, animated progress, rewards, and player profiles saved in the browser.

## Technology Stack

- **Next.js** - React framework used for the app structure, routing, build tooling, and optimized image handling.
- **React** - Powers the interactive game UI, challenge flow, score tracking, local player login, and reward state.
- **TypeScript** - Adds static typing for challenge data, player progress, gifts, and component state.
- **CSS** - Provides the custom princess-land visuals, responsive layout, animations, fireworks, bounce effects, and mobile-friendly styling.
- **Local Storage** - Saves player profiles, levels, scores, and earned gifts directly in the browser.
- **Web Speech API** - Reads clues, words, and feedback aloud for an accessible learning experience.

## Features

- Player login and local profile creation.
- Per-player saved score, level, and gifts.
- Dyslexia-friendly spelling challenges with missing-letter prompts.
- Animated hinting when showing a word or choosing an incorrect letter.
- Level completion rewards with collectible gifts.
- Princess, unicorn, castle, fireworks, and progress animations.
- Responsive layout for desktop and mobile devices.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev -- --hostname 127.0.0.1
```

Open the app:

```text
http://127.0.0.1:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/
  page.tsx       Main game UI and game state
  globals.css    Global styles and animations
  layout.tsx     App metadata and viewport settings
public/
  *.png          Character and profile images
```
