import React from "react";
import { useNavigate } from "react-router";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../components/ui/dialog";
import {
  getEventsUpdatedEventName,
  getStoredEvents,
  removeStoredEvent,
  type PlannedEvent,
} from "../eventStore";

export function CalendarPage() {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<PlannedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<PlannedEvent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const refreshEvents = React.useCallback(() => {
    const updatedEvents = getStoredEvents();
    setEvents(updatedEvents);
    if (selectedEvent) {
      const updatedSelectedEvent = updatedEvents.find((event) => event.id === selectedEvent.id) ?? null;
      setSelectedEvent(updatedSelectedEvent);
    }
  }, [selectedEvent]);

  React.useEffect(() => {
    refreshEvents();
    const eventName = getEventsUpdatedEventName();
    window.addEventListener(eventName, refreshEvents);
    return () => {
      window.removeEventListener(eventName, refreshEvents);
    };
  }, [refreshEvents]);

  const handleCancelEvent = () => {
    if (!selectedEvent) {
      return;
    }

    removeStoredEvent(selectedEvent.id);
    setIsDetailsOpen(false);
    setSelectedEvent(null);
    refreshEvents();
  };

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
    setSelectedEvent(null);
  };

  const getStatusColor = (status: string) => {
    return status === "confirmed" ? "default" : "secondary";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      catering: "bg-orange-100 text-orange-800",
      corporate: "bg-blue-100 text-blue-800",
      wedding: "bg-pink-100 text-pink-800",
      conference: "bg-purple-100 text-purple-800",
      charity: "bg-green-100 text-green-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const now = new Date();
  const thisMonthEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  });
  const confirmedCount = thisMonthEvents.filter((event) => event.status === "confirmed").length;
  const pendingCount = thisMonthEvents.filter((event) => event.status === "pending").length;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Calendar</h1>
          <p className="text-gray-600">View and manage your upcoming events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View - Simplified */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="p-6 border border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                  No upcoming events scheduled.
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <Badge variant={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.venue}
                        </p>
                      </div>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDetailsOpen(true);
                      }}
                      className="mt-3 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">This Month</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-gray-900">{thisMonthEvents.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/plan-event")}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Event
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Export Calendar
                </button>
              </div>
            </Card>

          </div>
        </div>
      </div>
      <Dialog
        open={isDetailsOpen}
        onOpenChange={(open) => {
          setIsDetailsOpen(open);
          if (!open) {
            setSelectedEvent(null);
          }
        }}
      >
        {selectedEvent && (
          <DialogContent className="max-w-lg">
            <DialogTitle>Event Details</DialogTitle>
            <div className="space-y-2 text-sm text-gray-700 mb-2">
              <p><span className="font-semibold">Title:</span> {selectedEvent.title}</p>
              <p><span className="font-semibold">Date:</span> {selectedEvent.date}</p>
              <p><span className="font-semibold">Time:</span> {selectedEvent.time}</p>
              <p><span className="font-semibold">Location:</span> {selectedEvent.venue}</p>
              {selectedEvent.organizationName && (
                <p><span className="font-semibold">Organization:</span> {selectedEvent.organizationName}</p>
              )}
              {selectedEvent.catererName && (
                <p><span className="font-semibold">Caterer:</span> {selectedEvent.catererName}</p>
              )}
            </div>
            <DialogFooter className="sm:justify-between gap-3">
              <button
                onClick={closeDetailsModal}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleCancelEvent}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel Event
              </button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
