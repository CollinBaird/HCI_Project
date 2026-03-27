import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function CalendarPage() {
  const events = [
    {
      id: 1,
      title: "Corporate Annual Gala",
      date: "2026-04-15",
      time: "6:00 PM - 11:00 PM",
      venue: "Grand Ballroom",
      status: "confirmed",
      type: "corporate",
    },
    {
      id: 2,
      title: "Spring Wedding",
      date: "2026-05-03",
      time: "2:00 PM - 10:00 PM",
      venue: "Garden Terrace",
      status: "confirmed",
      type: "wedding",
    },
    {
      id: 3,
      title: "Product Launch Event",
      date: "2026-05-20",
      time: "7:00 PM - 9:00 PM",
      venue: "Skyline Rooftop",
      status: "pending",
      type: "corporate",
    },
    {
      id: 4,
      title: "Tech Conference",
      date: "2026-06-10",
      time: "9:00 AM - 5:00 PM",
      venue: "Convention Center",
      status: "confirmed",
      type: "conference",
    },
    {
      id: 5,
      title: "Charity Fundraiser",
      date: "2026-06-25",
      time: "5:00 PM - 9:00 PM",
      venue: "Grand Ballroom",
      status: "pending",
      type: "charity",
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "confirmed" ? "default" : "secondary";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      corporate: "bg-blue-100 text-blue-800",
      wedding: "bg-pink-100 text-pink-800",
      conference: "bg-purple-100 text-purple-800",
      charity: "bg-green-100 text-green-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

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
              {events.map((event) => (
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
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">This Month</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">4</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
    </div>
  );
}
