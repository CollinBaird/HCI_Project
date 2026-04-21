import React from "react";
import { Building2, Users, Target, CalendarCheck, Mail, Phone } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Organization() {
  const team = [
    { name: "Alex Martinez", role: "Event Director", email: "alex@uplan.com" },
    { name: "Jamie Carter", role: "Vendor Manager", email: "jamie@uplan.com" },
    { name: "Riley Brooks", role: "Logistics Lead", email: "riley@uplan.com" },
  ];

  const goals = [
    "Deliver high-quality event experiences with predictable budgets.",
    "Reduce planning turnaround time with reusable templates.",
    "Improve vendor communication and response tracking.",
  ];

  const upcomingMilestones = [
    { title: "Spring Showcase Final Run", date: "Apr 8, 2026", status: "In Progress" },
    { title: "Summer Expo Vendor Lock", date: "Apr 20, 2026", status: "Upcoming" },
    { title: "Corporate Gala Logistics Review", date: "May 2, 2026", status: "Planned" },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization</h1>
          <p className="text-gray-600">Team structure, goals, and planning milestones for UPlan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Department</h2>
            </div>
            <p className="text-sm text-gray-600">Campus Events and Programming</p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Team Size</h2>
            </div>
            <p className="text-sm text-gray-600">12 core members, 25 seasonal volunteers</p>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Primary Focus</h2>
            </div>
            <p className="text-sm text-gray-600">Student, alumni, and community event operations</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <div className="space-y-4">
              {team.map((member) => (
                <div
                  key={member.email}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <span className="text-sm text-blue-700">{member.email}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2026 Planning Goals</h2>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                  <p className="text-sm text-gray-700">{goal}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Upcoming Milestones</h2>
            </div>
            <div className="space-y-4">
              {upcomingMilestones.map((item) => (
                <div key={item.title} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>events@uplan.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+1 (555) 210-8891</span>
              </div>
              <p className="pt-2 text-gray-600">
                Office hours: Monday-Friday, 9:00 AM to 5:00 PM.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
