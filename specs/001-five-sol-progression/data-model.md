# Data Model: Bulalakaw Station — Mission 1 ("August 1972")

**Feature**: `001-five-sol-progression`  
**Date**: 2026-11-05  

---

## 1. Top-of-Code `CONFIG` Object (Single Source of Truth for Non-Coders)

All tunable numbers live in `CONFIG` at the top of `app.js` (and `scenarios.json`):

```typescript
interface GameConfig {
  missionTitle: string;              // "Mission 1: August 1972"
  totalSols: number;                 // 3
  solDurationRealSeconds: number;    // 480 (8 real minutes per Sol; configurable + fast demo multiplier)
  daytimeFraction: number;           // 0.55 (Day: 06:00–18:00, Dusk warning at 17:00, Night: 18:00–06:00)

  // Initial Supplies (in Crew-Days for 4 crew, or % / levels)
  initialResources: {
    batteryPct: number;              // 85%
    oxygenCrewDays: number;          // 12.0 days of air
    waterCrewDays: number;           // 12.0 days of water
    foodCrewDays: number;            // 15.0 days of food
    shieldingLevel: number;          // 1 (scale 0 to 4)
    missionDoseMsv: number;          // 0.0 mSv (cap: 150 mSv for mission training threshold)
    missionDoseCapMsv: number;       // 150 mSv (Simplified badge)
    moralePct: number;               // 90% (Smile meter)
    spareParts: number;              // 3
  };

  // Continuous Rates (per Sol or per real second)
  rates: {
    solarDayGainPerSec: number;      // +0.35% battery/s at 100% clean panels
    baseLifeSupportDrainPerSec: number; // -0.12% battery/s
    cameraFeedDrainPerSec: number;   // -0.04% battery/s per active feed (max 2)
    greenhouseLampDrainPerSec: number;  // -0.06% battery/s
    heatingDrainPerSec: { low: number; normal: number; high: number };
    shelterDoorBurstCostPct: number; // 5% battery to motor-seal heavy doors
    earthLinkDelaySeconds: number;   // 25s simulated one-way light delay
    stormRushCountdownSeconds: number; // 30s scramble window
  };

  // Science Transparency Badges ("Real" vs "Simplified")
  scienceBadges: Record<string, {
    label: string;
    valueText: string;
    status: "REAL" | "SIMPLIFIED";
    explanation: string;
    nasaSource: string;
  }>;
}
```

---

## 2. Outpost Map, Stations & Interior Rooms

The world consists of the **Outdoor Base & Surroundings Map** (crossable in ~30–40s of walking) and **Indoor Station Rooms**:

```typescript
type StationId =
  | "CONTROL_ROOM"
  | "GREENHOUSE"
  | "SOLAR_FIELD_A"
  | "SOLAR_FIELD_B"
  | "LIFE_SUPPORT"
  | "WATER_ICE_RIG"
  | "STORM_SHELTER"
  | "AIRLOCK_SUIT"
  | "GALLEY_QUARTERS"
  | "COMMS_DISH"
  // Coming Soon Placeholders:
  | "WORKSHOP"
  | "MEDBAY"
  | "LANDING_PAD"
  | "ROVER_GARAGE";

interface StationState {
  id: StationId;
  name: string;
  isIndoor: boolean;
  isPlaceholder: boolean;            // true for Workshop, Medbay, Landing Pad, Rover Garage
  conditionPct: number;              // 0..100% equipment condition
  hasActiveBreakdown: boolean;       // Leaking pipe, sparking panel, or clogged filter
  tasks: StationTask[];
}

interface StationTask {
  id: string;
  title: string;
  miniGameType:
    | "WIPE_DUST"
    | "FIX_WIRES"
    | "ALIGN_DIAL"
    | "MIX_AIR"
    | "WASH_SOIL"
    | "PLANT_WATER"
    | "SEAL_LEAK"
    | "STACK_SHIELDING"
    | "SUIT_CHECK"
    | "COOK_REST";
  durationGameMinutes: number;       // e.g., 15–30 in-game minutes
  whyThisMattersTip: string;         // 1-line NASA fact shown on completion
  badgeKey: string;                  // Links to scienceBadges ("REAL" | "SIMPLIFIED")
}
```

---

## 3. Filipino Crew NPCs (4 Autonomous Crewmates)

```typescript
interface CrewMember {
  id: "liza" | "andoy" | "maya" | "carlo";
  name: string;                      // Dr. Liza Mabini, Engr. Andoy Villanueva, Maya Dimaculangan, Carlo Reyes
  role: string;                      // Flight Surgeon, Systems & Power, Botanist, Geologist & Spacewalker
  traitDescription: string;          // e.g., Maya grows crops 20% faster; Andoy slows equipment wear
  x: number;
  y: number;
  currentLocation: StationId | "OUTDOORS";
  isInShelter: boolean;
  isSuited: boolean;
  healthPct: number;                 // 0..100%
  radiationDoseMsv: number;          // Accumulates outdoors & during unshielded storms (never decreases)
  moralePct: number;                 // 0..100%
  speechBubble?: string;             // e.g., "The panels in Field B look dusty", "Radiation alert, where do I go?"
  evaResistanceRemaining?: number;   // Used by Carlo during Sol 2 Storm Rush ("Almost done with this core sample!")
}
```

---

## 4. FNAF Control Room Console & Space Weather State

```typescript
type RadarStage = "CLEAR" | "WATCH_30" | "WARNING_70" | "CONFIRMED" | "STORM_RUSH" | "ACTIVE_STORM";

interface ControlConsoleState {
  isSeatedAtDesk: boolean;           // true = First-Person FNAF view; false = 2D Top-Down view
  activeCameras: StationId[];        // Max 2 feeds active at once; each costs power
  radarStage: RadarStage;
  stormEtaSeconds: number | null;
  stormRushTimerSeconds: number | null; // 30s countdown when particles < 1 min away
  switches: {
    greenhouseLampsOn: boolean;
    heatingLevel: "LOW" | "NORMAL" | "HIGH";
    shelterDoorsClosed: boolean;
  };
  earthLinkQueue: {
    question: string;
    sentAtSec: number;
    deliverAtSec: number;
    replyText: string;
    delivered: boolean;
  }[];
  alarmLog: { timeLabel: string; message: string; severity: "INFO" | "WARN" | "CRITICAL" }[];
}
```

---

## 5. Flight Recorder Telemetry & Causal Chain Engine

Throughout Sols 1–3, the engine samples state every 5 real seconds and records discrete player decisions to generate the **Flight Recorder Debrief**:

```typescript
interface FlightRecorderData {
  timelineSamples: {
    sol: number;
    clockLabel: string;              // e.g., "Sol 2 21:45"
    batteryPct: number;
    maxCrewDoseMsv: number;
    crewSafetyScore: number;         // 0..100
  }[];
  actionMarkers: {
    sol: number;
    clockLabel: string;
    actionLabel: string;             // e.g., "Kept greenhouse lamps ON at sunset", "Recalled Carlo at 22s left"
    impactTag: "POSITIVE" | "RISK" | "CRITICAL";
  }[];
  turningPoint: {
    clockLabel: string;
    title: string;
    explanation: string;
  };
  causeChain: string[];              // Plain-language chain: ["You kept lamps on all night", "Battery was low when storm hit", "Shelter doors moved slowly"]
  starRating: 1 | 2 | 3;
  outcome: "VICTORY" | "EVACUATION_DOSE" | "EVACUATION_OXYGEN" | "EVACUATION_POWER";
}
```
