import React from "react";
import { useNavigate } from "react-router";
import { Calendar, MapPin, Utensils, Users, X } from "lucide-react";
import { Card } from "../components/ui/card";
import { TimePicker15 } from "../components/TimePicker15";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import {
  getEventsUpdatedEventName,
  getStoredEvents,
  removeStoredEvent,
  saveStoredEvents,
  type PlannedEvent,
} from "../eventStore";

export function Home() {
  const [upcomingEvents, setUpcomingEvents] = React.useState<PlannedEvent[]>([]);
  const [editingEvent, setEditingEvent] = React.useState<PlannedEvent | null>(null);
  const [editForm, setEditForm] = React.useState({ title: "", date: "", time: "", venue: "", partySize: "" });
  const navigate = useNavigate();

  const refreshEvents = React.useCallback(() => {
    setUpcomingEvents(getStoredEvents());
  }, []);

  React.useEffect(() => {
    refreshEvents();
    const eventName = getEventsUpdatedEventName();
    window.addEventListener(eventName, refreshEvents);
    return () => {
      window.removeEventListener(eventName, refreshEvents);
    };
  }, [refreshEvents]);

  const openEdit = (event: PlannedEvent) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      partySize: String(event.partySize ?? ""),
    });
  };

  const saveEdit = () => {
    if (!editingEvent) return;
    const updated = getStoredEvents().map((e) =>
      e.id === editingEvent.id
        ? { ...e, title: editForm.title, date: editForm.date, time: editForm.time, venue: editForm.venue, partySize: Number(editForm.partySize) }
        : e
    );
    saveStoredEvents(updated);
    setEditingEvent(null);
  };

  const venueBookingEvents = upcomingEvents.filter((event) => event.type !== "catering");
  const cateringOrders = upcomingEvents.filter((event) => event.type === "catering").length;
  const totalAttendees = upcomingEvents.reduce((sum, event) => sum + (event.partySize ?? 0), 0);
  const uniqueVenues = new Set(venueBookingEvents.map((event) => event.venue)).size;

  const stats = [
    { label: "Upcoming Events", value: String(upcomingEvents.length), icon: Calendar, color: "text-blue-600" },
    { label: "Venues Booked", value: String(uniqueVenues), icon: MapPin, color: "text-green-600" },
    { label: "Catering Orders", value: String(cateringOrders), icon: Utensils, color: "text-orange-600" },
    { label: "Total Attendees", value: String(totalAttendees), icon: Users, color: "text-purple-600" },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Here's what's happening with your events</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Events */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="p-6 border border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                No upcoming events yet.
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.partySize ?? 0} attendees
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(event)}
                      className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      Edit Event
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                          Cancel Event
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel "{event.title}" and remove it from your upcoming events and calendar.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Go Back</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeStoredEvent(event.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Yes, Cancel Event
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Event</h2>
              <button onClick={() => setEditingEvent(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                {/* Time increments are 15 minutes in order to simplify booking process */}
                <TimePicker15
                  value={editForm.time}
                  onChange={(time) => setEditForm({ ...editForm, time })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <input
                  type="text"
                  value={editForm.venue}
                  onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Attendees</label>
                <input
                  type="number"
                  value={editForm.partySize}
                  onChange={(e) => setEditForm({ ...editForm, partySize: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingEvent(null)}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}