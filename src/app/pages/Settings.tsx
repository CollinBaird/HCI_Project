import { Eye, BellRing, Database, Palette, Accessibility, Shield } from "lucide-react";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

export function Settings() {
  const settingsSections = [
    {
      title: "Interface & Visuals",
      description: "Customize how information is presented to reduce cognitive load.",
      icon: Palette,
      settings: [
        { label: "High Contrast Mode", description: "Increase legibility of text and icons", enabled: false },
        { label: "Compact View", description: "Show more items on the screen at once", enabled: true },
        { label: "Reduce Motion", description: "Minimize animations in the interface", enabled: false },
      ],
    },
    {
      title: "Focus & Attention",
      description: "Manage how the system 'nudges' you throughout the day.",
      icon: BellRing,
      settings: [
        { label: "Quiet Hours", description: "Silence all non-urgent status updates after 9 PM", enabled: true },
        { label: "Batch Notifications", description: "Receive a summary instead of individual alerts", enabled: false },
      ],
    },
    {
      title: "Privacy & Visibility",
      description: "Control who sees your activity and how you are tracked.",
      icon: Shield,
      settings: [
        { label: "Activity Status", description: "Show others when you are actively using the app", enabled: true },
        { label: "Incognito Mode", description: "Prevent session data from being saved to history", enabled: false },
      ],
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Preferences</h1>
          <p className="text-slate-500 mt-2 text-lg">Tailor the experience to your specific workflow.</p>
        </header>

        <div className="space-y-8">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title}>
                <div className="flex items-center gap-3 mb-4 ml-1">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">{section.title}</h2>
                    <p className="text-xs text-slate-500">{section.description}</p>
                  </div>
                </div>

                <Card className="overflow-hidden border-slate-200 shadow-sm">
                  <div className="divide-y divide-slate-100">
                    {section.settings.map((setting) => (
                      <div
                        key={setting.label}
                        className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="text-base font-medium text-slate-900">{setting.label}</h3>
                          <p className="text-sm text-slate-500 mt-0.5">{setting.description}</p>
                        </div>
                        <Switch defaultChecked={setting.enabled} />
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            );
          })}

        </div>
      </div>
    </div>
  );
}
