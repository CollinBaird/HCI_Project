export type EventType =
  | "catering"
  | "venue"
  | "combined"
  | "corporate"
  | "wedding"
  | "conference"
  | "charity";

export type ChatMessage = {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
};

export type Conversation = {
  id: number;
  name: string;
  bookingId: number;
  type: "venue" | "catering" | "combined";
  lastMessage: string;
  time: string;
  unread: number;
  messages: ChatMessage[];
};

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
  pricePerHour?: number;
  pricePerPerson?: number;
};

// LocalStorage keys and custom browser events used to keep pages in sync.
const STORAGE_KEY = "uplan_events";
const EVENTS_UPDATED = "uplan-events-updated";
const COMBINED_DRAFT_KEY = "uplan_combined_plan_draft";
const COMBINED_DRAFT_UPDATED = "uplan-combined-draft-updated";

export type CombinedPlanDraft = {
  venueName: string;
  venueLocation: string;
  catererName: string;
  venuePricePerHour?: number;
  catererPricePerPerson?: number;
};

// Event storage helpers 
// These functions read/write booked events and notify listeners after updates.
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

export function addStoredEvent(event: Omit<PlannedEvent, "id">): number {
  const current = getStoredEvents();
  const nextId = current.length > 0 ? Math.max(...current.map((item) => item.id)) + 1 : 1;
  const nextEvents = [...current, { id: nextId, ...event }];
  saveStoredEvents(nextEvents);
  return nextId;
}

export function removeStoredEvent(eventId: number) {
  const current = getStoredEvents();
  const nextEvents = current.filter((event) => event.id !== eventId);
  saveStoredEvents(nextEvents);
}

export function getEventsUpdatedEventName() {
  return EVENTS_UPDATED;
}

// Combined flow draft helpers 
// We keep "in-progress" combined selections here while users move between pages.
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

// Conversation/message storage helpers
// Conversation threads are also local-first and update live via events.
const CONVERSATIONS_KEY = "uplan_conversations";
const CONVERSATIONS_UPDATED = "uplan-conversations-updated";

export function getStoredConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CONVERSATIONS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Conversation[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  window.dispatchEvent(new Event(CONVERSATIONS_UPDATED));
}

export function addBookingConversation(params: {
  bookingId: number;
  vendorName: string;
  organizationName: string;
  date: string;
  time: string;
  partySize: number;
  type: "venue" | "catering" | "combined";
  pricePerHour?: number;
  pricePerPerson?: number;
}) {
  // Create a friendly first message so the conversation is not empty after booking.
  const { bookingId, vendorName, organizationName, date, time, partySize, type, pricePerHour, pricePerPerson } = params;
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const userName = "Parker Savage";
  const contactLine = "Please don't hesitate to contact us if you need anything — we're here to help make your event a success!";
  const priceNote =
    type === "venue" && pricePerHour
      ? ` Your venue rate is $${pricePerHour}/hour.`
      : type === "catering" && pricePerPerson
      ? ` Our pricing is $${pricePerPerson} per person (estimated total: $${pricePerPerson * partySize}).`
      : "";
  const welcomeContent =
    type === "venue"
      ? `Hello ${userName}, thank you for booking with ${vendorName} for ${organizationName} on ${formattedDate} at ${time} for ${partySize} guests!${priceNote} We are thrilled to host your event and look forward to making it a memorable occasion. ${contactLine}`
      : `Hello ${userName}, thank you for booking with ${vendorName} for ${organizationName} on ${formattedDate} at ${time} for ${partySize} guests!${priceNote} We're excited to provide exceptional catering service for your event. ${contactLine}`;

  const timeStr = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const welcomeMsg: ChatMessage = {
    id: 1,
    sender: vendorName,
    content: welcomeContent,
    time: timeStr,
    isOwn: false,
  };

  const current = getStoredConversations();
  const nextId = current.length > 0 ? Math.max(...current.map((c) => c.id)) + 1 : 1;

  saveStoredConversations([
    ...current,
    {
      id: nextId,
      name: vendorName,
      bookingId,
      type,
      lastMessage: welcomeContent,
      time: timeStr,
      unread: 1,
      messages: [welcomeMsg],
    },
  ]);
}

export function addMessageToConversation(conversationId: number, content: string) {
  // Append a user message and update preview metadata (last message + timestamp).
  const current = getStoredConversations();
  const timeStr = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const updated = current.map((conv) => {
    if (conv.id !== conversationId) return conv;
    const newMsg: ChatMessage = {
      id: conv.messages.length > 0 ? Math.max(...conv.messages.map((m) => m.id)) + 1 : 1,
      sender: "You",
      content,
      time: timeStr,
      isOwn: true,
    };
    return { ...conv, lastMessage: content, time: timeStr, unread: 0, messages: [...conv.messages, newMsg] };
  });

  saveStoredConversations(updated);
}

export function markConversationRead(conversationId: number) {
  // Used when a thread is opened so unread badges clear immediately.
  const current = getStoredConversations();
  const updated = current.map((conv) =>
    conv.id === conversationId ? { ...conv, unread: 0 } : conv
  );
  saveStoredConversations(updated);
}

export function getConversationsUpdatedEventName() {
  return CONVERSATIONS_UPDATED;
}
