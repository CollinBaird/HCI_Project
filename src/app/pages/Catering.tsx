import { Utensils, Users, DollarSign, ChefHat } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Catering() {
  const cateringOptions = [
    {
      id: 1,
      name: "Gourmet Delights Catering",
      cuisine: "International",
      rating: 4.9,
      minGuests: 50,
      pricePerPerson: 45,
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
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
      specialties: ["Tapas Style", "Family Platters", "Healthy Options"],
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catering Services</h1>
          <p className="text-gray-600">Choose from our premium catering partners for your event</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cateringOptions.map((caterer) => (
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
                    ${caterer.pricePerPerson}/person
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

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Request Quote
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
