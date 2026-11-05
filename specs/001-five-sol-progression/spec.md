# Feature Specification: Bulalakaw Station — Mission 1 ("August 1972")

**Feature Branch**: `001-five-sol-progression`

**Created**: 2026-10-31 | **Updated**: 2026-11-05

**Status**: Approved Scope (v3 Hybrid Architecture — Top-Down Outpost + Station Mini-Games + FNAF Control Room + Flight Recorder)

**Input**: Updated handoff specification from `mars_outpost_game_prompt.md`, `sol_night_build_prompt.md`, and `bulalakaw_handoff_context (1).md`: Build **Mission 1 ("August 1972")** of **Bulalakaw Station**, a 3-Sol playable prototype for ages 10–14 combining 2D top-down exploration (Stardew Valley style), <1-minute hands-on station mini-games (Among Us style), a sit-down first-person Control Room console (Five Nights at Freddy's style), real space-weather escalation (Watch 30% → Warning 70% → Confirmed → 30-second Storm Rush with Carlo's outdoor EVA dilemma), and a post-mission Flight Recorder debrief with Real/Simplified badges and NASA dataset sources.

## Clarifications & Locked Decisions

### Session 2026-11-05 (Handoff Alignment)

- **Core Gameplay Architecture**: **Option A (`mars_outpost_game_prompt.md`)** — 2D top-down outpost exploration (Stardew Valley style) + <1-minute hands-on station mini-games (Among Us style) + sit-down first-person FNAF Control Room console across a **3-Sol Mission 1 ("August 1972")**, ending with the **Flight Recorder** debrief.
- **Core Lesson**: *"Every watt, drop, and hour spent on one thing is taken from another, and in deep space help is too far away to arrive in time."*
- **Target Age & Tone**: Ages 10 to 14. Plain words (crew-days, Battery %, no `u/s` jargon). Warm and cozy by day; tense at night and during storms via lighting and Web Audio sound. **No gore, no monsters, no jump scares**—any crew member who cannot be saved is shown as an **emergency medical evacuation**, never death.
- **Single Config Object**: Every tunable number (sol length ~8 real mins, resource rates, mini-game timings, storm schedule, placeholder constants) lives in **one single `CONFIG` object at the top of the code** (and mirrored in `scenarios.json`) so Denise and Raindel can edit values directly.
- **Honest NASA Science**: Every key metric shows a tappable **Real** or **Simplified** badge, backed by a **Codex** and a **Sources screen** (NASA DONKI, BVAD, Curiosity RAD, Opportunity 2018 dust storm, ISS Veggie, Perseverance MOXIE).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Top-Down Outpost Exploration, Indoor Rooms & Autonomous Crew (Priority: P1)

As the outpost commander (ages 10–14), I want to walk around a compact 2D Martian base and its outdoor surroundings, enter habitat buildings as interior rooms, and see my four Filipino crewmates (**Dr. Liza Mabini**, **Engr. Andoy Villanueva**, **Maya Dimaculangan**, **Carlo Reyes**) walking around and talking in speech bubbles, so that the outpost feels like a living, cozy home during the day and a vulnerable shelter at night.

**Why this priority**: P1 establishes the spatial world, the day/night clock (~8 real minutes per Sol, no pause), the Airlock suit rule before going outdoors, and the time-cost of walking between stations (30–40 seconds across the map).

**Independent Test**: Walk in 8 directions across the outdoor map and indoor rooms using WASD/Arrows (or mobile joystick), verify collision with buildings, check the corner minimap, try exiting the Airlock without a suit (blocked until Suit Check is done), and observe NPC crew walking and showing speech bubbles.

**Acceptance Scenarios**:

