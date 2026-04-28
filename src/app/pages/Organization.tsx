import React from "react";
import { Building2, Users, Target, Mail, Phone } from "lucide-react";
import { Card } from "../components/ui/card";

  // Why we built this page: Show team context and contact information for coordination and visibility.
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Organization() {
  const team = [
    { name: "Parker Savage", role: "Event Director", email: "parker@uplan.com" },
    { name: "Collin Baird", role: "Vendor Manager", email: "collin@uplan.com" },
    { name: "Victoria Rowe", role: "Logistics Lead", email: "victoria@uplan.com" },
    { name: "Hunter Mena", role: "Operations Coordinator", email: "hunter@uplan.com" },
  ];

  const goals = [
    "Deliver high-quality event experiences with predictable budgets.",
    "Reduce planning turnaround time with reusable templates.",
    "Improve vendor communication and response tracking.",
  ];

  // Member distribution by grade (12 core members)
  const membersByGrade = [
    { name: "Freshman", value: 3, percentage: 25 },
    { name: "Sophomore", value: 3, percentage: 25 },
    { name: "Junior", value: 3, percentage: 25 },
    { name: "Senior", value: 3, percentage: 25 },
  ];

  // Attendance data from 2024-2026
  const attendanceData = [
    { month: "Jan 2024", attendance: 45 },
    { month: "Mar 2024", attendance: 52 },
    { month: "May 2024", attendance: 48 },
    { month: "Jul 2024", attendance: 55 },
    { month: "Sep 2024", attendance: 62 },
    { month: "Nov 2024", attendance: 58 },
    { month: "Jan 2025", attendance: 64 },
    { month: "Mar 2025", attendance: 71 },
    { month: "May 2025", attendance: 68 },
    { month: "Jul 2025", attendance: 75 },
    { month: "Sep 2025", attendance: 82 },
    { month: "Nov 2025", attendance: 78 },
    { month: "Jan 2026", attendance: 85 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];
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

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Member Distribution by Grade</h2>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={membersByGrade}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {membersByGrade.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {membersByGrade.map((grade, index) => (
                <div key={grade.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-gray-700">
                    {grade.name}: {grade.value} members ({grade.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Over Time (2024-2026)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Attendance"
                />
              </LineChart>
            </ResponsiveContainer>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>events@uplan.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+1 (676) 676-7676</span>
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
