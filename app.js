// Five Sols at Bulalakaw — Mars Outpost Survival (5-Sol Campaign Engine)
// Audio Synthesizer, Campaign State Persistence, Dynamic Hazard Pacing & NASA Science

// 1. WEB AUDIO API SYNTHESIZER
let audioCtx = null;
let isAudioMuted = false;

function initAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (_) {}
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTone(freq, type, duration, vol = 0.08) {
  if (isAudioMuted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (_) {}
}

const sfx = {
  camClick: () => playTone(950, "square", 0.05, 0.06),
  switchFlip: () => playTone(320, "sawtooth", 0.09, 0.09),
  alarmBeep: () => playTone(620, "square", 0.14, 0.08),
  winChime: () => {
    playTone(523, "sine", 0.25, 0.1);
    setTimeout(() => playTone(659, "sine", 0.35, 0.1), 180);
    setTimeout(() => playTone(784, "sine", 0.5, 0.12), 360);
  },
  powerDown: () => {
    playTone(220, "sawtooth", 0.5, 0.12);
    setTimeout(() => playTone(130, "sawtooth", 0.7, 0.15), 250);
  }
};

// 2. DEFAULT FALLBACK SCENARIOS (Offline file:// safe)
const FALLBACK_CAMPAIGN = {
  missionName: "OUTPOST BULALAKAW // SECTOR JEZERO-B",
  agency: "PhilSA – NASA Joint Mars Expedition",
  sols: [
    {
      solNumber: 1,
      title: "Sol 1: The Night Freeze",
      subtitle: "Martian Night Surface Temp: -60°C",
      briefing: "Cmdr. Reyes: 'First shift at Jezero Crater! It is freezing outside at -60°C. Keep our sweet potatoes alive in CAM 03, but huwag ubusin ang battery sa heaters bago mag-sunrise!'",
      unlockedHazards: ["FREEZE"],
      scheduledHazards: [
        { startSec: 6, type: "FREEZE", sectorId: 3, label: "Martian Night Freeze (-60°C)" }
      ],
      secondaryHazards: { enabled: false, chancePerSec: 0, minSec: 60, pool: [] },
      debriefCards: {
        victory: {
          title: "🌅 6:00 AM — SOL 1 SURVIVED!",
          description: "Galing! You balanced battery reserves and pulsed the greenhouse heaters so the crops survived the sub-zero Martian night.",
          nasaCitation: "NASA Benchmark: Temperatures at the Martian equator drop from 20°C at noon down to -73°C at night. Without active heating, greenhouse crops die within hours."
        },
        failureBattery: {
          title: "⚡ TOTAL HABITAT BLACKOUT",
          description: "You left the heavy heaters running constantly! The outpost battery died in the dark before sunrise.",
          nasaCitation: "NASA Fact: Mars solar arrays produce 0 Watts at night. Outposts must carefully budget stored battery power until dawn."
        },
        failureFreeze: {
          title: "🥶 GREENHOUSE FROZE SOLID (-10°C)!",
          description: "You neglected CAM 03! The sweet potato tubers and chlorella cultures froze solid in the cold.",
          nasaCitation: "NASA Benchmark: NASA plant growth chambers (like Veggie on the ISS) require tight thermal regulation between 18°C and 24°C to prevent root frostbite."
        },
        failureO2: {
          title: "🫁 HYPOXIA ALERT",
          description: "Oxygen levels bottomed out.",
          nasaCitation: "NASA Fact: Mars atmosphere is 95% CO2. Humans require closed-loop oxygen systems."
        },
        failureRadiation: {
          title: "☢️ RADIATION BREACH",
          description: "Radiation levels breached safe thresholds.",
          nasaCitation: "NASA Fact: Mars lacks a global magnetosphere to shield against cosmic rays."
        }
      }
    },
    {
      solNumber: 2,
      title: "Sol 2: The Red Dust Front",
      subtitle: "Atmospheric Dust Opacity (Tau) Rising",
      briefing: "Engr. Cruz: 'A local dust swirl is sweeping over Sector Jezero! Dust is sticking to our exterior regulators on CAM 01. When it hits, deploy the Wiper Drone agad to stop extra power drain!'",
      unlockedHazards: ["FREEZE", "DUST"],
      scheduledHazards: [
        { startSec: 5, type: "FREEZE", sectorId: 3, label: "Night Freeze" },
        { startSec: 14, type: "DUST", sectorId: 1, label: "Dust Coating Regulators" },
        { startSec: 35, type: "DUST", sectorId: 1, label: "Secondary Dust Accumulation" }
      ],
      secondaryHazards: { enabled: false, chancePerSec: 0, minSec: 60, pool: [] },
      debriefCards: {
        victory: {
          title: "🌅 6:00 AM — SOL 2 SURVIVED!",
          description: "Impressive! You kept the crops warm while wiping red dust off the power couplings before it drained the outpost dry.",
          nasaCitation: "NASA Benchmark: Dust accumulation on Mars severely degraded the Opportunity and InSight missions, reducing solar output by up to 99%. Automated wipers or electrostatic dust cleaners are essential for long missions."
        },
        failureBattery: {
          title: "⚡ POWER EXHAUSTION (0% BATTERY)",
          description: "Dust coated the power couplings and drained your battery before you could wipe them clean!",
          nasaCitation: "NASA Fact: Dust-covered panels and clogged thermal radiators dramatically increase electrical parasitic draw."
        },
        failureFreeze: {
          title: "🥶 GREENHOUSE FROZE SOLID",
          description: "While checking CAM 01, you forgot to pulse the greenhouse heaters on CAM 03!",
          nasaCitation: "NASA Benchmark: Mars' thin atmosphere holds virtually no heat, causing temperatures to plummet the moment heating stops."
        },
        failureO2: {
          title: "🫁 HYPOXIA ALERT",
          description: "Oxygen levels bottomed out.",
          nasaCitation: "NASA Fact: Closed-loop ECLSS systems must maintain continuous air flow."
        },
        failureRadiation: {
          title: "☢️ RADIATION BREACH",
          description: "Radiation levels breached safe thresholds.",
          "nasaCitation": "NASA Fact: Radiation exposure accumulates over mission duration."
        }
      }
    },
    {
      solNumber: 3,
      title: "Sol 3: Filter Infiltration",
      subtitle: "CO₂ Recycler Differential Pressure Spike",
      briefing: "Botanist Santos: 'Fine Martian regolith got sucked into the life support intake on CAM 02! The O2 filter is clogging up fast. Use the manual thump or toggle Turbo Scrubber bago tayo maubusan ng hangin!'",
      unlockedHazards: ["FREEZE", "DUST", "O2_CLOG"],
      scheduledHazards: [
        { startSec: 5, type: "FREEZE", sectorId: 3, label: "Night Freeze" },
        { startSec: 15, type: "O2_CLOG", sectorId: 2, label: "Air Filter Clog" },
        { startSec: 28, type: "DUST", sectorId: 1, label: "Dust Alert" },
        { startSec: 42, type: "O2_CLOG", sectorId: 2, label: "Secondary Filter Dust Spike" }
      ],
      secondaryHazards: { enabled: false, chancePerSec: 0, minSec: 60, pool: [] },
      debriefCards: {
        victory: {
          title: "🌅 6:00 AM — SOL 3 SURVIVED!",
          description: "Mahusay! You kept the air breathable, brushed off the dust, and kept the greenhouse warm all at once.",
          nasaCitation: "NASA Benchmark: The Mars Oxygen ISRU Experiment (MOXIE) on Perseverance produced oxygen directly from atmospheric CO2. On human missions, ECLSS recyclers must constantly scrub CO2 and maintain a 21% O2 / 78% N2 cabin mix."
        },
        failureO2: {
          title: "🫁 HYPOXIA — OXYGEN DEPLETED (0%)!",
          description: "The air intake clogged with fine Martian regolith and you did not clear it or run the Turbo Scrubber in time!",
          nasaCitation: "NASA Fact: Mars air is 95% toxic carbon dioxide. Without active oxygen recycling, astronauts experience cognitive decline in minutes."
        },
        failureBattery: {
          title: "⚡ BATTERY DEPLETED",
          description: "Running the Turbo Scrubber non-stop while keeping heaters on drained the outpost battery.",
          nasaCitation: "NASA Benchmark: Running high-draw life support systems continuously requires tight power prioritization."
        },
        failureFreeze: {
          title: "🥶 CROPS FROZEN",
          description: "You focused too much on oxygen and let the greenhouse freeze.",
          nasaCitation: "NASA Fact: Multitasking thermal and atmospheric controls is the primary role of space habitat flight controllers."
        },
        failureRadiation: {
          title: "☢️ RADIATION BREACH",
          description: "Radiation levels breached safe thresholds.",
          "nasaCitation": "NASA Fact: Cosmic radiation requires steady baseline habitat shielding."
        }
      }
    },
    {
      solNumber: 4,
      title: "Sol 4: The Solar Particle Wave",
      subtitle: "Coronal Mass Ejection (CME) Impact",
      briefing: "Cmdr. Reyes: 'NASA Space Weather Alert: A solar flare just erupted! Radiation outside is spiking on CAM 04. Slam the Lead Blast Shutter CLOSED when it strikes, pero OPEN it agad when it clears kasi +2 bars ang drain niyan!'",
      unlockedHazards: ["FREEZE", "DUST", "O2_CLOG", "RAD_STORM"],
      scheduledHazards: [
        { startSec: 5, type: "FREEZE", sectorId: 3, label: "Night Freeze" },
        { startSec: 16, type: "RAD_STORM", durationSec: 13, sectorId: 4, label: "Solar Flare Burst" },
        { startSec: 34, type: "DUST", sectorId: 1, label: "Dust Surge" },
        { startSec: 44, type: "RAD_STORM", durationSec: 10, sectorId: 4, label: "Secondary Radiation Flare" }
      ],
      secondaryHazards: {
        enabled: true,
        chancePerSec: 0.08,
        minSec: 25,
        pool: ["O2_CLOG", "DUST"]
      },
      debriefCards: {
        victory: {
          title: "🌅 6:00 AM — SOL 4 SURVIVED!",
          description: "Tactical perfection! You slammed the blast shutter shut to block the solar flare, and reopened it right in time to conserve battery for sunrise.",
          nasaCitation: "NASA Benchmark: Unlike Earth, Mars lacks a protective global magnetic field. During solar particle events, radiation doses can exceed 100 mSv. Astronauts must take shelter in regolith bunkers or heavy shielded storm shelters."
        },
        failureRadiation: {
          title: "☢️ CRITICAL RADIATION BREACH (0%)!",
          description: "A high-energy solar particle wave struck Outpost Bulalakaw while the Lead Blast Shutter was left OPEN!",
          nasaCitation: "NASA Fact: Solar energetic particles travel near the speed of light. Without physical shielding, radiation breaches cause immediate electronics damage and acute crew radiation sickness."
        },
        failureBattery: {
          title: "⚡ POWER COLLAPSE (+2 USAGE PENALTY)",
          description: "You forgot to OPEN the Lead Blast Shutter after the solar flare passed! The heavy motorized locks drained your battery completely.",
          nasaCitation: "NASA Benchmark: Heavy mechanical systems like blast doors and airlocks consume substantial electrical reserves and must be powered down when not actively needed."
        },
        failureFreeze: {
          title: "🥶 CROPS FROZEN",
          description: "You panicked during the solar storm and neglected greenhouse temperatures.",
          "nasaCitation": "NASA Fact: Outpost commanders must stay calm and balance multiple simultaneous room hazards."
        },
        failureO2: {
          title: "🫁 OXYGEN DEPLETED",
          description: "The air loop clogged while you were handling the blast shutter.",
          "nasaCitation": "NASA Fact: ECLSS atmospheric monitoring cannot be ignored even during external radiation storms."
        }
      }
    },
    {
      solNumber: 5,
      title: "Sol 5: The Martian Gauntlet",
      subtitle: "Maximum Environmental Stress Shift",
      briefing: "All Station Comms: 'This is it, Commander! All hazards are active tonight: freezing temperatures, dust storms, clogged filters, and radiation flares! Manage all 4 rooms and bring Outpost Bulalakaw safely to sunrise!'",
      unlockedHazards: ["FREEZE", "DUST", "O2_CLOG", "RAD_STORM"],
      scheduledHazards: [
        { startSec: 5, type: "FREEZE", sectorId: 3, label: "Night Freeze" },
        { startSec: 12, type: "DUST", sectorId: 1, label: "Dust Storm Inbound" },
        { startSec: 22, type: "RAD_STORM", durationSec: 11, sectorId: 4, label: "Radiation Spike" },
        { startSec: 35, "type": "O2_CLOG", sectorId: 2, label: "Filter Blockage" },
        { startSec: 45, type: "RAD_STORM", durationSec: 10, sectorId: 4, label: "Final CME Surge" }
      ],
      secondaryHazards: {
        enabled: true,
        chancePerSec: 0.12,
        minSec: 18,
        pool: ["DUST", "O2_CLOG"]
      },
      debriefCards: {
        victory: {
          title: "🏆 OUTPOST BULALAKAW COMMANDER CERTIFICATION!",
          description: "Mabuhay, Commander! You survived all 5 Sols on Mars, mastering Power, Life Support, Food, and Radiation Shielding under extreme pressure. Mission successful!",
          nasaCitation: "NASA Systems Engineering Takeaway: Mission success on Mars is not about infinite resources—it is about managing trade-offs. You proved that balancing battery storage, thermal control, closed-loop air recycling, and radiation protection keeps astronauts alive!"
        },
        failureBattery: {
          title: "⚡ HABITAT BLACKOUT ON SOL 5",
          description: "The gauntlet pushed your electrical grid past its breaking point.",
          nasaCitation: "NASA Benchmark: Complex human missions require active power shedding protocols when multiple subsystems demand peak draw simultaneously."
        },
        failureFreeze: {
          title: "🥶 CROPS FROZEN ON SOL 5",
          description: "The greenhouse temperature dropped below -10°C during the final hour.",
          nasaCitation: "NASA Fact: Automated thermal loops are essential to keep biological systems alive while crew members handle mechanical crises."
        },
        failureO2: {
          title: "🫁 HYPOXIA ON SOL 5",
          description: "Oxygen levels bottomed out in the final stretch.",
          nasaCitation: "NASA Fact: Human spaceflight requires rapid fault detection and isolation in life support loops."
        },
        failureRadiation: {
          title: "☢️ RADIATION BREACH ON SOL 5",
          description: "The final coronal mass ejection overwhelmed unshielded crew quarters.",
          nasaCitation: "NASA Fact: Redundant radiation shelters and active warning sensors are paramount for deep space surface missions."
        }
      }
    }
  ]
};

let campaignData = FALLBACK_CAMPAIGN;

// 3. CAMPAIGN STATE (LOCAL STORAGE PERSISTENCE)
const STORAGE_KEY = "bulalakaw_campaign_v1";

function loadCampaignState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return {
    currentSol: 1,
    highestUnlockedSol: 1,
    completedSols: [],
    isJudgeUnlockedAll: false,
    isMuted: false
  };
}

