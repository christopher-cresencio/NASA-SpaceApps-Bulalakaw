# Implementation Plan - Project Bulalakaw: Mars Flight Recorder (Interactive Prototype)

## Goal
Build an interactive, zero-dependency web prototype of **"Project Bulalakaw: Mars Flight Recorder"** that Christopher can immediately demonstrate to Team Bulalakaw (Denise, Raindel, Kent, Red, and Jhon Rey). The prototype will prove the core concept: investigating a failed Martian outpost mission by scrubbing a timeline, identifying the critical engineering decision, overriding it, and recalculating the timeline to achieve mission success.

## Tech Stack & Key Decisions
* **Tech Stack:** Modern Vanilla HTML5, CSS3, and JavaScript (ES6 Modules) with an external `scenarios.json`.
  * *Justification:* Zero build steps or `npm install` needed. Anyone on the team—including non-coders Denise and Raindel—can open `index.html` directly in any web browser, inspect the layout, and edit `scenarios.json` to add new stories.
* **Architecture:** Decoupled Data & View.
  * The state simulation engine takes an initial mission state + an array of Sol deltas + player overrides, and computes the telemetry array deterministically.
* **Aesthetics:** Sleek dark-mode aerospace telemetry terminal ("Bulalakaw Outpost Flight Recorder // PhilSA-NASA Joint Mission").

## Proposed Changes

### Core Prototype Files

#### [NEW] `index.html`
* Telemetry dashboard layout:
  * Header with mission status badge (`MISSION TERMINATED - SOL 18` vs `MISSION SUCCESSFUL`).
  * Interactive Sol timeline scrubber (Sols 1–18) with color-coded event markers.
  * 4 telemetry meters: Power (kW/Battery %), Life Support (O₂/H₂O %), Food Reserves (kcal/days), Radiation Dose (mSv).
  * Crew log transcript panel with timestamped comms (bilingual English/Taglish).
  * Decision Override modal / panel at the root-cause Sol.
  * Educational NASA fact box with real citations.

#### [NEW] `style.css`
* Responsive terminal UI with sci-fi telemetry styling (clean typography, glowing status gauges, clear critical alert states).
* Mobile-responsive layout for quick testing on phones.

#### [NEW] `app.js`
* Deterministic simulation engine:
  * Calculates daily resource values from Sols 1 to 18.
  * Evaluates override branches (e.g., Sol 6: Default choice = Failure cascade vs Override choice = Survival).
  * Manages UI reactivity when scrubbing timeline or toggling decisions.

#### [NEW] `scenarios.json`
* Standalone sample scenario: *Case 01: The Dust Storm Freeze*.
* Demonstrates to Denise & Raindel the exact JSON schema for writing future cases (events, choices, resource deltas, NASA citations).

## Open Questions / Risks
* *Scope Check:* Lunar outpost is intentionally omitted to keep focus 100% on Mars.
* *Browser Support:* Native ES modules are supported in all modern browsers; for local file opening (`file://`), a lightweight inline fallback or simple local server will be documented.

## Verification Plan
1. **Interactive Scrubber:** Clicking or dragging across Sols 1 to 18 updates all 4 resource meters and displays matching crew logs.
2. **Failure State Verification:** On default run, telemetry shows Power collapse at Sol 6, greenhouse freeze at Sol 9, and crew starvation/mission failure at Sol 18.
3. **Override & Recalculate:** Selecting the alternative engineering decision on Sol 6 updates the simulation; all resources remain in safe thresholds through Sol 18, triggering the "Mission Restored" state.
4. **NASA Factoid Validation:** NASA benchmark citations display correctly in the educational debrief panel.
