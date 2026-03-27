import { Calendar, MapPin, Utensils, Users } from "lucide-react";
import { Card } from "../components/ui/card";

export function Home() {
  const upcomingEvents = [
    { id: 1, name: "Corporate Annual Gala", date: "April 15, 2026", attendees: 250, venue: "Grand Ballroom" },
    { id: 2, name: "Spring Wedding", date: "May 3, 2026", attendees: 150, venue: "Garden Terrace" },
    { id: 3, name: "Tech Conference", date: "June 10, 2026", attendees: 500, venue: "Convention Center" },
  ];

  const stats = [
    { label: "Upcoming Events", value: "12", icon: Calendar, color: "text-blue-600" },
    { label: "Venues Booked", value: "8", icon: MapPin, color: "text-green-600" },
    { label: "Catering Orders", value: "15", icon: Utensils, color: "text-orange-600" },
    { label: "Total Attendees", value: "1,250", icon: Users, color: "text-purple-600" },
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
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{event.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees} attendees
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