function saveCampaignState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaignState));
  } catch (_) {}
}

let campaignState = loadCampaignState();
isAudioMuted = !!campaignState.isMuted;

// 4. ACTIVE SHIFT RUNTIME STATE
const state = {
  running: false,
  activeCam: 1,
  secondsElapsed: 0, // 60s per shift (10s per in-game hour)
  battery: 100,
  o2: 100,
  cropTemp: 22,
  radSafe: 100,

  // Breakers
  shutterClosed: false,
  heaterOn: false,
  scrubberOn: false,

  // Hazards
  dustOnPanels: false,
  o2LeakActive: false,
  nightFreezeActive: false,
  radStormActive: false
};

let loopTimer = null;

function getCurrentSolConfig() {
  const target = campaignData.sols.find((s) => s.solNumber === campaignState.currentSol);
  return target || campaignData.sols[0];
}

function resetShiftState() {
  state.running = true;
  state.secondsElapsed = 0;
  state.battery = 100;
  state.o2 = 100;
  state.cropTemp = 22;
  state.radSafe = 100;

  state.shutterClosed = false;
  state.heaterOn = false;
  state.scrubberOn = false;

  state.dustOnPanels = false;
  state.o2LeakActive = false;
  state.nightFreezeActive = false;
  state.radStormActive = false;

  document.getElementById("crt-screen").classList.remove("blackout");
  document.getElementById("outcome-modal").classList.add("hidden");
  renderAll();
}

