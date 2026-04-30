import React from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Utensils, MapPin, Layers } from "lucide-react";

  // Why we built this page: Give users a simple starting point to choose how they want to book services.

export function PlanEvent() {
  // This page is the planning entry point and routes users to the booking flow they need.
  const navigate = useNavigate();
//This section is used to display the options for the user to choose from
//The options are:
// - Catering
// - Venue
// - Catering + Venue
  const options = [
    {
      title: "Catering",
      description: "Browse catering partners, specialties, and dietary options.",
      icon: Utensils,
      image: "/images/cater.png",
      onClick: () => navigate("/catering"),
    },
    {
      title: "Venue",
      description: "Explore available venues with capacity, pricing, and amenities.",
      icon: MapPin,
      image: "/images/venue.png",
      onClick: () => navigate("/venues"),
    },
    {
      title: "Catering + Venue",
      description: "Plan both together with linked selections and placeholders.",
      icon: Layers,
      image: "/images/catervenue.png",
      onClick: () => navigate("/plan-event/combined"),
    },
  ];
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan Event</h1>
          <p className="text-gray-600">Choose how you want to plan this event</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.title}
                className="p-6 border hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                onClick={option.onClick}
              >
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                <Icon className="w-8 h-8 text-blue-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h2>
                <p className="text-sm text-gray-600">{option.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
