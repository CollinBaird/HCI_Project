import React from "react";
import { MapPin, Users, DollarSign, Star } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Venues() {
  const venues = [
    {
      id: 1,
      name: "DeBaby on the Beta Flawn",
      location: "Beta Flawn, Main Campus",
      capacity: 500,
      pricePerHour: 350,
      rating: 4.8,
      image: "/images/beta.png",
      amenities: ["WiFi", "AV Equipment", "Catering Kitchen", "Parking"],
      available: true,
    },
    {
      id: 2,
      name: "Garden Terrace",
      location: "Riverside Gardens, West End",
      capacity: 200,
      pricePerHour: 250,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      amenities: ["Outdoor Space", "Garden Views", "Tent Available", "Parking"],
      available: true,
    },
    {
      id: 3,
      name: "Convention Center",
      location: "Business District, Main Street",
      capacity: 1000,
      pricePerHour: 600,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      amenities: ["WiFi", "AV Equipment", "Multiple Rooms", "Full Catering"],
      available: false,
    },
    {
      id: 4,
      name: "Skyline Rooftop",
      location: "City Center Tower, 42nd Floor",
      capacity: 150,
      pricePerHour: 400,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop",
      amenities: ["City Views", "Bar", "Outdoor Deck", "Elevator Access"],
      available: true,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Venues</h1>
          <p className="text-gray-600">Browse and book the perfect venue for your event</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {venues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <ImageWithFallback
                src={venue.image}
                alt={venue.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{venue.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {venue.location}
                    </p>
                  </div>
                  <Badge variant={venue.available ? "default" : "secondary"}>
                    {venue.available ? "Available" : "Booked"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Up to {venue.capacity} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ${venue.pricePerHour}/hour
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {venue.rating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {venue.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!venue.available}
                >
                  {venue.available ? "Book Venue" : "Not Available"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