function getUsageLevel() {
  let bars = 1; // Baseline habitat life support
  if (state.shutterClosed) bars += 2;
  if (state.heaterOn) bars += 1;
  if (state.scrubberOn) bars += 1;
  if (state.dustOnPanels) bars += 1;
  return Math.min(5, bars);
}

function checkHazardTriggers(sec) {
  const config = getCurrentSolConfig();

  // 1. Scheduled Hazards
  if (config.scheduledHazards) {
    config.scheduledHazards.forEach((hazard) => {
      if (sec === hazard.startSec) {
        if (hazard.type === "FREEZE") state.nightFreezeActive = true;
        if (hazard.type === "DUST") state.dustOnPanels = true;
        if (hazard.type === "O2_CLOG") state.o2LeakActive = true;
        if (hazard.type === "RAD_STORM") state.radStormActive = true;
        sfx.alarmBeep();
      }
      if (hazard.durationSec && sec === hazard.startSec + hazard.durationSec) {
        if (hazard.type === "RAD_STORM") state.radStormActive = false;
        if (hazard.type === "DUST") state.dustOnPanels = false;
      }
    });
  }

  // 2. Secondary Dynamic Hazards (Sols 4 and 5)
  if (config.secondaryHazards && config.secondaryHazards.enabled && sec >= config.secondaryHazards.minSec) {
    if (Math.random() < config.secondaryHazards.chancePerSec) {
      const pool = config.secondaryHazards.pool;
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      if (chosen === "DUST" && !state.dustOnPanels) {
        state.dustOnPanels = true;
        sfx.alarmBeep();
      } else if (chosen === "O2_CLOG" && !state.o2LeakActive) {
        state.o2LeakActive = true;
        sfx.alarmBeep();
      }
    }
  }

  // Auto-clears
  if (state.radStormActive && state.shutterClosed && Math.random() < 0.2) {
    state.radStormActive = false;
  }
}

