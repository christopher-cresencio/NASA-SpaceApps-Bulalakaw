# Five Sols at Bulalakaw // Mars Outpost Survival (5-Sol Demo)

An interactive, browser-based **Five Nights at Freddy's (FNAF)** style outpost survival game created for **Team Bulalakaw** (NASA Space Apps Challenge — *Build a Junior Astronaut Mission Trainer*).

---

## How to Play & Demo to the Team
1. **Launch:** Double-click [`index.html`](./index.html) in any browser (Chrome, Safari, Edge, Firefox). No installation or build setup required!
2. **Select a Sol:** Use the top bar to choose **Sol 1** through **Sol 5**.
   * *Tip for quick team / judge demo:* Click **`⚡ Judge Demo: Unlock All Sols`** to immediately unlock all 5 Sols without playing them sequentially.
   * *Sound control:* Click **`🔊 Sound ON` / `🔇 Muted`** anytime to toggle alarm audio.
3. **Start the Shift:** Read the commander briefing, then click **`▶ START NIGHT SHIFT`**.
4. **The Goal:** Survive from **12:00 AM to 6:00 AM** (60 real-time seconds) without letting **Battery %** hit 0%, and keeping Oxygen, Crop Temperature, and Radiation in safe levels.

---

## The 5-Sol Hazard Learning Curve
* **Sol 1 (The Night Freeze):** Outside Mars temperature is **-60°C**. Crops on **CAM 03** will freeze unless you pulse the **`🔥 GREENHOUSE HEATERS`** switch. (Learn to pulse the heater so it doesn't kill your battery before dawn!)
* **Sol 2 (The Red Dust Front):** Adds red dust storms on **CAM 01**. When `[!]` blinks on CAM 01, switch there and click **`🧹 DEPLOY WIPER DRONE`** to stop +1 bar of extra battery drain.
* **Sol 3 (Filter Infiltration):** Martian regolith clogs the life support intake on **CAM 02**. Oxygen begins decaying! Switch to CAM 02 to thump the filter or flip the **`💨 TURBO O₂ SCRUBBER`** switch.
* **Sol 4 (The Solar Particle Wave):** A high-energy solar flare strikes on **CAM 04**. Slam the **`🛡️ LEAD BLAST SHUTTER`** CLOSED (+2 Power Bars). As soon as the flare passes, **OPEN it immediately** to save battery!
* **Sol 5 (The Martian Gauntlet):** All 4 hazards strike concurrently! Manage all 4 rooms to earn the **Junior Astronaut Outpost Commander** certification.

---

## NASA Science Payoffs
Whether you survive to 6:00 AM or suffer a system collapse, an instant debrief card cites verified NASA mission benchmarks (e.g., -60°C surface cooling, Opportunity/InSight dust blockage, MOXIE CO₂ electrolysis, and Curiosity RAD cosmic ray data).

---

## Where Each Team Member Works Next
* **Denise & Raindel (Research & Content):** Open [`scenarios.json`](./scenarios.json) to tweak hazard start seconds, change crew briefing lines (English/Taglish), or refine NASA facts.
* **Kent, Red & Jhon Rey (Programming):** Enhance visual assets, tweak animations, add keyboard shortcuts (`1-4` for cameras, `Q/W/E` for breakers), and deploy to GitHub Pages / Vercel.
