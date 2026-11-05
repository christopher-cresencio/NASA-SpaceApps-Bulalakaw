# Interface Contract: Bulalakaw Station Hybrid Game Engine

**Feature**: `001-five-sol-progression`  
**Date**: 2026-11-05  

---

## 1. Single Top-of-Code Configuration (`CONFIG` in `app.js` & `scenarios.json`)

* **`CONFIG`**: Global configuration object placed at line 1 of `app.js` so non-programmers (Denise & Raindel) can edit all timings, crew-day starting supplies, drain/production rates, storm schedules, mini-game targets, and Real/Simplified science badges in one place.

---

## 2. Mode & View Router (`viewMode`)

* **States**:
  * `"TOP_DOWN_OUTDOORS"`: 2D top-down view of the Martian surface, habitat buildings, paths, Solar Fields A/B, Water & Ice Rig, Comms Dish, and placeholders (Landing Pad, Rover Garage).
  * `"TOP_DOWN_INDOORS"`: 2D interior room view of the entered building (Control Room, Greenhouse, Life Support, Storm Shelter, Airlock / Suit Room, Galley & Crew Quarters, or placeholders Workshop & Medbay).
  * `"MINI_GAME"`: Interactive mouse/touch mini-game overlay (`Wipe Dust`, `Fix Wires`, `Align Dish/Panel`, `Mix Air`, `Wash Soil`, `Plant & Water`, `Seal a Leak`, `Stack Shielding`, `Suit Check`, `Cook/Rest`) while the real-time Sol clock continues ticking.
  * `"FNAF_CONSOLE"`: First-person dark Control Room desk console with Camera Feeds (max 2 active, each costing power), Sky Radar, Battery Meter, Power Switches, delayed Earth Link, Alarm Log, Crew Status, and **"Stand up"** button.
  * `"FLIGHT_RECORDER"`: Post-mission debrief screen showing the timeline chart, Turning Point, plain-language Cause Chain, August 1972 Real Fact Card, 1–3 star rating, and **"Try Again"** button.

---

## 3. Space Weather & Storm Rush Contract

* **Sky Radar Escalation**:
  * `CLEAR` → `WATCH_30` (30% chance, late Sol 1 hint) → `WARNING_70` (70% chance, Sol 2 afternoon while Carlo is outdoors) → `CONFIRMED` (flare detected) → `STORM_RUSH` (30-second siren & red light scramble when particles are <1 min away) → `ACTIVE_STORM`.
* **Carlo EVA Recall**:
  * Triggering recall during `WARNING_70` brings Carlo inside safely before the storm hits (costing outdoor work time).
  * Waiting until `STORM_RUSH` triggers Carlo's hesitation ("Almost done with this sample!"), requiring an urgent recall boost, Airlock cycle, and Storm Shelter door seal within 30 seconds.

---

## 4. Web Audio API & Accessibility Contract

* **Synthesized Sound Effects (`AudioContext`)**:
  * `dayHum`: Warm low-frequency ambient hum during sunlit hours.
  * `nightDrone`: Deeper, tenser ambient tone during battery-only night hours.
  * `footstep`: Soft rhythmic step sound while walking.
  * `taskSuccess`: Bright harmonic chime when a mini-game completes.
  * `stormSiren`: Escalating alert tone during Warning / Storm Rush.
* **Accessibility Controls**:
  * On-screen visual captions for all alert sounds, HUD Mute toggle, adjustable text size, icon+pattern coding alongside color, and reduced-motion toggle.