function tick() {
  if (!state.running) return;

  state.secondsElapsed += 1;
  checkHazardTriggers(state.secondsElapsed);

  // 1. Battery Drain (0.7% to 4.2% based on usage bars)
  const usage = getUsageLevel();
  const drainRates = [0, 0.7, 1.45, 2.3, 3.2, 4.2];
  state.battery = Math.max(0, state.battery - drainRates[usage]);

  // 2. Oxygen Recycler
  if (state.o2LeakActive && !state.scrubberOn) {
    state.o2 = Math.max(0, state.o2 - 4.5);
  } else if (state.scrubberOn) {
    state.o2 = Math.min(100, state.o2 + 5.2);
    if (state.o2 > 90 && Math.random() < 0.35) state.o2LeakActive = false;
  } else {
    state.o2 = Math.max(0, state.o2 - 0.4);
  }

  // 3. Greenhouse Temperature (Mars Night)
  if (state.heaterOn) {
    state.cropTemp = Math.min(24, state.cropTemp + 2.8);
  } else {
    // Falls when freeze is active or passive night cooling
    const drop = state.nightFreezeActive ? 1.7 : 0.8;
    state.cropTemp = Math.max(-15, state.cropTemp - drop);
  }

  // 4. Radiation Integrity
  if (state.radStormActive && !state.shutterClosed) {
    state.radSafe = Math.max(0, state.radSafe - 6.5);
  } else if (state.shutterClosed) {
    state.radSafe = Math.min(100, state.radSafe + 2.0);
  }

  renderAll();
  checkEndConditions();
}