1. **Given** the commander is inside the base, **When** the player uses WASD/Arrow keys or the on-screen mobile joystick, **Then** the commander walks smoothly in 8 directions with camera follow and a live corner minimap.
2. **Given** the commander walks up to one of the 8 core stations (Control Room, Greenhouse, Solar Fields A & B, Life Support, Water & Ice Rig, Storm Shelter, Airlock/Suit Room, Galley & Crew Quarters + Comms Dish), **When** entering an indoor building, **Then** the view transitions cleanly into that station's interior room (and shows "Coming Soon" placeholders for Workshop, Medbay, Landing Pad, and Rover Garage).
3. **Given** the commander wants to walk outdoors to Solar Fields A/B, Water & Ice Rig, or Comms Dish, **When** passing through the Airlock / Suit Room, **Then** the player must complete the Suit Check & put on a spacesuit first.
4. **Given** a Sol is running (~8 real minutes per Sol), **When** daytime shifts to dusk ("Sunset in X minutes") and night, **Then** ambient light shifts smoothly from warm Martian rust/orange to deep night blue, building lights turn on, solar power generation drops to 0, and Web Audio ambient hum shifts to a lower, tenser night tone.

---

### User Story 2 - Hands-On Station Mini-Games & "Why This Matters" Tips (Priority: P1)

As a player visiting stations across the outpost, I want to press Interact (`E` or big touch button) to complete short (<1 minute), tactile Among Us-style mini-games while the Sol clock keeps ticking, so that I directly maintain power, oxygen, water, food, and shielding and learn a one-line NASA fact after each task.

**Why this priority**: Station tasks are the heart of daily resource management and create the core time-vs-resource trade-off.

**Independent Test**: Visit each of the 8 core stations, trigger and complete each mini-game with both mouse and touch, verify that the target resource meter updates (`Power`, `Oxygen`, `Water`, `Food`, `Shielding`, `Equipment Condition`, `Crew Morale`), and confirm a one-line "Why this matters" tip appears with a Real/Simplified badge.

**Acceptance Scenarios**:

1. **Given** the commander is at **Solar Fields A & B**, **When** interacting with a dusty or sparking panel, **Then** the player completes **Wipe Dust** (drag across panel to clear dust patches), **Align Panel** (rotate dial until bar turns green), or **Fix Wires** (drag matching colored wires), restoring daytime solar generation.
2. **Given** the commander is in the **Greenhouse**, **When** interacting with plant beds, **Then** the player completes **Wash Soil** (scrub tray repeatedly until toxic perchlorate contamination bar drops) and **Plant & Water** (drag seed packets to beds and water drops to plants), increasing **Food (Days of food)** and a small **Oxygen** bonus.
3. **Given** the commander is in **Life Support** or **Water & Ice Rig**, **When** interacting with tanks/pipes, **Then** the player completes **Mix Air** (keep two O₂/CO₂ sliders in the green zone) or **Seal a Leak** (tap/hold crack before pressure drops), maintaining **Days of air** and **Days of water**.
4. **Given** the commander is in the **Storm Shelter**, **When** interacting with the shelter walls, **Then** the player completes **Stack Shielding** (place regolith blocks on a grid with no gaps), raising **Shielding (Level 0 to 4)**.
5. **Given** any station task finishes, **Then** a clear success/failure banner appears along with a one-line **"Why this matters"** real NASA fact and a tappable **Real** or **Simplified** badge.

---

### User Story 3 - First-Person FNAF Control Room Console (Priority: P1)

As the commander sitting down at the Control Room desk, I want the screen to switch to a first-person dark console with camera feeds (which cost battery power to watch), a Sky Radar, a unified Battery meter, power switches, delayed Earth Link, alarm log, and crew status, so that I can monitor the whole base and manage night/storm crises from "the chair."

**Why this priority**: The FNAF Control Room console is where night tension and storm survival live, directly connecting base exploration with high-stakes power management.

**Independent Test**: Walk to the Control Room main desk, press Interact to sit down, toggle camera feeds (verifying only 1–2 can be watched at once and each active feed drains extra battery), flip power switches (greenhouse lamps, heating level, shelter door motors), send an Earth Link query (observing the realistic communication delay), and press "Stand up" to return to top-down walking.

**Acceptance Scenarios**:

