import React from "react";
import { Calendar, MapPin, Utensils, Users } from "lucide-react";
import { Card } from "../components/ui/card";
import { getEventsUpdatedEventName, getStoredEvents, type PlannedEvent } from "../eventStore";

export function Home() {
  const [upcomingEvents, setUpcomingEvents] = React.useState<PlannedEvent[]>([]);

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

  const cateringOrders = upcomingEvents.filter((event) => event.type === "catering").length;
  const totalAttendees = upcomingEvents.reduce((sum, event) => sum + (event.partySize ?? 0), 0);
  const uniqueVenues = new Set(upcomingEvents.map((event) => event.venue)).size;

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
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