function checkEndConditions() {
  const config = getCurrentSolConfig();

  // 1. Battery Loss
  if (state.battery <= 0) {
    document.getElementById("crt-screen").classList.add("blackout");
    sfx.powerDown();
    showOutcome(false, config.debriefCards.failureBattery);
    return;
  }

  // 2. Hypoxia Loss
  if (state.o2 <= 0) {
    sfx.powerDown();
    showOutcome(false, config.debriefCards.failureO2);
    return;
  }

  // 3. Freeze Loss
  if (state.cropTemp <= -10) {
    sfx.powerDown();
    showOutcome(false, config.debriefCards.failureFreeze);
    return;
  }

  // 4. Radiation Breach
  if (state.radSafe <= 0) {
    sfx.powerDown();
    showOutcome(false, config.debriefCards.failureRadiation);
    return;
  }

  // 5. Shift Survived (60 seconds = 6:00 AM)
  if (state.secondsElapsed >= 60) {
    sfx.winChime();
    // Unlock next Sol
    if (!campaignState.completedSols.includes(campaignState.currentSol)) {
      campaignState.completedSols.push(campaignState.currentSol);
    }
    if (campaignState.currentSol < 5) {
      campaignState.highestUnlockedSol = Math.max(
        campaignState.highestUnlockedSol,
        campaignState.currentSol + 1
      );
    }
    saveCampaignState();
    renderSolTabs();
    showOutcome(true, config.debriefCards.victory);
  }
}

function showOutcome(won, card) {
  state.running = false;
  clearInterval(loopTimer);

  const modal = document.getElementById("outcome-modal");
  const badge = document.getElementById("modal-badge");
  badge.textContent = won ? "SHIFT COMPLETE // SURVIVED" : "CRITICAL SYSTEM FAILURE";
  badge.style.background = won ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.25)";
  badge.style.color = won ? "#10b981" : "#ef4444";

  document.getElementById("modal-title").textContent = card.title;
  document.getElementById("modal-desc").textContent = card.description;
  document.getElementById("modal-nasa-fact").textContent = card.nasaCitation;

  const proceedBtn = document.getElementById("proceed-sol-btn");
  if (won && campaignState.currentSol < 5) {
    proceedBtn.classList.remove("hidden");
    const nextNumEl = document.getElementById("next-sol-num");
    if (nextNumEl) nextNumEl.textContent = campaignState.currentSol + 1;
    proceedBtn.onclick = () => {
      selectSol(campaignState.currentSol + 1);
      modal.classList.add("hidden");
      startShift();
    };
  } else {
    proceedBtn.classList.add("hidden");
  }

  modal.classList.remove("hidden");
}

// 5. UI RENDERING
function renderClock() {
  const hourIndex = Math.min(6, Math.floor(state.secondsElapsed / 10));
  const labels = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM"];
  document.getElementById("shift-clock").textContent = labels[hourIndex];
  document.getElementById("shift-sol-indicator").textContent = `SURVIVE UNTIL 6:00 AM (SOL ${campaignState.currentSol})`;
}

