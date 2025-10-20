import { Plane, Clock, Users } from "lucide-react";

interface FlightOverviewProps {
    flight: {
        airline: string;
        flightNumber: string;
        depart: string;
        arrive: string;
        duration: string;
        fromName: string;
        from: string;
        toName: string;
        to: string;
        date: string;
        aircraft: string;
        stops: number;
        seatsRemaining: number;
    };
}

function formatDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    } catch {
        return dateString;
    }
}

export default function FlightOverview({ flight }: FlightOverviewProps) {
    return (
        <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 md:p-8 shadow-lg">
            {/* Airline Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Plane className="w-6 h-6 text-indigo-600" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {flight.airline}
                        </h2>
                        <p className="text-lg font-semibold text-indigo-600">
                            Flight {flight.flightNumber}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Departure
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                            {flight.depart}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                            {flight.fromName} • {flight.from}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatDate(flight.date)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-0.5 w-8 bg-gray-300"></div>
                            <Plane className="w-5 h-5 text-indigo-600 transform rotate-90" />
                            <div className="h-0.5 w-8 bg-gray-300"></div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-900">
                                {flight.duration}
                            </p>
                            <p className="text-xs text-gray-500">
                                {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop(s)`}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Arrival
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                            {flight.arrive}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                            {flight.toName} • {flight.to}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <p className="text-xs font-semibold text-gray-600">Duration</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{flight.duration}</p>
                </div>

                <div className="bg-gray-50/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Plane className="w-4 h-4 text-gray-600" />
                        <p className="text-xs font-semibold text-gray-600">Aircraft</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{flight.aircraft}</p>
                </div>

                <div className="bg-gray-50/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Plane className="w-4 h-4 text-gray-600" />
                        <p className="text-xs font-semibold text-gray-600">Stops</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                        {flight.stops === 0 ? "Nonstop" : flight.stops}
                    </p>
                </div>

                <div className="bg-gray-50/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <p className="text-xs font-semibold text-gray-600">Seats</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                        {flight.seatsRemaining} available
                    </p>
                </div>
            </div>
        </div>
    );
}