# Tasks: Bulalakaw Station — Mission 1 ("August 1972")

- [ ] **Phase 1: Single Top-of-Code `CONFIG` & NASA Science Data (`app.js`, `scenarios.json`)**
  - [ ] **T001**: Create the unified `CONFIG` object at the very top of `app.js` (and mirror in `scenarios.json`) containing Sol duration (~8 real minutes + fast demo speed toggle), initial crew-day supplies (`Power %`, `Days of air`, `Days of water`, `Days of food`, `Shielding 0–4`, `Mission dose`, `Morale`), drain/production rates, Sol 1–3 event schedules, and placeholder notes for Denise & Raindel.
  - [ ] **T002**: Author the **Real vs. Simplified** badge definitions, the age 10–14 **Codex** glossary entries, one-line **"Why this matters"** task tips, and the **Sources screen** citing NASA DONKI, NASA BVAD, Curiosity RAD, Opportunity 2018 dust storm, ISS Veggie, and Perseverance MOXIE.

- [ ] **Phase 2: 2D Top-Down Outpost Map, Indoor Rooms & Filipino Crew NPCs**
  - [ ] **T003**: Build the 2D top-down Canvas map (`app.js`) with Martian rust/ochre terrain, teal/white habitat buildings, paths, 8-direction player movement (WASD/Arrows + mobile on-screen virtual joystick), building collision, camera follow, and a corner minimap (crossable in ~30–40 seconds).
  - [ ] **T004**: Implement indoor room transitions for the 8 core stations (**Control Room, Greenhouse, Solar Fields A & B, Life Support, Water & Ice Rig, Storm Shelter, Airlock / Suit Room, Galley & Crew Quarters** + **Comms Dish**) and "Coming Soon" markers for **Workshop, Medbay, Landing Pad, and Rover Garage**.
  - [ ] **T005**: Implement the Airlock spacesuit gate (requiring Suit Check before exiting outdoors) and the 4 autonomous Filipino NPC crewmates (**Dr. Liza Mabini**, **Engr. Andoy Villanueva**, **Maya Dimaculangan**, **Carlo Reyes**) with walking paths, traits, individual dose/morale tracking, and speech bubbles.

- [ ] **Phase 3: Hands-On Station Mini-Games (Among Us Style, Mouse + Phone Touch)**
  - [ ] **T006**: Implement outdoor & power mini-games (<1 minute each, while Sol clock keeps ticking): **Wipe Dust** (drag across solar panels), **Align Dish/Panel** (rotate dial to green zone), and **Fix Wires** (drag matching colored wires).
  - [ ] **T007**: Implement indoor habitat mini-games: **Wash Soil** (scrub tray to clear toxic Martian perchlorates), **Plant & Water** (drag seeds and water drops in Greenhouse), **Mix Air** (dual O₂/CO₂ sliders in Life Support), **Seal a Leak** (tap/hold pipe crack in Water Rig/Life Support), **Stack Shielding** (grid block placement in Storm Shelter), **Suit Check** (Airlock), and **Cook / Rest** (Galley).
  - [ ] **T008**: Display a clear success/failure banner and the station's one-line **"Why this matters"** NASA fact with a tappable **Real / Simplified** badge after every mini-game.

- [ ] **Phase 4: First-Person FNAF Control Room Console**
  - [ ] **T009**: Implement the seamless transition when interacting with the Control Room desk to enter the first-person dark FNAF console ("in the chair") and the **"Stand up"** button to return to top-down walking at any time.
  - [ ] **T010**: Build the console subsystems: live **Camera Feeds** (Greenhouse, Solar Fields, Life Support, Airlock & Surface, Storm Shelter — max 1–2 active at once, each draining battery), **Sky Radar** with blip countdowns, big **Battery Meter**, **Power Switches** (greenhouse lamps, heating level, camera feeds, shelter door motors), delayed **Earth Link** advice terminal, **Alarm Log**, and **Crew Status** tracker.

- [ ] **Phase 5: Real-Time 3-Sol "August 1972" Campaign, Day/Night Clock & Storm Rush**
  - [ ] **T011**: Implement the real-time Sol clock (Day → orange Dusk warning → dark battery-only Night) with smooth lighting transitions, solar generation curves, random station breakdowns, and occasional helpful dust devils.
  - [ ] **T012**: Script the 3-Sol **Mission 1 ("August 1972")** progression:
    - **Sol 1 (Tutorial Day)**: Friendly guide walkthrough of movement, tasks, Control Room, and clock + late-day **Watch (30%)** radar hint.
    - **Sol 2 (Storm Day & Carlo's EVA Dilemma)**: Afternoon **Warning (70%)** while **Carlo Reyes** is outdoors → dusk **Confirmed** flare & particle front → 30-second **Storm Rush** (sirens, red flashing lights, recalling Carlo despite his hesitation to finish his EVA, sealing all 4 crew in the Storm Shelter).
    - **Sol 3 (Recovery & Dust Wall)**: Post-storm panel dust cleanup, supply recovery, and nighttime **dust-wall** battery test.
  - [ ] **T013**: Implement kid-safe win/lose rules (crew loss shown strictly as **emergency medical evacuation**, never death).

- [ ] **Phase 6: Flight Recorder Debrief, Web Audio API & Accessibility Polish**
  - [ ] **T014**: Build the **Flight Recorder Debrief** screen showing: (1) timeline chart of Power, Dose, and Crew Safety with player action markers, (2) automatically detected **Turning Point** decision, (3) plain-language **Cause Chain**, (4) **Real Fact Card** on the August 1972 solar storm between Apollo 16 and 17, (5) 1–3 star rating, and (6) **"Try Again"** button.
  - [ ] **T015**: Synthesize all sound effects with the **Web Audio API** (calm daytime hum, tense night drone, footsteps, task chimes, escalating Storm Rush sirens) and add visual sound captions, Mute toggle, text-size toggle, and reduced-motion option.
  - [ ] **T016**: Document placeholder numbers and deferred "Nice to have / Later" features in `README.md` for Denise, Raindel, Kent, Red, and Jhon Rey.