function renderPowerAndBars() {
  const pctEl = document.getElementById("battery-pct");
  pctEl.textContent = `${Math.ceil(state.battery)}%`;
  pctEl.style.color = state.battery <= 25 ? "#ef4444" : state.battery <= 55 ? "#f59e0b" : "#10b981";

  const usage = getUsageLevel();
  const barEls = document.querySelectorAll("#usage-bars .u-bar");
  barEls.forEach((el, idx) => {
    el.className = "u-bar";
    if (idx < usage) {
      if (usage <= 2) el.classList.add("active-green");
      else if (usage <= 3) el.classList.add("active-amber");
      else el.classList.add("active-red");
    }
  });
}

function renderMiniTelemetry() {
  // O2
  const o2Pct = Math.round(state.o2);
  document.getElementById("val-o2").textContent = `${o2Pct}%`;
  const o2Bar = document.getElementById("bar-o2");
  o2Bar.style.width = `${o2Pct}%`;
  o2Bar.style.background = o2Pct < 35 ? "#ef4444" : "#10b981";

  // Crop Temp
  const temp = Math.round(state.cropTemp);
  const tempPct = Math.max(0, Math.min(100, Math.round(((temp + 10) / 34) * 100)));
  document.getElementById("val-food").textContent = `${temp}°C`;
  const foodBar = document.getElementById("bar-food");
  foodBar.style.width = `${tempPct}%`;
  foodBar.style.background = temp <= 2 ? "#ef4444" : temp <= 10 ? "#f59e0b" : "#10b981";

  // Radiation Safety
  const radPct = Math.round(state.radSafe);
  document.getElementById("val-rad").textContent = `${radPct}%`;
  const radBar = document.getElementById("bar-rad");
  radBar.style.width = `${radPct}%`;
  radBar.style.background = radPct < 40 ? "#ef4444" : "#10b981";
}

function renderAlertsAndSwitches() {
  document.getElementById("alert-cam-1").classList.toggle("hidden", !state.dustOnPanels);
  document.getElementById("alert-cam-2").classList.toggle("hidden", !state.o2LeakActive && state.o2 > 45);
  document.getElementById("alert-cam-3").classList.toggle("hidden", state.cropTemp > 6);
  document.getElementById("alert-cam-4").classList.toggle("hidden", !state.radStormActive);

  const setBreakerUI = (btnId, pillId, isOn, onText, offText) => {
    const btn = document.getElementById(btnId);
    const pill = document.getElementById(pillId);
    btn.classList.toggle("active-switch", isOn);
    pill.className = `switch-pill ${isOn ? "on" : "off"}`;
    pill.textContent = isOn ? onText : offText;
  };

  setBreakerUI("toggle-shutter", "state-shutter", state.shutterClosed, "CLOSED", "OPEN");
  setBreakerUI("toggle-heater", "state-heater", state.heaterOn, "ON", "OFF");
  setBreakerUI("toggle-scrubber", "state-scrubber", state.scrubberOn, "PUMPING", "IDLE");
}