1. **Given** the player sits at the Control Room desk, **When** viewing the first-person console, **Then** the player sees camera feeds for Greenhouse, Solar Fields, Life Support, Airlock & Surface, and Storm Shelter, limited to watching 1 or 2 feeds at a time, with each active feed visibly adding to Battery drain.
2. **Given** the battery is draining at night or during a storm, **When** the player toggles **Power Switches** (greenhouse lamps, heating level, camera feeds, shelter door motors), **Then** battery drain responds immediately, forcing trade-offs between warmth, crops, visibility, and door speed.
3. **Given** the player clicks **Earth Link** to ask Earth for advice, **When** the message is sent, **Then** the reply arrives only after a realistic one-way light-time delay—teaching why deep-space crews must make time-critical decisions on their own.
4. **Given** the player is in the FNAF console, **When** clicking **"Stand up"**, **Then** the view immediately returns to the 2D top-down Control Room so the commander can walk again.

---

### User Story 4 - 3-Sol "August 1972" Campaign, Sky Radar & Storm Rush with Carlo's EVA Dilemma (Priority: P1)

As the commander playing Mission 1 ("August 1972" across 3 Sols), I want to experience space weather escalating on the Sky Radar from **Watch (30%) → Warning (70%) → Confirmed** and survive the 30-second **Storm Rush** on Sol 2 when **Carlo Reyes** is outdoors on an EVA and resists returning before finishing his job, so that I feel the real tension of uncertainty, false alarms, and protecting my crew.

**Why this priority**: This is the signature dramatic and educational centerpiece of the game.

**Independent Test**: Play through Sol 1 (tutorial + end-of-sol Watch 30% hint), Sol 2 (afternoon Warning 70% while Carlo is outdoors -> dusk Confirmed flare -> 30-second Storm Rush siren & red flashing lights -> recall Carlo through the Airlock and seal all 4 crew in the Storm Shelter), and Sol 3 (post-storm dust recovery + nighttime dust-wall battery test).

**Acceptance Scenarios**:

