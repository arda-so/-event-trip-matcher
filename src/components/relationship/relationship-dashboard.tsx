"use client";

import { ChangeEvent, startTransition, useEffect, useRef, useState } from "react";
import { discoveryPrompts } from "@/data/relationship-app";
import {
  CheckInState,
  DateIdea,
  GoalItem,
  IntimacyEntry,
  RELATIONSHIP_STORAGE_KEY,
  RelationshipWorkspaceState,
  RepairItem,
  coerceRelationshipWorkspaceState,
  defaultRelationshipWorkspaceState
} from "@/lib/relationship-workspace";

function SectionCard({
  id,
  kicker,
  title,
  description,
  children
}: {
  id: string;
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(20,33,28,0.08)] backdrop-blur md:p-8"
    >
      <div className="mb-6 max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-moss">{kicker}</p>
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h2>
        <p className="text-sm leading-7 text-black/68 md:text-base">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-[1rem] border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-moss";
const textAreaClassName = `${inputClassName} min-h-[120px] resize-y`;

export function RelationshipDashboard() {
  const [state, setState] = useState<RelationshipWorkspaceState>(defaultRelationshipWorkspaceState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [saveLabel, setSaveLabel] = useState("Local draft");
  const [workspaceKey, setWorkspaceKey] = useState("our-relationship");
  const [passcode, setPasscode] = useState("");
  const [remoteLabel, setRemoteLabel] = useState("Not connected");
  const [isRemoteBusy, setIsRemoteBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(RELATIONSHIP_STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          state?: unknown;
          workspaceKey?: string;
        } | null;

        if (parsed && typeof parsed === "object" && "state" in parsed) {
          setState(coerceRelationshipWorkspaceState(parsed.state));
          if (typeof parsed.workspaceKey === "string" && parsed.workspaceKey.trim()) {
            setWorkspaceKey(parsed.workspaceKey);
          }
        } else {
          setState(coerceRelationshipWorkspaceState(parsed));
        }
        setSaveLabel("Loaded local draft");
      } catch {
        setSaveLabel("Using starter template");
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(
      RELATIONSHIP_STORAGE_KEY,
      JSON.stringify({
        workspaceKey,
        state
      })
    );
    startTransition(() => {
      setSaveLabel(`Saved locally at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
    });
  }, [isHydrated, state, workspaceKey]);

  const stats = [
    { label: "Connection", value: `${state.checkIn.connectionScore}/10`, note: "Updated from your weekly check-in." },
    { label: "Repair queue", value: `${state.repairItems.length} topics`, note: "Hard conversations waiting for a calmer revisit." },
    { label: "Date ideas", value: `${state.dateIdeas.length} saved`, note: "Enough options to avoid dead air on Friday night." },
    {
      label: "Shared goals",
      value: `${state.goals.filter((goal) => goal.progress < 100).length} active`,
      note: "Visible next steps keep the relationship moving."
    }
  ] as const;

  function updateCheckIn<K extends keyof CheckInState>(key: K, value: CheckInState[K]) {
    setState((current) => ({
      ...current,
      checkIn: { ...current.checkIn, [key]: value }
    }));
  }

  function updateIntimacy<K extends keyof IntimacyEntry>(key: K, value: IntimacyEntry[K]) {
    setState((current) => ({
      ...current,
      intimacy: { ...current.intimacy, [key]: value }
    }));
  }

  function updateDateIdea(index: number, key: keyof DateIdea, value: string) {
    setState((current) => ({
      ...current,
      dateIdeas: current.dateIdeas.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    }));
  }

  function addDateIdea() {
    setState((current) => ({
      ...current,
      dateIdeas: [...current.dateIdeas, { idea: "", vibe: "", owner: "", cost: "$", status: "Ready" }]
    }));
  }

  function removeDateIdea(index: number) {
    setState((current) => ({
      ...current,
      dateIdeas: current.dateIdeas.filter((_, itemIndex) => itemIndex !== index)
    }));
  }

  function updateRepairItem(index: number, key: keyof RepairItem, value: string) {
    setState((current) => ({
      ...current,
      repairItems: current.repairItems.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    }));
  }

  function addRepairItem() {
    setState((current) => ({
      ...current,
      repairItems: [...current.repairItems, { issue: "", trigger: "", revisit: "", repair: "" }]
    }));
  }

  function updateGoal(index: number, key: keyof GoalItem, value: string | number) {
    setState((current) => ({
      ...current,
      goals: current.goals.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    }));
  }

  function addGoal() {
    setState((current) => ({
      ...current,
      goals: [...current.goals, { category: "", goal: "", nextStep: "", progress: 0 }]
    }));
  }

  function updateAgreement(index: number, value: string) {
    setState((current) => ({
      ...current,
      agreements: current.agreements.map((item, itemIndex) => (itemIndex === index ? value : item))
    }));
  }

  function addAgreement() {
    setState((current) => ({
      ...current,
      agreements: [...current.agreements, ""]
    }));
  }

  function resetApp() {
    window.localStorage.removeItem(RELATIONSHIP_STORAGE_KEY);
    setState(defaultRelationshipWorkspaceState);
    setSaveLabel("Starter template restored");
    setRemoteLabel("Not connected");
  }

  function exportData() {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: 1,
      workspaceKey,
      data: state
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `us-on-purpose-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
    setSaveLabel("Exported JSON backup");
  }

  function triggerImport() {
    fileInputRef.current?.click();
  }

  function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as { workspaceKey?: unknown; data?: unknown };
        const nextState = coerceRelationshipWorkspaceState(parsed?.data ?? parsed);
        setState(nextState);
        if (typeof parsed?.workspaceKey === "string" && parsed.workspaceKey.trim()) {
          setWorkspaceKey(parsed.workspaceKey);
        }
        setSaveLabel(`Imported backup from ${file.name}`);
      } catch {
        setSaveLabel("Import failed: invalid JSON file");
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  async function loadSharedWorkspace() {
    if (workspaceKey.trim().length < 3 || passcode.trim().length < 4) {
      setRemoteLabel("Enter a workspace name and passcode");
      return;
    }

    setIsRemoteBusy(true);

    try {
      const response = await fetch(
        `/api/relationship-workspace?workspaceKey=${encodeURIComponent(workspaceKey)}&passcode=${encodeURIComponent(passcode)}`,
        { method: "GET" }
      );
      const payload = (await response.json()) as { error?: string; exists?: boolean; data?: unknown };

      if (!response.ok) {
        setRemoteLabel(payload.error ?? "Failed to load workspace");
        return;
      }

      setState(coerceRelationshipWorkspaceState(payload.data));
      setRemoteLabel(payload.exists ? "Loaded shared workspace" : "Workspace not found yet. Save to create it.");
    } catch {
      setRemoteLabel("Network or server error while loading");
    } finally {
      setIsRemoteBusy(false);
    }
  }

  async function saveSharedWorkspace() {
    if (workspaceKey.trim().length < 3 || passcode.trim().length < 4) {
      setRemoteLabel("Enter a workspace name and passcode");
      return;
    }

    setIsRemoteBusy(true);

    try {
      const response = await fetch("/api/relationship-workspace", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceKey,
          passcode,
          data: state
        })
      });
      const payload = (await response.json()) as { error?: string; data?: unknown };

      if (!response.ok) {
        setRemoteLabel(payload.error ?? "Failed to save workspace");
        return;
      }

      setState(coerceRelationshipWorkspaceState(payload.data));
      setRemoteLabel(`Saved to shared workspace at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
    } catch {
      setRemoteLabel("Network or server error while saving");
    } finally {
      setIsRemoteBusy(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[2.4rem] border border-black/10 bg-ink px-7 py-8 text-white shadow-[0_30px_100px_rgba(20,33,28,0.18)] md:px-10 md:py-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sand/75">Private relationship space</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              A calmer way to repair, reconnect, and keep discovering each other.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/76 md:text-lg">
              This version can keep a local draft and also sync one shared workspace through Postgres using a shared
              name and passcode.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {["Local draft + shared sync", "Weekly check-in first", "Discover, not just fix", "Designed for two phones"].map(
              (pill) => (
                <span key={pill} className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-white/84">
                  {pill}
                </span>
              )
            )}
          </div>
        </div>

        <aside className="rounded-[2.4rem] border border-black/10 bg-[#f5efe5]/90 p-6 shadow-[0_24px_80px_rgba(20,33,28,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-rust">Shared workspace</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-black/72">
            <Field label="Workspace name">
              <input className={inputClassName} value={workspaceKey} onChange={(event) => setWorkspaceKey(event.target.value)} />
            </Field>
            <Field label="Shared passcode">
              <input
                className={inputClassName}
                type="password"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
              />
            </Field>
            <p>
              <span className="font-semibold text-ink">Local draft:</span> {saveLabel}
            </p>
            <p>
              <span className="font-semibold text-ink">Shared sync:</span> {remoteLabel}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadSharedWorkspace}
                disabled={isRemoteBusy}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Load shared
              </button>
              <button
                type="button"
                onClick={saveSharedWorkspace}
                disabled={isRemoteBusy}
                className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save shared
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={exportData}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-black/5"
              >
                Export backup
              </button>
              <button
                type="button"
                onClick={triggerImport}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-black/5"
              >
                Import backup
              </button>
              <button
                type="button"
                onClick={resetApp}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-black/5"
              >
                Reset local data
              </button>
              <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importData} />
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.6rem] border border-black/8 bg-white/70 p-5 shadow-[0_18px_50px_rgba(20,33,28,0.05)]"
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-black/46">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-black/62">{stat.note}</p>
          </article>
        ))}
      </section>

      <nav className="overflow-x-auto rounded-full border border-black/8 bg-white/65 px-4 py-3 text-sm text-black/66 shadow-[0_16px_40px_rgba(20,33,28,0.05)]">
        <div className="flex min-w-max items-center gap-4">
          {[
            ["check-in", "Weekly Check-In"],
            ["intimacy", "Intimacy"],
            ["dates", "Date Bank"],
            ["discovery", "Discovery"],
            ["repair", "Repair Queue"],
            ["goals", "Shared Goals"],
            ["agreements", "Agreements"]
          ].map(([href, label]) => (
            <a key={href} href={`#${href}`} className="rounded-full px-3 py-2 hover:bg-black/5 hover:text-ink">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="grid gap-8">
        <SectionCard id="check-in" kicker="Tab 1" title="The Weekly Check-In" description="The anchor ritual. Capture what is working, where the distance showed up, and what support looks like next.">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Check-in date">
              <input className={inputClassName} type="date" value={state.checkIn.date} onChange={(event) => updateCheckIn("date", event.target.value)} />
            </Field>
            <Field label={`Connection score: ${state.checkIn.connectionScore}/10`}>
              <input className="w-full accent-moss" type="range" min="1" max="10" value={state.checkIn.connectionScore} onChange={(event) => updateCheckIn("connectionScore", Number(event.target.value))} />
            </Field>
            <Field label="Rose"><textarea className={textAreaClassName} value={state.checkIn.rose} onChange={(event) => updateCheckIn("rose", event.target.value)} /></Field>
            <Field label="Thorn"><textarea className={textAreaClassName} value={state.checkIn.thorn} onChange={(event) => updateCheckIn("thorn", event.target.value)} /></Field>
            <Field label="Bud"><textarea className={textAreaClassName} value={state.checkIn.bud} onChange={(event) => updateCheckIn("bud", event.target.value)} /></Field>
            <Field label="What I appreciated about you"><textarea className={textAreaClassName} value={state.checkIn.appreciation} onChange={(event) => updateCheckIn("appreciation", event.target.value)} /></Field>
            <Field label="Where I felt disconnected"><textarea className={textAreaClassName} value={state.checkIn.disconnected} onChange={(event) => updateCheckIn("disconnected", event.target.value)} /></Field>
            <Field label="How can I support you next week?"><textarea className={textAreaClassName} value={state.checkIn.support} onChange={(event) => updateCheckIn("support", event.target.value)} /></Field>
            <Field label="One thing I want to do better next week"><textarea className={textAreaClassName} value={state.checkIn.improve} onChange={(event) => updateCheckIn("improve", event.target.value)} /></Field>
            <Field label="One thing we should celebrate"><textarea className={textAreaClassName} value={state.checkIn.celebrate} onChange={(event) => updateCheckIn("celebrate", event.target.value)} /></Field>
          </div>
        </SectionCard>

        <SectionCard id="intimacy" kicker="Tab 2" title="Sexual and Emotional Intimacy" description="Keep this direct but respectful. The point is to reduce pressure and make preferences clearer.">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] bg-[#f8f6f1] p-5">
              <Field label={`Desire level lately: ${state.intimacy.desireLevel}/10`}>
                <input className="w-full accent-rust" type="range" min="1" max="10" value={state.intimacy.desireLevel} onChange={(event) => updateIntimacy("desireLevel", Number(event.target.value))} />
              </Field>
              <div className="mt-4 grid gap-4">
                <Field label="Mood setters"><textarea className={textAreaClassName} value={state.intimacy.moodSetters} onChange={(event) => updateIntimacy("moodSetters", event.target.value)} /></Field>
                <Field label="Non-sexual intimacy ideas"><textarea className={textAreaClassName} value={state.intimacy.nonSexualIntimacy} onChange={(event) => updateIntimacy("nonSexualIntimacy", event.target.value)} /></Field>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-ink p-5 text-white">
              <div className="grid gap-4">
                <Field label="Yes / No / Maybe list"><textarea className="min-h-[120px] w-full rounded-[1rem] border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition focus:border-sand" value={state.intimacy.yesNoMaybe} onChange={(event) => updateIntimacy("yesNoMaybe", event.target.value)} /></Field>
                <Field label="Desires and fantasies"><textarea className="min-h-[120px] w-full rounded-[1rem] border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition focus:border-sand" value={state.intimacy.desires} onChange={(event) => updateIntimacy("desires", event.target.value)} /></Field>
                <Field label="Boundaries or soft no's"><textarea className="min-h-[120px] w-full rounded-[1rem] border border-white/12 bg-white/6 px-4 py-3 text-sm text-white outline-none transition focus:border-sand" value={state.intimacy.boundaries} onChange={(event) => updateIntimacy("boundaries", event.target.value)} /></Field>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="dates" kicker="Tab 3" title="The Date Night Bank" description="Save ideas while you have energy so future-you does not have to start from zero.">
          <div className="space-y-4">
            {state.dateIdeas.map((item, index) => (
              <article key={`${index}-${item.idea}`} className="rounded-[1.5rem] border border-black/8 bg-[#fbf8f3] p-5">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <Field label="Date idea"><input className={inputClassName} value={item.idea} onChange={(event) => updateDateIdea(index, "idea", event.target.value)} /></Field>
                  <Field label="Vibe"><input className={inputClassName} value={item.vibe} onChange={(event) => updateDateIdea(index, "vibe", event.target.value)} /></Field>
                  <Field label="Owner"><input className={inputClassName} value={item.owner} onChange={(event) => updateDateIdea(index, "owner", event.target.value)} /></Field>
                  <Field label="Cost"><input className={inputClassName} value={item.cost} onChange={(event) => updateDateIdea(index, "cost", event.target.value)} /></Field>
                  <Field label="Status"><input className={inputClassName} value={item.status} onChange={(event) => updateDateIdea(index, "status", event.target.value)} /></Field>
                </div>
                <button type="button" onClick={() => removeDateIdea(index)} className="mt-4 text-sm font-medium text-rust underline-offset-4 hover:underline">
                  Remove idea
                </button>
              </article>
            ))}
            <button type="button" onClick={addDateIdea} className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">
              Add date idea
            </button>
          </div>
        </SectionCard>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <SectionCard id="discovery" kicker="Tab 4" title="The Discovery Zone" description="Use prompts to keep updating your understanding of each other. Copy answers in below or journal together.">
            <div className="space-y-4">
              <div className="rounded-[1.4rem] bg-[#f7f3ec] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rust">Prompts to use</p>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-black/72">
                  {discoveryPrompts.map((prompt) => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>
              </div>
              <Field label="Notes, answers, surprises, current favorites">
                <textarea className={`${textAreaClassName} min-h-[260px]`} value={state.discoveryNotes} onChange={(event) => setState((current) => ({ ...current, discoveryNotes: event.target.value }))} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard id="repair" kicker="Tab 5" title="Repair Queue" description="This is for issues you both acknowledge, pause, and revisit on purpose.">
            <div className="space-y-4">
              {state.repairItems.map((item, index) => (
                <article key={`${index}-${item.issue}`} className="rounded-[1.4rem] border border-black/8 bg-white p-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Issue"><input className={inputClassName} value={item.issue} onChange={(event) => updateRepairItem(index, "issue", event.target.value)} /></Field>
                    <Field label="Trigger"><input className={inputClassName} value={item.trigger} onChange={(event) => updateRepairItem(index, "trigger", event.target.value)} /></Field>
                    <Field label="Scheduled revisit"><input className={inputClassName} value={item.revisit} onChange={(event) => updateRepairItem(index, "revisit", event.target.value)} /></Field>
                    <Field label="Repair plan"><input className={inputClassName} value={item.repair} onChange={(event) => updateRepairItem(index, "repair", event.target.value)} /></Field>
                  </div>
                </article>
              ))}
              <button type="button" onClick={addRepairItem} className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-ink">
                Add repair topic
              </button>
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard id="goals" kicker="Tab 6" title="Shared Goals and Dreams" description="Keep at least a few future-facing goals in sight so the relationship stays larger than today's logistics.">
            <div className="space-y-4">
              {state.goals.map((goal, index) => (
                <article key={`${index}-${goal.goal}`} className="rounded-[1.4rem] bg-[#f7f3ec] p-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Category"><input className={inputClassName} value={goal.category} onChange={(event) => updateGoal(index, "category", event.target.value)} /></Field>
                    <Field label={`Progress: ${goal.progress}%`}><input className="w-full accent-moss" type="range" min="0" max="100" value={goal.progress} onChange={(event) => updateGoal(index, "progress", Number(event.target.value))} /></Field>
                    <Field label="Goal"><input className={inputClassName} value={goal.goal} onChange={(event) => updateGoal(index, "goal", event.target.value)} /></Field>
                    <Field label="Next action step"><input className={inputClassName} value={goal.nextStep} onChange={(event) => updateGoal(index, "nextStep", event.target.value)} /></Field>
                  </div>
                </article>
              ))}
              <button type="button" onClick={addGoal} className="rounded-full bg-moss px-5 py-3 text-sm font-medium text-white">
                Add shared goal
              </button>
            </div>
          </SectionCard>

          <SectionCard id="agreements" kicker="Support tab" title="Agreements and Boundaries" description="Write the rules you want to rely on when either of you is tired, stressed, or reactive.">
            <div className="space-y-4">
              {state.agreements.map((agreement, index) => (
                <Field key={`${index}-${agreement}`} label={`Agreement ${index + 1}`}>
                  <textarea className={textAreaClassName} value={agreement} onChange={(event) => updateAgreement(index, event.target.value)} />
                </Field>
              ))}
              <button type="button" onClick={addAgreement} className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-ink">
                Add agreement
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
