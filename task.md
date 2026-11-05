# Tasks: Project Bulalakaw Prototype

- [x] **Phase 1: Project Setup & Data Modeling**
  - [x] Define the JSON data schema in `scenarios.json` with *Case 01: The Dust Storm Freeze* (timeline, resource deltas, decisions, NASA science citations)
  - [x] Set up clean HTML5 boilerplate structure in `index.html` with designated telemetry, timeline, and log viewports

- [x] **Phase 2: Simulation Logic & Engine**
  - [x] Implement deterministic state calculation in `app.js` (calculating Sols 1–18 telemetry for all 4 resources)
  - [x] Implement decision branch logic (recalculating the timeline upon player override)

- [x] **Phase 3: Interactive UI & Telemetry Dashboard**
  - [x] Build interactive Sol timeline scrubber with event flags and active Sol indicator
  - [x] Implement animated resource gauges (Power, Life Support, Food, Radiation) reflecting current Sol data
  - [x] Implement crew log transmission reader with English/Taglish voice notes
  - [x] Build the Decision Override interface with immediate recalculation feedback
  - [x] Build the NASA Science Educational Fact Box citing real data

- [x] **Phase 4: Styling & Visual Polish**
  - [x] Apply dark sci-fi mission control theme in `style.css` (high contrast, responsive for desktop and mobile)
  - [x] Style critical alerts (<20% thresholds, alarms, mission outcome banners)

- [x] **Phase 5: Verification & Deliverable Review**
  - [x] Verify timeline scrubbing updates all gauges and log entries smoothly
  - [x] Verify default failure sequence (Sol 18 failure) and successful branch after override
  - [x] Add instructions in `README.md` for team members to run and edit scenarios
