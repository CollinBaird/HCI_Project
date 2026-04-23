import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { MapPin, Users, DollarSign, Star, Search, ArrowLeft } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar } from "../components/ui/calendar";
import { TimePicker15 } from "../components/TimePicker15";
import { addStoredEvent, addBookingConversation, updateCombinedPlanDraft } from "../eventStore";

export function Venues() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formSectionRef = React.useRef<HTMLDivElement | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [eventTime, setEventTime] = useState("");
  const [partySize, setPartySize] = useState("");
  const [location, setLocation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [budgetFilter, setBudgetFilter] = useState<string>("");
  const selectOnly = searchParams.get("selectOnly") === "1";
  const returnTo = searchParams.get("returnTo") || "/plan-event/combined";

  const venues = [
    {
      id: 1,
      name: "DeBaby on the Beta Flawn",
      location: "Beta Flawn, Main Campus",
      capacity: 500,
      pricePerHour: 350,
      priceTier: "$$$",
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
      priceTier: "$$",
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
      priceTier: "$$$$",
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
      priceTier: "$$$",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop",
      amenities: ["City Views", "Bar", "Outdoor Deck", "Elevator Access"],
      available: true,
    },
  ];

  const selectedVenue = venues.find((venue) => venue.id === selectedVenueId);

  const filteredVenues = venues.filter((venue) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      venue.name.toLowerCase().startsWith(query) ||
      venue.location.toLowerCase().startsWith(query) ||
      venue.amenities.some(amenity => amenity.toLowerCase().startsWith(query));

    const matchesBudget = !budgetFilter || venue.priceTier === budgetFilter;

    return matchesSearch && matchesBudget;
  });

  const handleSelectVenue = (venueId: number) => {
    const venue = venues.find((item) => item.id === venueId);
    if (!venue) {
      return;
    }

    if (selectOnly) {
      updateCombinedPlanDraft({
        venueName: venue.name,
        venueLocation: venue.location,
      });
      navigate(returnTo);
      return;
    }

    if (selectedVenueId === venueId) {
      setSelectedVenueId(null);
      return;
    }

    setLocation(venue.location);
    setSelectedVenueId(venueId);
    window.setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleConfirm = () => {
    if (!selectedVenue || !selectedDate || !eventTime || !partySize || !location || !organizationName) {
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];

    const bookingId = addStoredEvent({
      title: `${organizationName} Venue Booking`,
      date: dateStr,
      time: eventTime,
      venue: selectedVenue.name,
      status: "confirmed",
      type: "venue",
      partySize: Number(partySize),
      organizationName,
    });

    addBookingConversation({
      bookingId,
      vendorName: selectedVenue.name,
      organizationName,
      date: dateStr,
      time: eventTime,
      partySize: Number(partySize),
      type: "venue",
    });

    navigate("/calendar");
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Venues</h1>
            <p className="text-gray-600">Browse and book the perfect venue for your event</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Budgets</option>
                <option value="$">$</option>
                <option value="$$">$$</option>
                <option value="$$$">$$$</option>
                <option value="$$$$">$$$$</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVenues.map((venue) => (
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
                    ${venue.pricePerHour}/hour ({venue.priceTier})
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
                  onClick={() => handleSelectVenue(venue.id)}
                  className={`w-full px-4 py-2 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed ${
                    selectedVenueId === venue.id
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  disabled={!venue.available}
                >
                  {venue.available
                    ? selectOnly
                      ? "Select Venue"
                      : selectedVenueId === venue.id
                        ? "Change"
                        : "Select Venue"
                    : "Not Available"}
                </button>
              </div>
            </Card>
          ))}
        </div>
        {!selectOnly && selectedVenue && (
          <div ref={formSectionRef}>
            <Card className="mt-8 p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Venue Booking Form</h2>
              <p className="text-gray-600 mb-6">
                Selected Venue: <span className="font-semibold">{selectedVenue.name}</span>
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Select Date</p>
                  <div className="border border-gray-200 rounded-lg inline-block">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="venue-event-time">
                      Time of Day
                    </label>
                    {/* Time increments are 15 minutes in order to simplify booking process */}
                    <TimePicker15 value={eventTime} onChange={setEventTime} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="venue-party-size">
                      Party Size
                    </label>
                    <input
                      id="venue-party-size"
                      type="number"
                      min="1"
                      value={partySize}
                      onChange={(event) => setPartySize(event.target.value)}
                      placeholder="Enter number of guests"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="venue-location">
                      Location
                    </label>
                    <input
                      id="venue-location"
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="Enter event location"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="venue-organization-name">
                      Organization Name
                    </label>
                    <input
                      id="venue-organization-name"
                      type="text"
                      value={organizationName}
                      onChange={(event) => setOrganizationName(event.target.value)}
                      placeholder="Enter organization name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedDate || !eventTime || !partySize || !location || !organizationName}
                className="mt-8 w-full px-6 py-4 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
