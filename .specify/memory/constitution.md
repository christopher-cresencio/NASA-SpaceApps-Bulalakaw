<!--
Sync Impact Report:
- Version change: 1.0.0 → 2.0.0 (MAJOR: Expanded core gameplay paradigm from FNAF-only desk to the full "Bulalakaw Station" hybrid: 2D Top-Down Outpost + Among Us Mini-Games + First-Person FNAF Control Room + Flight Recorder Debrief across the 3-Sol "August 1972" Mission 1)
- Modified principles:
  - I. Data-Driven Content for Non-Coders → I. Single Top-of-Code Config for Non-Coders (NON-NEGOTIABLE)
  - II. Tactile FNAF-Style Multitasking Over Text Walls → II. Three-Mode Hybrid Loop (Top-Down Base + Hands-On Mini-Games + FNAF Control Room)
  - III. Four-Resource Tension & Shared Power Pool → III. Deep-Space Scarcity & Crew-Day Trade-Offs
  - IV. Mars-First Scope & Verified NASA Science → IV. Honest NASA Science ("Real" vs. "Simplified" Badges, Sources & Flight Recorder)
  - V. Zero-Friction Browser & Mobile Accessibility → V. Kid-Safe Tone (Ages 10–14) & Zero-Asset Browser/Phone Playability
- Updated sections:
  - Team Structure & Role Fluidity
  - Hackathon Quality Gates
- Templates requiring updates:
  - ✅ .specify/memory/constitution.md
  - ✅ specs/001-five-sol-progression/spec.md
  - ✅ specs/001-five-sol-progression/plan.md
  - ✅ specs/001-five-sol-progression/data-model.md
  - ✅ specs/001-five-sol-progression/tasks.md
-->
# Bulalakaw Station (Team Bulalakaw) Constitution

## Core Principles

### I. Single Top-of-Code Config for Non-Coders (NON-NEGOTIABLE)
All tunable numbers—sol duration (~8 real minutes), resource starting values (in crew-days), drain/production rates, solar & battery parameters, mini-game thresholds, space-weather schedules, and educational text—MUST live in **one single `CONFIG` object at the top of the code** (and mirrored in `scenarios.json`). Non-programmer teammates on Research & Design (Denise and Raindel) MUST be able to edit balance, timings, and copy in one place without hunting through simulation or rendering code.

### II. Three-Mode Hybrid Loop (Top-Down Base + Hands-On Mini-Games + FNAF Control Room)
Live gameplay MUST seamlessly combine three interactive modes with **no pause during play** (while the real-time Sol clock keeps ticking) and **no spreadsheet-style dashboards or "advance turn" buttons**:
1. **2D Top-Down Outpost Exploration (Stardew Valley style):** The commander walks in 8 directions across a compact, hand-made Mars outpost map (crossable in ~30–40 seconds) with indoor room transitions, a corner minimap, and 4 autonomous Filipino NPC crewmates (**Dr. Liza Mabini**, **Engr. Andoy Villanueva**, **Maya Dimaculangan**, and **Carlo Reyes**).
2. **Hands-On Station Mini-Games (Among Us style):** Interacting with stations launches <1-minute tactile mini-games (wipe dust, fix wires, align dish/panel, mix air, wash soil perchlorates, plant/water, seal leak, stack shielding) operable with both mouse and phone thumb.
3. **First-Person FNAF Control Room Console:** Sitting at the Control Room desk switches to a dark first-person console with camera feeds (which each cost power to watch), a Sky Radar (Watch 30% → Warning 70% → Confirmed + 30-second Storm Rush), a unified Battery meter, power switches, delayed Earth Link, alarm log, and crew status, with a "Stand up" button to return to walking anytime.

### III. Deep-Space Scarcity & Crew-Day Trade-Offs
Every design choice MUST teach one core lesson: **"Every watt, drop, and hour spent on one thing is taken from another, and in deep space help is too far away to arrive in time."**
- Supplies MUST be displayed in plain, kid-friendly units (**crew-days** for Oxygen, Water, and Food; `Battery %` for Power; `Level 0–4` for Shielding; `Mission dose bar` for cumulative Radiation; plus Equipment Condition and Crew Morale).
- Walking to a far station plus completing a mini-game consumes real Sol time, and running greenhouse lamps/heaters, life support, camera feeds, and shelter door motors drains the shared battery.

