# 3kh0 lite

A lightweight, fast, and clean web-based gaming platform ("unblocked games" portal).

## Architecture

- **Type**: Pure static site (HTML, CSS, Vanilla JavaScript)
- **No build step** required — files are served directly
- **Game data**: `config/games.json` contains all game metadata (titles, icons, links)
- **Games**: Hosted under `projects/` directory, each in its own subdirectory

## Project Structure

- `index.html` — Homepage
- `projects.html` — Games listing page
- `misc.html` — Tools/settings page
- `404.html` — Not found page
- `config/games.json` — Game database
- `js/` — Global JavaScript files (main.js, subtitle.js, misc.js)
- `projects/` — Individual game folders

## Running the App

The app is served using `serve` (a static file server) on port 5000.

**Workflow**: `Start application` — runs `npx serve . -l 5000`

## Deployment

Configured as a **static** deployment with `publicDir: "."`.
