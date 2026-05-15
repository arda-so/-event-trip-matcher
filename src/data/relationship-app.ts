export const relationshipStats = [
  { label: "Connection", value: "8.2/10", note: "A quick weekly pulse after your check-in." },
  { label: "Repair queue", value: "2 topics", note: "Capture hard conversations before they become fights." },
  { label: "Date ideas", value: "14 saved", note: "Keep momentum when energy is low." },
  { label: "Shared goals", value: "5 active", note: "Turn vague hopes into visible next steps." }
] as const;

export const weeklyCheckIn = [
  {
    prompt: "Rose / Thorn / Bud",
    detail: "Highlight of the week, hardest part, and what you are hopeful about next."
  },
  {
    prompt: "What I appreciated about you",
    detail: "Anchor the conversation in gratitude before discussing stress or distance."
  },
  {
    prompt: "Where I felt disconnected",
    detail: "Name the moment without turning it into a prosecution."
  },
  {
    prompt: "How can I support you next week?",
    detail: "End with a practical act of care, not just insight."
  }
] as const;

export const intimacyMenu = {
  moodSetters: ["A tidy room", "Slow music", "Verbal praise", "A long shower", "Unhurried bedtime"],
  nonSexual: ["10-minute massage", "Phone-free cuddle", "Walking hand in hand", "Reading in bed together"],
  yesNoMaybe: [
    { topic: "Morning intimacy", status: "Maybe" },
    { topic: "Massage first", status: "Yes" },
    { topic: "Flirty texts during the day", status: "Yes" },
    { topic: "Trying something new this month", status: "Maybe" }
  ]
} as const;

export const dateBank = [
  { idea: "Cook one country together", vibe: "At home", owner: "Her turn", cost: "$", status: "Ready" },
  { idea: "Sunset walk and gelato", vibe: "Cheap / outdoors", owner: "Your turn", cost: "$", status: "Ready" },
  { idea: "Dress up for a hotel bar", vibe: "Dressed-up", owner: "Shared", cost: "$$$", status: "Booked" },
  { idea: "Museum plus no-phone lunch", vibe: "Day date", owner: "Her turn", cost: "$$", status: "Saved" }
] as const;

export const discoveryPrompts = [
  "What has been heavy for you lately that I might be underestimating?",
  "What version of yourself are you trying to grow into this year?",
  "What makes you feel pursued right now?",
  "What are you craving more of in our relationship: calm, fun, affection, depth, or adventure?",
  "What would make this season of life feel more like ours?"
] as const;

export const repairQueue = [
  {
    issue: "Felt dismissed during a logistics conversation",
    trigger: "Stress + multitasking",
    revisit: "Sunday morning",
    repair: "Repeat back what was heard before solving the problem."
  },
  {
    issue: "Date night got replaced by errands",
    trigger: "Low energy after work",
    revisit: "Friday evening",
    repair: "Protect one low-cost backup ritual when the original plan falls through."
  }
] as const;

export const sharedGoals = [
  {
    category: "Connection",
    goal: "Keep a Sunday check-in rhythm for six straight weeks",
    nextStep: "Block 45 minutes and choose a cafe or couch setup",
    progress: 66
  },
  {
    category: "Adventure",
    goal: "Plan one memorable day trip before summer",
    nextStep: "Vote on three locations from the date bank",
    progress: 40
  },
  {
    category: "Intimacy",
    goal: "Create a clearer yes / no / maybe list together",
    nextStep: "Each add five ideas privately before discussing overlap",
    progress: 25
  }
] as const;

export const agreements = [
  "No conflict resolution over text unless logistics make it unavoidable.",
  "If either person says pause, schedule the revisit before ending the conversation.",
  "Weekly check-in starts with appreciation, not grievances.",
  "Intimacy feedback stays specific, kind, and blame-free."
] as const;