### IV. Honest NASA Science ("Real" vs. "Simplified" Badges, Sources & Flight Recorder)
- **Mission 1 ("August 1972")** MUST use the real solar particle event between Apollo 16 and Apollo 17 as an event pattern template scaled to the outpost (never claiming Mars received those exact lunar doses).
- Every key number MUST display a tappable **Real** or **Simplified** badge. Any unverified placeholder number (e.g., ~0.84 kg O₂/day, ~43% Earth sunlight, ~0.67 mSv/day baseline radiation) MUST be labeled **Simplified** until verified against NASA sources.
- The game MUST include:
  1. One-line **"Why this matters"** tips after completing station tasks.
  2. An in-game **Codex** and **Sources screen** citing NASA DONKI, NASA BVAD, Curiosity RAD, Opportunity 2018 dust storm records, ISS Veggie, and Perseverance MOXIE.
  3. A post-mission **Flight Recorder Debrief** showing a timeline of power/dose/crew safety, the automatically detected **Turning Point** decision, a plain-language **Cause Chain**, a **Real Fact Card**, and a 1–3 star rating.

### V. Kid-Safe Tone (Ages 10–14) & Zero-Asset Browser/Phone Playability
- **Tone & Safety:** Target players are ages 10 to 14. Language MUST use plain English words with zero unexplained unit jargon (`u/s`). Mood is warm and cozy by day, shifting to tense at night and during storms via lighting and audio. **No gore, no monsters, no jump scares, and no crew death**—any crew member who cannot be saved is shown as an **emergency medical evacuation**.
- **Zero-Dependency Technical Baseline:** The prototype MUST run in a web browser on desktop (WASD/Arrows + `E` + Mouse) and phone (landscape on-screen joystick + big interact button + touch) with **no backend**, drawing all placeholder visuals with code (Canvas/SVG/DOM) and generating all sound with the **Web Audio API**.

## Team Structure & Role Fluidity

* **Research & Design Leads (Denise Catamora, Raindel Devilla):** Own the top-of-file `CONFIG` / `scenarios.json` numbers, NASA source verification (converting `Simplified` placeholders to `Real` citations), age 10–14 Codex/debrief copy, and replacement art direction.
* **Core Programming Leads (Kent Chrysler Sabado, Red Colby, Jhon Rey Oquendo):** Own the 2D top-down map & indoor room engine, NPC crew routines, Among Us-style touch/mouse mini-games, FNAF Control Room console, Storm Rush sequence, Flight Recorder debrief, and Web Audio synthesis.
* **Team Lead (Christopher Cresencio):** Owns overall game vision, Spec Kit architecture alignment, scope discipline (1 polished Mission 1 over 10 half-working features), and NASA Space Apps submission deliverables.
* **Working Policy:** Roles indicate primary leads, not rigid silos.

## Hackathon Quality Gates

1. **Age 10–14 Readability Gate:** No screen may present walls of text or unexplained technical units; all resources use plain icons and crew-days.
2. **Hybrid Mode Transition Gate:** The player MUST be able to walk the base, enter at least 8 core stations to play <1-minute mini-games, sit at the Control Room desk to enter FNAF mode, and press "Stand up" to resume walking seamlessly.
3. **August 1972 Storm Rush & Carlo Dilemma Gate:** Sol 2 MUST execute the Watch (30%) → Warning (70%) → Confirmed progression and 30-second Storm Rush while Carlo Reyes is outdoors on an EVA, forcing a real trade-off on when to recall him.
4. **Flight Recorder & NASA Honesty Gate:** Every run (win or lose) MUST end with the Flight Recorder timeline, turning point, plain-language cause chain, Real/Simplified badges, and NASA Sources access.

## Governance

This Constitution governs all specifications (`spec.md`), implementation plans (`plan.md`), data models (`data-model.md`), and task lists (`tasks.md`) for Team Bulalakaw.

**Version**: 2.0.0 | **Ratified**: 2026-10-31 | **Last Amended**: 2026-11-05
