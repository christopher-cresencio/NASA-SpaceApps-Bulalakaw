# Research & Architecture Decisions: Bulalakaw Station — Mission 1 ("August 1972")

**Feature**: `001-five-sol-progression`  
**Date**: 2026-11-05  
**Status**: Completed  

---

## Technical Investigations & Decisions

### 1. Three-Mode Hybrid Rendering Architecture (2D Top-Down + Mini-Games + FNAF Console)

* **Decision**: Use a unified 2D HTML5 Canvas for the top-down Stardew Valley-style exploration world (outdoor base + indoor station rooms + walking NPCs + day/dusk/night lighting overlay + corner minimap), paired with clean, responsive DOM/Canvas layers for:
  1. **Station Mini-Game Drawer (<1 min tasks)**: Opens over the active view while the real-time Sol clock and background simulation continue ticking.
  2. **First-Person FNAF Control Room Console**: Activates when the player interacts with the Control Room desk ("in the chair") and closes immediately when clicking **"Stand up"**.
* **Rationale**: Matches `mars_outpost_game_prompt.md` Section 15 ("Default: 2D top-down. This is the safest choice for a hackathon prototype and for AI-generated code, and it runs well on phones"). Keeping mini-games and the FNAF console as dedicated interactive screens on top of the continuous real-time simulation loop guarantees 60 FPS performance and reliable touch/mouse hitboxes on both phones and desktops.

---

### 2. Single Top-of-Code `CONFIG` Object for Non-Coders

* **Decision**: Place `const CONFIG = { ... }` at the very top of `app.js` (and mirror it in `scenarios.json`) containing every tunable number: Sol length (~8 real minutes + fast demo toggle), resource starting values in `crew-days`, drain/production rates, storm trigger times, mini-game difficulty parameters, and `Real` vs. `Simplified` science badge notes.
* **Rationale**: Directly fulfills Constitution Principle I and Section 1 of `mars_outpost_game_prompt.md` so Denise and Raindel can tweak values and copy in one place without searching through game logic.

---

### 3. Flight Recorder Causal Chain & Turning Point Detection

* **Decision**: Log two lightweight streams during gameplay:
  1. **Periodic Telemetry Samples** (every 5 real seconds): `{ sol, clockLabel, batteryPct, maxCrewDoseMsv, crewSafetyScore }`.
  2. **Discrete Decision Events**: Timestamped records whenever the player leaves greenhouse lamps on at sunset, delays cleaning dusty panels, ignores a Warning (70%) alert, or recalls Carlo late during Storm Rush.
  At mission end, a deterministic rule evaluator inspects the event log to select the highest-impact **Turning Point** and constructs a 3-step plain-language **Cause Chain** (e.g., *"You kept the lamps on all night → the battery was low when the storm hit → the shelter doors moved slowly"*).
* **Rationale**: Turns the player's own decisions into the science lesson without requiring any server backend or external analytics library.

---

### 4. Web Audio API Soundscape & Visual Captions

* **Decision**: Generate all audio procedurally via the **Web Audio API** (`AudioContext`):
  * **Daytime**: Warm, calm low-pass oscillator hum + soft footstep ticks.
  * **Nighttime**: Deeper, tenser sub-bass drone when solar generation drops to 0.
  * **Mini-Games**: Crisp interaction blips and ascending harmonic chimes on task completion.
  * **Storm Rush**: Escalating dual-tone klaxon siren when solar particles are <1 minute away.
  * **Accessibility**: Pair every audio alert with a visual caption banner and a persistent HUD Mute toggle.
