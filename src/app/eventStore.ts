export type EventType =
  | "catering"
  | "venue"
  | "combined"
  | "corporate"
  | "wedding"
  | "conference"
  | "charity";

export type PlannedEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: "confirmed" | "pending";
  type: EventType;
  partySize?: number;
  organizationName?: string;
  catererName?: string;
};

const STORAGE_KEY = "uplan_events";
const EVENTS_UPDATED = "uplan-events-updated";
const COMBINED_DRAFT_KEY = "uplan_combined_plan_draft";
const COMBINED_DRAFT_UPDATED = "uplan-combined-draft-updated";

export type CombinedPlanDraft = {
  venueName: string;
  venueLocation: string;
  catererName: string;
};

export function getStoredEvents(): PlannedEvent[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as PlannedEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredEvents(events: PlannedEvent[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new Event(EVENTS_UPDATED));
}

export function addStoredEvent(event: Omit<PlannedEvent, "id">) {
  const current = getStoredEvents();
  const nextId = current.length > 0 ? Math.max(...current.map((item) => item.id)) + 1 : 1;
  const nextEvents = [...current, { id: nextId, ...event }];
  saveStoredEvents(nextEvents);
}

export function removeStoredEvent(eventId: number) {
  const current = getStoredEvents();
  const nextEvents = current.filter((event) => event.id !== eventId);
  saveStoredEvents(nextEvents);
}

export function getEventsUpdatedEventName() {
  return EVENTS_UPDATED;
}

export function getCombinedPlanDraft(): CombinedPlanDraft {
  if (typeof window === "undefined") {
    return { venueName: "", venueLocation: "", catererName: "" };
  }

  const raw = window.localStorage.getItem(COMBINED_DRAFT_KEY);
  if (!raw) {
    return { venueName: "", venueLocation: "", catererName: "" };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CombinedPlanDraft>;
    return {
      venueName: parsed.venueName ?? "",
      venueLocation: parsed.venueLocation ?? "",
      catererName: parsed.catererName ?? "",
    };
  } catch {
    return { venueName: "", venueLocation: "", catererName: "" };
  }
}

export function updateCombinedPlanDraft(partial: Partial<CombinedPlanDraft>) {
  if (typeof window === "undefined") {
    return;
  }

  const next = { ...getCombinedPlanDraft(), ...partial };
  window.localStorage.setItem(COMBINED_DRAFT_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(COMBINED_DRAFT_UPDATED));
}

export function clearCombinedPlanDraft() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(COMBINED_DRAFT_KEY);
  window.dispatchEvent(new Event(COMBINED_DRAFT_UPDATED));
}

export function getCombinedDraftUpdatedEventName() {
  return COMBINED_DRAFT_UPDATED;
}