function renderCameraViewport() {
  const titleEl = document.getElementById("cam-title");
  const pillEl = document.getElementById("cam-status-pill");
  const sceneEl = document.getElementById("cam-scene");

  if (state.activeCam === 1) {
    titleEl.textContent = "CAM 01 — EXTERIOR SOLAR & DUST RADAR";
    const danger = state.dustOnPanels;
    pillEl.className = `cam-pill ${danger ? "danger" : "nominal"}`;
    pillEl.textContent = danger ? "DUST ACCUMULATION!" : "CLEAN";
    sceneEl.innerHTML = `
      <div class="scene-icon">${danger ? "🌪️🔋" : "🛰️🔋"}</div>
      <div class="scene-title">${danger ? "⚠️ RED DUST COATING REGULATORS!" : "Battery Regulators Normal"}</div>
      <div class="scene-desc">
        ${
          danger
            ? "Martian dust is clogging the exterior power couplings, adding +1 extra bar of Battery Drain! Wipe them clean now!"
            : "Nighttime on Mars. Running on stored battery reserves until 6:00 AM sunrise."
        }
      </div>
      ${
        danger
          ? `<button class="cam-action-btn" id="wipe-panels-btn">🧹 DEPLOY WIPER DRONE (CLEAN DUST)</button>`
          : ""
      }
    `;
    const wipeBtn = document.getElementById("wipe-panels-btn");
    if (wipeBtn) {
      wipeBtn.onclick = () => {
        sfx.switchFlip();
        state.dustOnPanels = false;
        renderAll();
      };
    }
  } else if (state.activeCam === 2) {
    titleEl.textContent = "CAM 02 — O₂ SCRUBBER & AIR LOOP";
    const danger = state.o2LeakActive || state.o2 < 45;
    pillEl.className = `cam-pill ${danger ? "danger" : "nominal"}`;
    pillEl.textContent = danger ? "CO₂ SPIKE / FILTER CLOG" : "AIR BREATHABLE";
    sceneEl.innerHTML = `
      <div class="scene-icon">${danger ? "🚨🫁" : "💨🫁"}</div>
      <div class="scene-title">Oxygen Tank Pressure: ${Math.round(state.o2)}%</div>
      <div class="scene-desc">
        ${
          state.o2LeakActive
            ? "WARNING: CO₂ scrubber is clogged! Flip the [TURBO O₂ SCRUBBER] switch on your desk (or thump below) before oxygen runs out!"
            : "Crew breathing nominal oxygen mix. Keep an eye out for filter clogs."
        }
      </div>
      ${
        state.o2LeakActive
          ? `<button class="cam-action-btn" id="purge-filter-btn">🔧 MANUAL FILTER THUMP (CLEAR CLOG)</button>`
          : ""
      }
    `;
    const purgeBtn = document.getElementById("purge-filter-btn");
    if (purgeBtn) {
      purgeBtn.onclick = () => {
        sfx.switchFlip();
        state.o2LeakActive = false;
        state.o2 = Math.min(100, state.o2 + 10);
        renderAll();
      };
    }
  } else if (state.activeCam === 3) {
    titleEl.textContent = "CAM 03 — HYDROPONIC GREENHOUSE BAY";
    const temp = Math.round(state.cropTemp);
    const danger = temp <= 6;
    pillEl.className = `cam-pill ${danger ? "danger" : "nominal"}`;
    pillEl.textContent = danger ? `FREEZING (${temp}°C)!` : `TEMP ${temp}°C`;
    sceneEl.innerHTML = `
      <div class="scene-icon">${temp <= 2 ? "🥶❄️🌱" : state.heaterOn ? "🔥🌱" : "🌱🍠"}</div>
      <div class="scene-title">Greenhouse Bay Temperature: ${temp}°C</div>
      <div class="scene-desc">
        ${
          state.heaterOn
            ? "Heaters are ON (+1 Power Drain). Warming sweet potato crops back up!"
            : "Heaters are OFF. Outside Mars temp is -60°C — the bay is slowly freezing! Pulse the [GREENHOUSE HEATERS] switch when it gets below 6°C, then turn it off to save battery!"
        }
      </div>
    `;
  } else if (state.activeCam === 4) {
    titleEl.textContent = "CAM 04 — RADIATION SHIELD & BLAST DOME";
    const danger = state.radStormActive && !state.shutterClosed;
    pillEl.className = `cam-pill ${danger ? "danger" : "nominal"}`;
    pillEl.textContent = state.radStormActive
      ? state.shutterClosed
        ? "STORM BLOCKED BY SHUTTER"
        : "⚠️ SOLAR FLARE HITTING BASE!"
      : "BACKGROUND NOMINAL";
    sceneEl.innerHTML = `
      <div class="scene-icon">${
        state.shutterClosed ? "🛡️🔒" : state.radStormActive ? "☢️⚡" : "🌌🛡️"
      }</div>
      <div class="scene-title">${
        state.radStormActive
          ? state.shutterClosed
            ? "Lead Blast Shutter Holding Strong!"
            : "🚨 SOLAR RADIATION STORM IN PROGRESS!"
          : "Exterior Radiation Sensors Quiet"
      }</div>
      <div class="scene-desc">
        ${
          state.radStormActive
            ? state.shutterClosed
              ? "The shutter is blocking the radiation wave! Once the storm clears, OPEN the shutter immediately so it stops draining +2 Battery Bars!"
              : "CLOSE THE [LEAD BLAST SHUTTER] ON YOUR DESK IMMEDIATELY or radiation will breach the base!"
            : state.shutterClosed
            ? "WARNING: Blast Shutter is still CLOSED and draining +2 Power Bars! Open it now while the sky is clear!"
            : "No solar flare right now. Keep the Blast Shutter OPEN to conserve battery."
        }
      </div>
    `;
  }
}

function renderBriefing() {
  const config = getCurrentSolConfig();
  document.getElementById("brief-sol-tag").textContent = `SOL ${config.solNumber} / 5`;
  document.getElementById("brief-sol-title").textContent = config.title;
  document.getElementById("brief-hazard-tag").textContent = `HAZARDS: ${config.unlockedHazards.join(", ")}`;
  document.getElementById("brief-text").textContent = config.briefing;
}