1. **Given** **Sol 1 (Tutorial Day)** is active, **When** the friendly guide walks the player through movement, station tasks, the Control Room console, and the day clock, **Then** a small **Watch (30%)** alert appears on the Sky Radar near the end of Sol 1 as a hint.
2. **Given** **Sol 2 (Storm Day)** is in the afternoon, **When** **Warning (70%)** appears on the Sky Radar while geologist **Carlo Reyes** is outdoors, **Then** the player must judge whether to shelter early (losing work time) or let Carlo keep working.
3. **Given** the particle front reaches <1 minute ETA near dusk on Sol 2 (**Confirmed**), **When** **Storm Rush** triggers, **Then** sirens sound, lights flash red, a 30-second countdown begins, and Carlo resists slightly because he wants to finish his outdoor job—requiring the commander to recall Carlo through the Airlock and get all 4 crew into the Storm Shelter with doors closed.
4. **Given** **Sol 3 (Recovery Day)** begins after the storm, **When** dust coats the solar panels and supplies are lower, **Then** the player must clean panels, restore supplies, and survive a nighttime **dust-wall event** (inspired by Opportunity's 2018 dust storm) that tests battery reserves.
5. **Given** any crew member's radiation dose exceeds the mission cap or oxygen/power fully runs out, **When** a loss condition triggers, **Then** crew loss is shown strictly as an **emergency medical evacuation** (never gore or death) with a gentle explanation.

---

### User Story 5 - Post-Mission Flight Recorder Debrief, Codex & NASA Sources (Priority: P2)

As a student finishing Sol 3 (or evacuating early), I want to see the **Flight Recorder** debrief with a timeline of my power, radiation dose, and crew safety, my **Turning Point** decision, a plain-language **Cause Chain**, a **Real Fact Card** about the August 1972 solar storm, star ratings, and tappable **Real / Simplified** badges linked to the NASA **Sources screen**, so that my own choices become the science lesson.

**Why this priority**: Turns gameplay directly into the educational takeaway required by the NASA Space Apps rubric.

**Independent Test**: Complete Sol 3 or trigger an early evacuation, inspect the Flight Recorder modal, verify the timeline chart marks player actions, read the auto-detected Turning Point and Cause Chain, tap a Real/Simplified badge, and open the Codex and NASA Sources screen.

**Acceptance Scenarios**:

1. **Given** Mission 1 ends in victory (all 4 crew safe, dose under cap, supplies above minimum after Sol 3) or failure/evacuation, **When** the **Flight Recorder** screen opens, **Then** it renders:
   - A visual timeline of Power (`Battery %`), Radiation Dose, and Crew Safety with key player actions marked.
   - The automatically identified **Turning Point** decision that mattered most.
   - A plain-language **Cause Chain** (e.g., *"You kept the greenhouse lamps on all night → battery was low when the storm hit → shelter doors moved slowly"*).
   - A **Real Fact Card** on the August 1972 solar event between Apollo 16 and 17, plus a 1–3 star rating and a **"Try Again"** button.
2. **Given** the player views any key science metric in the HUD, task tips, or debrief, **When** tapping the **Real** or **Simplified** badge, **Then** a short note explains whether the number is an exact NASA benchmark or simplified for gameplay, and links to the **Sources screen** (NASA DONKI, BVAD, Curiosity RAD, Opportunity 2018 dust storm, ISS Veggie, Perseverance MOXIE).

---

### Edge Cases

- **No Pause During Active Play**: Opening the Esc menu allows quitting or toggling accessibility settings (text size, reduced motion, sound captions, mute), but gameplay does not use a "pause-and-plan" or "advance turn" button—time pressure is part of the lesson.
- **Outdoor Suit & Night Risk**: Attempting to exit the Airlock without completing the Suit Check is prevented; staying outdoors at night exposes the player to freezing cold and limited suit oxygen.
- **Battery Zero Load-Shedding**: If Battery reaches 0% at night, non-essential systems (greenhouse lamps, heating, camera feeds, shelter door motors) shut down or slow down before life support fails completely, creating a visible cause chain in the Flight Recorder.
- **Dust Devil Bonus**: An occasional Martian dust devil sweeping across the solar fields can clean panels for free (mirroring real Mars rover history), rewarding observant commanders.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Single Config Object)**: All game numbers (timings, resource starting values in crew-days, drain/production rates, storm schedules, mini-game parameters) MUST reside in one `CONFIG` object at the top of the code (and mirrored in `scenarios.json`).
- **FR-002 (2D Top-Down Map & Indoor Rooms)**: System MUST provide a compact 2D top-down outpost map (~30–40s walking width) with 8-direction movement, building collision, smooth camera follow, a corner minimap, and interior room views when entering buildings.
- **FR-003 (8 Core Playable Stations)**: Prototype MUST implement 8 fully playable stations—**Control Room, Greenhouse, Solar Fields A & B, Life Support, Water & Ice Rig, Storm Shelter, Airlock / Suit Room, Galley & Crew Quarters** (plus **Comms Dish**)—with at least 2 tasks each, and clean "Coming Soon" placeholders for **Workshop, Medbay, Landing Pad, and Rover Garage**.
- **FR-004 (Hands-On Mini-Games)**: System MUST provide <1-minute mouse- and thumb-friendly mini-games across the stations: **Wipe Dust**, **Fix Wires**, **Align Dish/Panel**, **Mix Air**, **Wash Soil**, **Plant & Water**, **Seal a Leak**, and **Stack Shielding**.
- **FR-005 (First-Person FNAF Console)**: Interacting with the Control Room desk MUST switch to a first-person dark console containing: live **Camera Feeds** (max 1–2 active at once, each costing battery power), **Sky Radar**, **Battery Meter**, **Power Switches** (lamps, heating, cameras, shelter door motors), delayed **Earth Link**, **Alarm Log**, **Crew Status**, and a **"Stand up"** button.
- **FR-006 (Real-Time Sol Clock & Day/Night Cycle)**: Game MUST run in real time (~8 real minutes per Sol, configurable; plus a fast demo speed toggle for judging) with smooth Day → Dusk ("Sunset in X minutes") → Night lighting transitions, solar generation during daytime, and battery-only operation at night.
- **FR-007 (Plain-Language Crew-Day HUD)**: HUD MUST display icon-based meters using plain words for ages 10–14: **Power (`Battery %`)**, **Oxygen (`Days of air`)**, **Water (`Days of water`)**, **Food (`Days of food`)**, **Shielding (`Level 0 to 4`)**, **Radiation Dose (`Mission dose bar`)**, **Equipment Condition**, and **Crew Morale (`Smile meter`)**.
- **FR-008 (Filipino Crew NPCs)**: System MUST feature 4 named Filipino crew members (**Dr. Liza Mabini**, **Engr. Andoy Villanueva**, **Maya Dimaculangan**, **Carlo Reyes**) who walk around at slower speed, perform background chores, speak in short speech bubbles, and have individual health, radiation dose, morale, and a helpful trait.
- **FR-009 (Mission 1 "August 1972" 3-Sol Arc & Storm Rush)**: System MUST execute the 3-Sol "August 1972" mission:
  - **Sol 1**: Friendly tutorial guide + late-day **Watch (30%)** radar hint.
  - **Sol 2**: Afternoon **Warning (70%)** with **Carlo Reyes** outdoors → dusk **Confirmed** flare & particle front → 30-second **Storm Rush** (sirens, flashing red lights, recalling Carlo despite his hesitation to finish his EVA, sealing all crew in the Storm Shelter).
  - **Sol 3**: Post-storm dust recovery + nighttime **dust-wall** battery test.
