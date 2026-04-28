import React from "react";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../components/ui/dialog";
import { getEventsUpdatedEventName, getStoredEvents, type PlannedEvent } from "../eventStore";

    // Why we built this page: Give users a personal hub for identity, activity history, and planning metrics.

export function Profile() {
  const [userProfile, setUserProfile] = React.useState({
    name: "Parker Savage",
    email: "parker.savage@utexas.edu",
    phone: "+1 (676) 676-7676",
    location: "Austin, TX",
    joinDate: "January 2026",
    membershipType: "Basic",
  });
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [draftEmail, setDraftEmail] = React.useState(userProfile.email);
  const [draftPhone, setDraftPhone] = React.useState(userProfile.phone);
  const [draftLocation, setDraftLocation] = React.useState(userProfile.location);

  const [events, setEvents] = React.useState<PlannedEvent[]>([]);

  const refreshEvents = React.useCallback(() => {
    setEvents(getStoredEvents());
  }, []);

  React.useEffect(() => {
    refreshEvents();
    const eventName = getEventsUpdatedEventName();
    window.addEventListener(eventName, refreshEvents);
  return () => {
      window.removeEventListener(eventName, refreshEvents);
    };
  }, [refreshEvents]);

  const venueBookingEvents = events.filter((event) => event.type !== "catering");
  const totalAttendees = events.reduce((sum, event) => sum + (event.partySize ?? 0), 0);
  const bookedVenuesCount = new Set(venueBookingEvents.map((event) => event.venue)).size;

  const stats = [
    { label: "Events Planned", value: String(events.length), icon: Calendar },
    { label: "Venues Booked", value: String(bookedVenuesCount), icon: MapPin },
    { label: "Total Attendees", value: String(totalAttendees), icon: User },
  ];

  const recentActivity = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
    .map((event) => ({
      id: event.id,
      action: event.type === "catering" ? "Booked catering" : "Booked event",
      details: `${event.title} at ${event.venue}`,
      date: new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

  const openEditModal = () => {
    setDraftEmail(userProfile.email);
    setDraftPhone(userProfile.phone);
    setDraftLocation(userProfile.location);
    setIsEditOpen(true);
  };

  const handleSaveProfile = () => {
    setUserProfile((prev) => ({
      ...prev,
      email: draftEmail,
      phone: draftPhone,
      location: draftLocation,
    }));
    setIsEditOpen(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your personal information and activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <User className="w-14 h-14 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{userProfile.name}</h2>
                <Badge className="mb-4">{userProfile.membershipType} Member</Badge>
                
                <div className="space-y-3 text-left mt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                </div>

                <button
                  onClick={openEditModal}
                  className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </Card>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-gray-500">No activity yet.</p>
                ) : (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.action}</h3>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {activity.date}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>Edit Profile</DialogTitle>
          <div className="space-y-4">
            <div>
              <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="profile-email"
                type="email"
                value={draftEmail}
                onChange={(event) => setDraftEmail(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="profile-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="profile-phone"
                type="tel"
                value={draftPhone}
                onChange={(event) => setDraftPhone(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="profile-location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="profile-location"
                type="text"
                value={draftLocation}
                onChange={(event) => setDraftLocation(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between gap-3">
            <button
              onClick={() => setIsEditOpen(false)}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
