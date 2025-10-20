import Link from "next/link";
import { ArrowRight, Star, PlaneTakeoff, PlaneLanding } from "lucide-react";

export default function FlightCard({ flight }: { flight: any }) {
    const departureCity = flight.departure?.city ?? flight.fromName ?? flight.from;
    const departureCode = flight.departure?.code ?? flight.from ?? "";
    const departureTime = flight.departure?.time ?? flight.depart ?? "";

    const arrivalCity = flight.arrival?.city ?? flight.toName ?? flight.to;
    const arrivalCode = flight.arrival?.code ?? flight.to ?? "";
    const arrivalTime = flight.arrival?.time ?? flight.arrive ?? "";

    const duration = flight.duration ?? "";
    const stops =
        typeof flight.stops === "number" ? flight.stops : flight.stops ?? 0;
    const rating = flight.rating ?? 4.6;

    return (
        <div className="group relative h-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                    {flight.airline ?? "Flyee Airways"}
                </h3>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-gray-700">{rating}</span>
                </div>
            </div>

            <div className="flex-1 px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-center flex-1">
                        <PlaneTakeoff className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            {departureCity}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">{departureCode}</p>
                        <p className="text-xs text-gray-500 mt-1">{departureTime}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-2 px-4">
                        <div className="w-14 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded" />
                        <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                            {duration}
                        </span>
                        <div className="w-14 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 rounded" />
                    </div>

                    <div className="text-center flex-1">
                        <PlaneLanding className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-500 mb-1">
                            {arrivalCity}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">{arrivalCode}</p>
                        <p className="text-xs text-gray-500 mt-1">{arrivalTime}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                    {stops === 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                            ✓ Nonstop
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium">
                            {stops} stop{stops > 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500 mb-1">From</p>
                    <p className="text-2xl font-bold text-gray-900">${flight.price}</p>
                </div>

                <Link
                    href={`/flight/${encodeURIComponent(flight.id)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
