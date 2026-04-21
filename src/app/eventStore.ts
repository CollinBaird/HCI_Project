export type EventType = "catering" | "corporate" | "wedding" | "conference" | "charity";

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