function renderSolTabs() {
  const container = document.getElementById("sol-tabs");
  container.innerHTML = "";

  campaignData.sols.forEach((sol) => {
    const btn = document.createElement("button");
    const isUnlocked = campaignState.isJudgeUnlockedAll || sol.solNumber <= campaignState.highestUnlockedSol;
    const isCompleted = campaignState.completedSols.includes(sol.solNumber);
    const isActive = sol.solNumber === campaignState.currentSol;

    btn.className = `sol-tab-btn ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""} ${!isUnlocked ? "locked" : ""}`;
    btn.innerHTML = `${isCompleted ? "✓ " : !isUnlocked ? "🔒 " : ""}SOL ${sol.solNumber}`;

    if (isUnlocked) {
      btn.onclick = () => {
        sfx.camClick();
        selectSol(sol.solNumber);
      };
    }
    container.appendChild(btn);
  });

  // Update Audio Mute button
  const audioBtn = document.getElementById("audio-toggle-btn");
  audioBtn.textContent = isAudioMuted ? "🔇 Muted" : "🔊 Sound ON";
}

function selectSol(solNum) {
  campaignState.currentSol = solNum;
  saveCampaignState();
  renderSolTabs();
  renderBriefing();
  resetShiftState();
}

function startShift() {
  initAudio();
  sfx.camClick();
  clearInterval(loopTimer);
  resetShiftState();
  loopTimer = setInterval(tick, 1000);
}

function renderAll() {
  renderClock();
  renderPowerAndBars();
  renderMiniTelemetry();
  renderAlertsAndSwitches();
  renderCameraViewport();
}

// 6. INITIALIZATION & LISTENERS
function init() {
  // Initial synchronous render using fallback data
  renderSolTabs();
  renderBriefing();
  resetShiftState();

  // Load external scenarios if available
  fetch("./scenarios.json")
    .then((res) => res.json())
    .then((data) => {
      if (data && data.sols && data.sols.length >= 5) {
        campaignData = data;
        renderSolTabs();
        renderBriefing();
        renderAll();
      }
    })
    .catch(() => {});

  // Camera buttons
  document.querySelectorAll(".cam-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      initAudio();
      sfx.camClick();
      state.activeCam = Number(btn.dataset.cam);
      document.querySelectorAll(".cam-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCameraViewport();
    });
  });

  // Desk Breakers
  document.getElementById("toggle-shutter").addEventListener("click", () => {
    initAudio();
    sfx.switchFlip();
    state.shutterClosed = !state.shutterClosed;
    renderAll();
  });

  document.getElementById("toggle-heater").addEventListener("click", () => {
    initAudio();
    sfx.switchFlip();
    state.heaterOn = !state.heaterOn;
    renderAll();
  });

  document.getElementById("toggle-scrubber").addEventListener("click", () => {
    initAudio();
    sfx.switchFlip();
    state.scrubberOn = !state.scrubberOn;
    renderAll();
  });

  // Shift & Modal Buttons
  document.getElementById("start-shift-btn").addEventListener("click", startShift);
  document.getElementById("restart-btn").addEventListener("click", () => {
    document.getElementById("outcome-modal").classList.add("hidden");
    startShift();
  });
  document.getElementById("menu-btn").addEventListener("click", () => {
    document.getElementById("outcome-modal").classList.add("hidden");
    resetShiftState();
  });

  // Audio Mute Toggle
  document.getElementById("audio-toggle-btn").addEventListener("click", () => {
    initAudio();
    isAudioMuted = !isAudioMuted;
    campaignState.isMuted = isAudioMuted;
    saveCampaignState();
    document.getElementById("audio-toggle-btn").textContent = isAudioMuted ? "🔇 Muted" : "🔊 Sound ON";
    if (!isAudioMuted) sfx.switchFlip();
  });

  // Judge Demo: Unlock All Sols
  document.getElementById("judge-unlock-btn").addEventListener("click", () => {
    initAudio();
    sfx.winChime();
    campaignState.isJudgeUnlockedAll = true;
    campaignState.highestUnlockedSol = 5;
    saveCampaignState();
    renderSolTabs();
  });

  // Reset Campaign Progress
  document.getElementById("reset-campaign-btn").addEventListener("click", () => {
    initAudio();
    sfx.switchFlip();
    campaignState = {
      currentSol: 1,
      highestUnlockedSol: 1,
      completedSols: [],
      isJudgeUnlockedAll: false,
      isMuted: isAudioMuted
    };
    saveCampaignState();
    selectSol(1);
  });
}

if (document.body) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
