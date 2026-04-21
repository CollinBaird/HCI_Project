import React, { useState } from "react";
import { Card } from "../components/ui/card";

const venueOptions = [
  "DeBaby on the Beta Flawn",
  "Garden Terrace",
  "Convention Center",
  "Skyline Rooftop",
];

const cateringOptions = [
  "Gourmet Delights Catering",
  "Elegant Eats",
  "BBQ Masters",
  "Mediterranean Feast",
];

export function PlanEventCombined() {
  const [selectedVenue, setSelectedVenue] = useState("");
  const [selectedCaterer, setSelectedCaterer] = useState("");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catering + Venue</h1>
          <p className="text-gray-600">Select both options to begin building a combined event plan</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="venue-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Venue
              </label>
              <select
                id="venue-select"
                value={selectedVenue}
                onChange={(event) => setSelectedVenue(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a venue</option>
                {venueOptions.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="caterer-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Caterer
              </label>
              <select
                id="caterer-select"
                value={selectedCaterer}
                onChange={(event) => setSelectedCaterer(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a caterer</option>
                {cateringOptions.map((caterer) => (
                  <option key={caterer} value={caterer}>
                    {caterer}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 min-h-48">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Venue Placeholder</h2>
            {selectedVenue ? (
              <p className="text-sm text-gray-700">Selected venue: {selectedVenue}</p>
            ) : (
              <p className="text-sm text-gray-500">No venue selected yet.</p>
            )}
          </Card>

          <Card className="p-6 min-h-48">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Catering Placeholder</h2>
            {selectedCaterer ? (
              <p className="text-sm text-gray-700">Selected caterer: {selectedCaterer}</p>
            ) : (
              <p className="text-sm text-gray-500">No caterer selected yet.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
