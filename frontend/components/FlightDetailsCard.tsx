import { CheckCircle2, Wifi, Utensils, Tv, Zap, Armchair } from "lucide-react";

interface FlightDetailsCardProps {
    flight: {
        amenities: string[];
    };
}

const amenityIcons: Record<string, React.ReactNode> = {
    "In-flight WiFi": <Wifi className="w-5 h-5" />,
    "Meals Included": <Utensils className="w-5 h-5" />,
    "Entertainment System": <Tv className="w-5 h-5" />,
    "USB Charging": <Zap className="w-5 h-5" />,
    "Extra Legroom": <Armchair className="w-5 h-5" />,
    Snacks: <Utensils className="w-5 h-5" />,
};

export default function FlightDetailsCard({ flight }: FlightDetailsCardProps) {
    const amenities = flight.amenities || [];

    return (
        <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Amenities</h3>

            {amenities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {amenities.map((amenity, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg hover:shadow-md transition"
                        >
                            <div className="text-indigo-600">
                                {amenityIcons[amenity] || <CheckCircle2 className="w-5 h-5" />}
                            </div>
                            <span className="text-gray-900 font-medium">{amenity}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No specific amenities listed for this flight.</p>
            )}
        </div>
    );
}