import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Utensils, Users, DollarSign, ChefHat, Search, ArrowLeft } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import { TimePicker15 } from "../components/TimePicker15";
import { addStoredEvent, addBookingConversation, updateCombinedPlanDraft } from "../eventStore";

  // Why we built this page: Streamline caterer selection and booking details in one guided process.

export function Catering() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formSectionRef = React.useRef<HTMLDivElement | null>(null);
  const [selectedCatererId, setSelectedCatererId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [eventTime, setEventTime] = useState("");
  const [partySize, setPartySize] = useState("");
  const [location, setLocation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [budgetFilter, setBudgetFilter] = useState<string>("");

  const cateringOptions = [
    {
      id: 1,
      name: "Gourmet Delights Catering",
      cuisine: "International",
      rating: 4.9,
      minGuests: 50,
      pricePerPerson: 45,
      priceTier: "$$",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop",
      specialties: ["Corporate Events", "Weddings", "Buffet Style"],
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Halal"],
    },
    {
      id: 2,
      name: "Elegant Eats",
      cuisine: "Fine Dining",
      rating: 4.8,
      minGuests: 30,
      pricePerPerson: 65,
      priceTier: "$$$",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      specialties: ["Plated Dinners", "Wine Pairing", "Custom Menus"],
      dietaryOptions: ["Vegetarian", "Pescatarian", "Keto"],
    },
    {
      id: 3,
      name: "BBQ Masters",
      cuisine: "American BBQ",
      rating: 4.7,
      minGuests: 25,
      pricePerPerson: 35,
      priceTier: "$",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      specialties: ["Outdoor Events", "Casual Gatherings", "Live Cooking"],
      dietaryOptions: ["Vegetarian", "Gluten-Free"],
    },
    {
      id: 4,
      name: "Mediterranean Feast",
      cuisine: "Mediterranean",
      rating: 4.8,
      minGuests: 40,
      pricePerPerson: 50,
      priceTier: "$$",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
      specialties: ["Tapas Style", "Family Platters", "Healthy Options"],
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    },
  ];

  const selectedCaterer = cateringOptions.find((caterer) => caterer.id === selectedCatererId);
  const selectOnly = searchParams.get("selectOnly") === "1";
  const returnTo = searchParams.get("returnTo") || "/plan-event/combined";

  const filteredCateringOptions = cateringOptions.filter((caterer) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      caterer.name.toLowerCase().startsWith(query) ||
      caterer.cuisine.toLowerCase().startsWith(query) ||
      caterer.specialties.some(specialty => specialty.toLowerCase().startsWith(query));

    const matchesBudget = !budgetFilter || caterer.priceTier === budgetFilter;

    return matchesSearch && matchesBudget;
  });

  const handleSelectCaterer = (catererId: number) => {
    const caterer = cateringOptions.find((item) => item.id === catererId);
    if (!caterer) {
      return;
    }

    if (selectOnly) {
      updateCombinedPlanDraft({ catererName: caterer.name });
      navigate(returnTo);
      return;
    }

    if (selectedCatererId === catererId) {
      setSelectedCatererId(null);
      return;
    }

    setSelectedCatererId(catererId);
    window.setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleConfirm = () => {
    if (!selectedCaterer || !selectedDate || !eventTime || !partySize || !location || !organizationName) {
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];

    const bookingId = addStoredEvent({
      title: `${organizationName} Catering`,
      date: dateStr,
      time: eventTime,
      venue: location,
      status: "confirmed",
      type: "catering",
      partySize: Number(partySize),
      organizationName,
      catererName: selectedCaterer.name,
    });

    addBookingConversation({
      bookingId,
      vendorName: selectedCaterer.name,
      organizationName,
      date: dateStr,
      time: eventTime,
      partySize: Number(partySize),
      type: "catering",
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Catering Services</h1>
            <p className="text-gray-600">Choose from our premium catering partners for your event</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or cuisine..."
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
          {filteredCateringOptions.map((caterer) => (
            <Card key={caterer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={caterer.image}
                alt={caterer.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{caterer.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      {caterer.cuisine} Cuisine
                    </p>
                  </div>
                  <Badge variant="default">{caterer.rating} ★</Badge>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Min. {caterer.minGuests} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ${caterer.pricePerPerson}/person ({caterer.priceTier})
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {caterer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Dietary Options:</p>
                  <div className="flex flex-wrap gap-2">
                    {caterer.dietaryOptions.map((option) => (
                      <Badge key={option} variant="secondary">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectCaterer(caterer.id)}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    selectedCatererId === caterer.id
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {selectOnly ? "Select Catering" : selectedCatererId === caterer.id ? "Change" : "Select Catering"}
                </button>
              </div>
            </Card>
          ))}
        </div>

        {selectedCaterer && (
          <div ref={formSectionRef}>
            <Card className="mt-8 p-6 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Catering Request Form</h2>
            <p className="text-gray-600 mb-6">
              Selected Caterer: <span className="font-semibold">{selectedCaterer.name}</span>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="event-time">
                    Time of Day
                  </label>
                  {/* Time increments are 15 minutes in order to simplify booking process */}
                  <TimePicker15 value={eventTime} onChange={setEventTime} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="party-size">
                    Party Size
                  </label>
                  <input
                    id="party-size"
                    type="number"
                    min="1"
                    value={partySize}
                    onChange={(event) => setPartySize(event.target.value)}
                    placeholder="Enter number of guests"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Enter event location"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="organization-name">
                    Organization Name
                  </label>
                  <input
                    id="organization-name"
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
