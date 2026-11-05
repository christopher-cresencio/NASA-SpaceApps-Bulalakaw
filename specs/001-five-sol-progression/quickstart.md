# Quickstart & Verification Guide: Bulalakaw Station — Mission 1 ("August 1972")

**Feature**: `001-five-sol-progression`  
**Date**: 2026-11-05  

---

## 1. How to Launch & Play

1. Open [`index.html`](../../index.html) directly in any desktop or mobile browser, or serve locally:
   ```bash
   python3 -m http.server 8000
   ```
2. **Controls**:
   * **Desktop**: `WASD` or Arrow keys to walk in 8 directions, `E` (or click) to interact with stations/doors, `Esc` for menu/settings, Mouse for mini-games and FNAF console switches.
   * **Phone / Tablet (Landscape)**: On-screen virtual joystick (bottom-left), large **Interact** button (bottom-right), and touch gestures for mini-games and the Control Room console.

---

## 2. End-to-End Verification Checklist

### Test 1: Top-Down Base Exploration, Airlock Suit Rule & Autonomous Crew (US1)
1. Start **Mission 1 ("August 1972") — Sol 1**.
2. Walk around the outpost in 8 directions; verify smooth camera follow, building collision, and the corner minimap (~30–40s to cross the base).
3. Observe the 4 Filipino crewmates (**Dr. Liza Mabini**, **Engr. Andoy Villanueva**, **Maya Dimaculangan**, **Carlo Reyes**) walking at slower speed and showing speech bubbles.
4. Try to exit the **Airlock / Suit Room** to the outdoor solar fields without a suit -> verify you are prompted to run the **Suit Check** and put on your spacesuit first.

### Test 2: Hands-On Station Mini-Games & "Why This Matters" Tips (US2)
1. Visit the **Greenhouse** indoors: play **Wash Soil** (scrub tray to remove toxic perchlorates) and **Plant & Water** (drag seeds and water drops).
2. Exit through the **Airlock** (with suit on) to **Solar Fields A & B**: play **Wipe Dust** (drag across panel), **Align Panel** (rotate dial to green), and **Fix Wires** (connect matching wires).
3. Visit **Life Support**, **Water & Ice Rig**, **Storm Shelter**, **Galley**, and **Comms Dish**: complete **Mix Air**, **Seal a Leak**, **Stack Shielding**, **Cook/Rest**, and **Align Dish**.
4. **Expected Outcome**: Each mini-game finishes in under 1 minute, updates the corresponding crew-day resource meter, and displays a one-line **"Why this matters"** NASA fact with a tappable **Real** or **Simplified** badge.

### Test 3: First-Person FNAF Control Room Console (US3)
1. Enter the **Control Room** and interact with the main desk.
2. **Expected Outcome**: View switches to the dark first-person FNAF console ("in the chair").
3. Toggle **Camera Feeds** (Greenhouse, Solar Fields, Life Support, Airlock & Surface, Storm Shelter): verify max 1–2 feeds can be watched at once and each active feed increases battery drain.
4. Flip **Power Switches** (greenhouse lamps, heating level, shelter door motors) and send an **Earth Link** message (verify reply arrives after a communication delay).
5. Click **"Stand up"** -> verify immediate return to the 2D top-down Control Room.

### Test 4: Sol 2 "August 1972" Storm Escalation, Storm Rush & Carlo's EVA Dilemma (US4)
1. Observe the **Sky Radar** progress from **Watch (30%)** at the end of Sol 1 to **Warning (70%)** on Sol 2 afternoon while **Carlo Reyes** is outdoors on an EVA.
2. Near dusk on Sol 2, observe the flare & particle front reach **Confirmed (<1 min away)**, triggering **Storm Rush**:
   * Sirens sound, lights flash red, and a **30-second countdown** starts.
   * Carlo hesitates slightly outdoors because he wants to finish his geology task.
   * Recall Carlo through the Airlock, gather all 4 crew in the **Storm Shelter**, and close the shelter doors.
3. Advance to **Sol 3**: clean post-storm dust off the solar panels and survive the nighttime **dust-wall** battery test.

### Test 5: Flight Recorder Debrief, Real/Simplified Badges & NASA Sources (US5)
1. Complete Sol 3 (or trigger an early emergency evacuation).
2. **Expected Outcome**: The **Flight Recorder** debrief opens, showing:
   * Timeline chart of Power (`Battery %`), Radiation Dose, and Crew Safety with player actions marked.
   * The auto-detected **Turning Point** decision.
   * A plain-language **Cause Chain**.
   * The **August 1972 Real Fact Card**, 1–3 star rating, and **"Try Again"** button.
3. Open the **Codex** and **Sources screen** to verify citations for NASA DONKI, BVAD, Curiosity RAD, Opportunity 2018 dust storm, ISS Veggie, and Perseverance MOXIE.
