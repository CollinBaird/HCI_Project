import React from "react";
import { User, Mail, Phone, MapPin, Calendar, Award } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Profile() {
  const userProfile = {
    name: "Parker Savage",
    email: "parker.savage@utexas.edu",
    phone: "+1 (555) 123-4567",
    location: "Austin, TX",
    joinDate: "January 2026",
    membershipType: "Basic",
  };

  const stats = [
    { label: "Events Planned", value: "24", icon: Calendar },
    { label: "Venues Booked", value: "18", icon: MapPin },
    { label: "Total Attendees", value: "3,420", icon: User },
    { label: "Success Rate", value: "98%", icon: Award },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Booked venue",
      details: "Grand Ballroom for Corporate Gala",
      date: "Mar 25, 2026",
    },
    {
      id: 2,
      action: "Updated catering",
      details: "Changed menu for Spring Wedding",
      date: "Mar 23, 2026",
    },
    {
      id: 3,
      action: "Sent message",
      details: "To Convention Center Team",
      date: "Mar 20, 2026",
    },
    {
      id: 4,
      action: "Created event",
      details: "Tech Conference 2026",
      date: "Mar 18, 2026",
    },
  ];

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

                <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </Card>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
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
                {recentActivity.map((activity) => (
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
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Event Master</h3>
                  <p className="text-xs text-gray-600">Planned 20+ events</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Early Adopter</h3>
                  <p className="text-xs text-gray-600">Joined in 2025</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Venue Explorer</h3>
                  <p className="text-xs text-gray-600">Visited 15+ venues</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Networking Pro</h3>
                  <p className="text-xs text-gray-600">500+ messages sent</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
