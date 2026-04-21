import React from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";
import {
  addStoredEvent,
  clearCombinedPlanDraft,
  getCombinedDraftUpdatedEventName,
  getCombinedPlanDraft,
} from "../eventStore";

export function PlanEventCombined() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [eventTime, setEventTime] = React.useState("");
  const [partySize, setPartySize] = React.useState("");
  const [organizationName, setOrganizationName] = React.useState("");
  const [draft, setDraft] = React.useState(getCombinedPlanDraft());

  React.useEffect(() => {
    setDraft(getCombinedPlanDraft());
  }, []);

  React.useEffect(() => {
    const eventName = getCombinedDraftUpdatedEventName();
    const handleUpdate = () => setDraft(getCombinedPlanDraft());
    window.addEventListener(eventName, handleUpdate);
    return () => window.removeEventListener(eventName, handleUpdate);
  }, []);

  const handleComplete = () => {
    if (!draft.venueName || !draft.catererName || !selectedDate || !eventTime || !partySize || !organizationName) {
      return;
    }

    addStoredEvent({
      title: `${organizationName} Combined Booking`,
      date: selectedDate.toISOString().split("T")[0],
      time: eventTime,
      venue: draft.venueName,
      status: "confirmed",
      type: "combined",
      partySize: Number(partySize),
      organizationName,
      catererName: draft.catererName,
    });
    clearCombinedPlanDraft();
    navigate("/calendar");
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catering + Venue</h1>
          <p className="text-gray-600">Select both options to begin building a combined event plan</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <button
                onClick={() => navigate("/venues?selectOnly=1&returnTo=/plan-event/combined")}
                className="w-full rounded-lg bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition-colors"
              >
                Select Venue
              </button>
            </div>

            <div>
              <button
                onClick={() => navigate("/catering?selectOnly=1&returnTo=/plan-event/combined")}
                className="w-full rounded-lg bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition-colors"
              >
                Select Catering
              </button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 min-h-48">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Venue Placeholder</h2>
            {draft.venueName ? (
              <>
                <p className="text-sm text-gray-700">Selected venue: {draft.venueName}</p>
                <p className="text-xs text-gray-500 mt-2">{draft.venueLocation}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">No venue selected yet.</p>
            )}
          </Card>

          <Card className="p-6 min-h-48">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Catering Placeholder</h2>
            {draft.catererName ? (
              <p className="text-sm text-gray-700">Selected caterer: {draft.catererName}</p>
            ) : (
              <p className="text-sm text-gray-500">No caterer selected yet.</p>
            )}
          </Card>
        </div>

        <Card className="p-6 mt-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Combined Event</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Select Date</p>
              <div className="border border-gray-200 rounded-lg inline-block">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="combined-time" className="block text-sm font-semibold text-gray-700 mb-2">
                  Time of Day
                </label>
                <input
                  id="combined-time"
                  type="time"
                  value={eventTime}
                  onChange={(event) => setEventTime(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="combined-party-size" className="block text-sm font-semibold text-gray-700 mb-2">
                  Party Size
                </label>
                <input
                  id="combined-party-size"
                  type="number"
                  min="1"
                  value={partySize}
                  onChange={(event) => setPartySize(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="combined-org" className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  id="combined-org"
                  type="text"
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleComplete}
            disabled={!draft.venueName || !draft.catererName || !selectedDate || !eventTime || !partySize || !organizationName}
            className="mt-8 w-full px-6 py-4 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            Complete
          </button>
        </Card>
      </div>
    </div>
  );
}
