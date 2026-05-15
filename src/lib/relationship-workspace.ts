import {
  agreements,
  dateBank,
  discoveryPrompts,
  intimacyMenu,
  repairQueue,
  sharedGoals
} from "@/data/relationship-app";

export const RELATIONSHIP_STORAGE_KEY = "us-on-purpose-v1";

export type CheckInState = {
  date: string;
  connectionScore: number;
  rose: string;
  thorn: string;
  bud: string;
  appreciation: string;
  disconnected: string;
  support: string;
  improve: string;
  celebrate: string;
};

export type IntimacyEntry = {
  desireLevel: number;
  moodSetters: string;
  nonSexualIntimacy: string;
  yesNoMaybe: string;
  desires: string;
  boundaries: string;
};

export type DateIdea = {
  idea: string;
  vibe: string;
  owner: string;
  cost: string;
  status: string;
};

export type RepairItem = {
  issue: string;
  trigger: string;
  revisit: string;
  repair: string;
};

export type GoalItem = {
  category: string;
  goal: string;
  nextStep: string;
  progress: number;
};

export type RelationshipWorkspaceState = {
  checkIn: CheckInState;
  intimacy: IntimacyEntry;
  dateIdeas: DateIdea[];
  discoveryNotes: string;
  repairItems: RepairItem[];
  goals: GoalItem[];
  agreements: string[];
};

export const defaultRelationshipWorkspaceState: RelationshipWorkspaceState = {
  checkIn: {
    date: new Date().toISOString().slice(0, 10),
    connectionScore: 8,
    rose: "",
    thorn: "",
    bud: "",
    appreciation: "",
    disconnected: "",
    support: "",
    improve: "",
    celebrate: ""
  },
  intimacy: {
    desireLevel: 7,
    moodSetters: intimacyMenu.moodSetters.join(", "),
    nonSexualIntimacy: intimacyMenu.nonSexual.join(", "),
    yesNoMaybe: intimacyMenu.yesNoMaybe.map((item) => `${item.topic}: ${item.status}`).join("\n"),
    desires: "",
    boundaries: ""
  },
  dateIdeas: [...dateBank],
  discoveryNotes: discoveryPrompts.map((prompt) => `- ${prompt}`).join("\n"),
  repairItems: [...repairQueue],
  goals: [...sharedGoals],
  agreements: [...agreements]
};

export function sanitizeDateIdea(item: unknown): DateIdea {
  const candidate = item as Partial<DateIdea> | undefined;

  return {
    idea: typeof candidate?.idea === "string" ? candidate.idea : "",
    vibe: typeof candidate?.vibe === "string" ? candidate.vibe : "",
    owner: typeof candidate?.owner === "string" ? candidate.owner : "",
    cost: typeof candidate?.cost === "string" ? candidate.cost : "$",
    status: typeof candidate?.status === "string" ? candidate.status : "Ready"
  };
}

export function sanitizeRepairItem(item: unknown): RepairItem {
  const candidate = item as Partial<RepairItem> | undefined;

  return {
    issue: typeof candidate?.issue === "string" ? candidate.issue : "",
    trigger: typeof candidate?.trigger === "string" ? candidate.trigger : "",
    revisit: typeof candidate?.revisit === "string" ? candidate.revisit : "",
    repair: typeof candidate?.repair === "string" ? candidate.repair : ""
  };
}

export function sanitizeGoalItem(item: unknown): GoalItem {
  const candidate = item as Partial<GoalItem> | undefined;

  return {
    category: typeof candidate?.category === "string" ? candidate.category : "",
    goal: typeof candidate?.goal === "string" ? candidate.goal : "",
    nextStep: typeof candidate?.nextStep === "string" ? candidate.nextStep : "",
    progress: typeof candidate?.progress === "number" ? candidate.progress : 0
  };
}

export function coerceRelationshipWorkspaceState(input: unknown): RelationshipWorkspaceState {
  if (!input || typeof input !== "object") {
    return defaultRelationshipWorkspaceState;
  }

  const candidate = input as Partial<RelationshipWorkspaceState>;

  return {
    checkIn: { ...defaultRelationshipWorkspaceState.checkIn, ...candidate.checkIn },
    intimacy: { ...defaultRelationshipWorkspaceState.intimacy, ...candidate.intimacy },
    dateIdeas: Array.isArray(candidate.dateIdeas)
      ? candidate.dateIdeas.map(sanitizeDateIdea)
      : defaultRelationshipWorkspaceState.dateIdeas,
    discoveryNotes:
      typeof candidate.discoveryNotes === "string"
        ? candidate.discoveryNotes
        : defaultRelationshipWorkspaceState.discoveryNotes,
    repairItems: Array.isArray(candidate.repairItems)
      ? candidate.repairItems.map(sanitizeRepairItem)
      : defaultRelationshipWorkspaceState.repairItems,
    goals: Array.isArray(candidate.goals)
      ? candidate.goals.map(sanitizeGoalItem)
      : defaultRelationshipWorkspaceState.goals,
    agreements: Array.isArray(candidate.agreements)
      ? candidate.agreements.filter((item): item is string => typeof item === "string")
      : defaultRelationshipWorkspaceState.agreements
  };
}
