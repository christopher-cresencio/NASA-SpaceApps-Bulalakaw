# Implementation Plan: Bulalakaw Station — Mission 1 ("August 1972")

**Branch**: `001-five-sol-progression` | **Date**: 2026-11-05 | **Spec**: [specs/001-five-sol-progression/spec.md](./spec.md)

**Input**: Feature specification from `specs/001-five-sol-progression/spec.md` (aligned with `mars_outpost_game_prompt.md`, `sol_night_build_prompt.md`, and `bulalakaw_handoff_context (1).md`)

## Summary

Build a complete, polished playable prototype of **Bulalakaw Station — Mission 1 ("August 1972")** across **3 Sols**. The player commands a small Martian outpost alongside four autonomous Filipino crewmates (**Dr. Liza Mabini**, **Engr. Andoy Villanueva**, **Maya Dimaculangan**, **Carlo Reyes**). Gameplay seamlessly blends three interactive layers:
1. **2D Top-Down Exploration (Stardew Valley style)**: Walk in 8 directions across the outdoor Mars map and indoor station rooms (~30–40 seconds across the base) while a real-time Sol clock (~8 real minutes per Sol, no pause) transitions from bright daytime to orange dusk to dark battery-powered night.
2. **Hands-On Station Mini-Games (Among Us style)**: Interact with 8 core stations (**Control Room, Greenhouse, Solar Fields A & B, Life Support, Water & Ice Rig, Storm Shelter, Airlock / Suit Room, Galley & Crew Quarters** + **Comms Dish**) to play <1-minute mouse/touch mini-games (`Wipe Dust`, `Fix Wires`, `Align Dish/Panel`, `Mix Air`, `Wash Soil`, `Plant & Water`, `Seal a Leak`, `Stack Shielding`), each ending with a one-line **"Why this matters"** NASA tip.
3. **First-Person FNAF Control Room Console**: Sit at the Control Room desk anytime to monitor live **Camera Feeds** (max 1–2 active, each costing power), the **Sky Radar** (**Watch 30% → Warning 70% → Confirmed** + 30-second **Storm Rush** on Sol 2 while Carlo is outdoors), the shared **Battery Meter**, **Power Switches** (lamps, heating, cameras, shelter door motors), delayed **Earth Link**, **Alarm Log**, and **Crew Status**.

Every run ends with the **Flight Recorder Debrief** (timeline chart, auto-detected **Turning Point**, plain-language **Cause Chain**, **Real Fact Card** on the August 1972 Apollo solar storm, 1–3 star rating, and tappable **Real** / **Simplified** badges linked to the **Codex** and **NASA Sources** screen). All tunable values live in a single top-of-file `CONFIG` object for Denise and Raindel.

## Technical Context

**Language/Version**: Modern Vanilla JavaScript (ES6+), HTML5 Canvas + DOM/SVG, CSS3  
**Primary Dependencies**: None (Zero backend, zero external image/audio files, zero npm build steps per Constitution Principle V)  
**Rendering**: 2D HTML5 Canvas for top-down pixel-style outpost map, indoor rooms, day/dusk/night lighting shaders, corner minimap, and walking NPCs; crisp DOM/Canvas overlays for station mini-games, the first-person FNAF Control Room console, and the Flight Recorder timeline chart  
**Audio**: Synthesized Web Audio API (`AudioContext`) for daytime ambient hum, tense nighttime low drone, footsteps, mini-game chimes, and escalating Storm Rush sirens + visual sound captions & Mute toggle  
**Configuration**: Single `CONFIG` object at top of `app.js` (mirrored in `scenarios.json`) containing all resource crew-day rates, Sol timings, mini-game targets, storm schedules, and Real/Simplified science notes  
**Target Platform**: Desktop browsers (WASD/Arrows + `E` + Mouse) and Mobile browsers in landscape (on-screen virtual joystick + big Interact button + touch mini-games)  
**Performance Goals**: 60 FPS canvas loop, ≥44x44px touch targets, instant transition between Top-Down Map, Indoor Rooms, Mini-Games, and FNAF Console  

## Constitution Check

*GATE: All 5 Constitution v2.0.0 principles verified.*

1. **I. Single Top-of-Code Config for Non-Coders (NON-NEGOTIABLE)**: **PASS**  
   All numbers (timings, rates, ranges, event schedules, crew-day starting values, placeholder flags) live in `const CONFIG = { ... }` at line 1 of `app.js` and `scenarios.json`.
2. **II. Three-Mode Hybrid Loop (Top-Down Base + Hands-On Mini-Games + FNAF Control Room)**: **PASS**  
   Implements 2D top-down exploration (8 stations + interiors + 4 NPC crew), 8 tactile Among Us-style mini-games, and the sit-down FNAF Control Room console with "Stand up" toggle.
3. **III. Deep-Space Scarcity & Crew-Day Trade-Offs**: **PASS**  
   Uses plain-language `crew-days` (`Days of air`, `Days of water`, `Days of food`), `Battery %`, `Shielding Level 0–4`, `Mission dose bar`, `Equipment condition`, and `Crew morale` with real-time Sol clock pressure.
4. **IV. Honest NASA Science ("Real" vs. "Simplified" Badges, Sources & Flight Recorder)**: **PASS**  
   Every key number carries a tappable `Real` or `Simplified` badge; tasks show "Why this matters" tips; includes Codex, NASA Sources screen (DONKI, BVAD, Curiosity RAD, Opportunity 2018, ISS Veggie, MOXIE), and the Flight Recorder debrief with Turning Point and Cause Chain.
5. **V. Kid-Safe Tone (Ages 10–14) & Zero-Asset Browser/Phone Playability**: **PASS**  
   Plain words, cozy day / tense night mood, zero gore/monsters, crew loss shown strictly as **emergency medical evacuation**, procedural art + Web Audio API.

## Project Structure

### Documentation (this feature)

```text
specs/001-five-sol-progression/
├── spec.md              # Feature specification (Mission 1 "August 1972" hybrid game)
├── plan.md              # Implementation plan & technical architecture (this file)
└── tasks.md             # Actionable, dependency-ordered build tasks
```

### Source Code (repository root)

```text
.
├── index.html           # Viewport shell: HUD, Top-Down Canvas, Mini-Game Drawer, FNAF Console, Flight Recorder, Codex/Sources modals, Touch Controls
├── style.css            # Martian ochre/teal palette, FNAF dark CRT console, mini-game touch widgets, responsive landscape mobile layout, a11y toggles
├── app.js               # Top-of-file CONFIG object + 2D Map/Room Engine + NPC AI + 8 Mini-Games + FNAF Console + Storm Rush + Flight Recorder + Web Audio
├── scenarios.json       # External JSON mirror of CONFIG & Mission 1 ("August 1972") Sol 1–3 schedules for Denise & Raindel
└── README.md            # Team Bulalakaw play guide, placeholder audit list, and NASA sources summary
```

## Complexity Tracking

*Scope is intentionally locked to **Mission 1 ("August 1972", 3 Sols)** with 8 working stations and procedural 2D art/sound so the team delivers one complete, polished experience rather than ten half-working features.*