- **FR-010 (Flight Recorder Debrief)**: Upon completing Sol 3 or triggering a loss/evacuation, the system MUST render the **Flight Recorder** displaying: (1) power/dose/safety timeline with player actions marked, (2) the **Turning Point** decision, (3) plain-language **Cause Chain**, (4) **Real Fact Card** with NASA source, (5) 1–3 star rating, and (6) **"Try Again"** button.
- **FR-011 (Teaching Layer: Tips, Badges, Codex & Sources)**: Every completed task MUST show a one-line **"Why this matters"** tip; key numbers MUST carry tappable **Real** or **Simplified** badges; and players MUST be able to open the **Codex** and **Sources screen** (NASA DONKI, BVAD, Curiosity RAD, Opportunity 2018 dust storm, ISS Veggie, Perseverance MOXIE).
- **FR-012 (Web Audio & Accessibility)**: All audio MUST be synthesized via the **Web Audio API** (day hum, tense night drone, footsteps, task chimes, escalating storm alarms) with sound captions, mute toggle, adjustable text size, icon+pattern encoding alongside color, and a reduced-motion option.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001 (Age 10–14 Comprehension)**: A 10-to-14-year-old player can walk the base, complete a station mini-game, and use the Control Room console on Sol 1 without external instructions or encountering unexplained unit jargon.
- **SC-002 (Cross-Device Touch & Mouse Operability)**: All 8 mini-game types, 8-direction movement (WASD/Arrows + on-screen mobile joystick), and FNAF console switches work smoothly on both desktop and phone (landscape) with ≥44x44px touch targets.
- **SC-003 (Complete 3-Sol Playable Loop)**: Mission 1 ("August 1972") is 100% playable from Sol 1 tutorial through Sol 2 Storm Rush and Sol 3 dust-wall recovery into the Flight Recorder debrief.
- **SC-004 (100% Science Transparency)**: Every NASA benchmark or gameplay-adjusted number is explicitly badged **Real** or **Simplified**, and all 6 NASA reference sources are viewable on the Sources screen.
- **SC-005 (Single-Place Tuning)**: Changing a value in the top-of-file `CONFIG` object immediately updates the corresponding in-game timer, resource rate, or event schedule without modifying any other code.
