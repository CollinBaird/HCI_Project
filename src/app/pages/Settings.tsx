import { Bell, Lock, Globe, CreditCard, Users, Shield } from "lucide-react";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

export function Settings() {
  const settingsSections = [
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { label: "Email notifications", description: "Receive email updates about your events", enabled: true },
        { label: "SMS notifications", description: "Get text messages for urgent updates", enabled: false },
        { label: "Push notifications", description: "Browser notifications for new messages", enabled: true },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      settings: [
        { label: "Two-factor authentication", description: "Add an extra layer of security", enabled: true },
        { label: "Public profile", description: "Make your profile visible to vendors", enabled: false },
        { label: "Activity status", description: "Show when you're online", enabled: true },
      ],
    },
    {
      title: "Language & Region",
      icon: Globe,
      settings: [
        { label: "Auto-detect timezone", description: "Automatically set timezone based on location", enabled: true },
        { label: "24-hour time format", description: "Use 24-hour time instead of AM/PM", enabled: false },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.settings.map((setting) => (
                    <div
                      key={setting.label}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{setting.label}</h3>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <Switch defaultChecked={setting.enabled} />
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}

          {/* Account Management */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Account Management</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <h3 className="font-medium text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-600">Update your account password</p>
              </button>
              <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <h3 className="font-medium text-gray-900">Email Preferences</h3>
                <p className="text-sm text-gray-600">Manage your email subscriptions</p>
              </button>
              <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <h3 className="font-medium text-gray-900">Connected Accounts</h3>
                <p className="text-sm text-gray-600">Link social media and calendar accounts</p>
              </button>
            </div>
          </Card>

          {/* Billing */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Billing & Subscription</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <h3 className="font-medium text-gray-900">Payment Methods</h3>
                <p className="text-sm text-gray-600">Manage your payment options</p>
              </button>
              <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <h3 className="font-medium text-gray-900">Billing History</h3>
                <p className="text-sm text-gray-600">View your past invoices and payments</p>
              </button>
              <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <h3 className="font-medium text-gray-900">Upgrade Plan</h3>
                <p className="text-sm text-gray-600">View premium features and upgrade</p>
              </button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 text-left border border-red-200 hover:bg-red-50 rounded-lg transition-colors">
                <h3 className="font-medium text-red-600">Deactivate Account</h3>
                <p className="text-sm text-gray-600">Temporarily disable your account</p>
              </button>
              <button className="w-full px-4 py-3 text-left border border-red-200 hover:bg-red-50 rounded-lg transition-colors">
                <h3 className="font-medium text-red-600">Delete Account</h3>
                <p className="text-sm text-gray-600">Permanently delete your account and data</p>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
