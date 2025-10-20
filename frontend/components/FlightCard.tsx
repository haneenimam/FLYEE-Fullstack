'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Star,
    PlaneTakeoff,
    PlaneLanding,
    Clock,
} from 'lucide-react';

export default function FlightCard({ flight }: { flight: any }) {
    const departureCity = flight.departure?.city ?? flight.fromName ?? flight.from;
    const departureCode = flight.departure?.code ?? flight.from ?? '';
    const departureTime = flight.departure?.time ?? flight.depart ?? '';

    const arrivalCity = flight.arrival?.city ?? flight.toName ?? flight.to;
    const arrivalCode = flight.arrival?.code ?? flight.to ?? '';
    const arrivalTime = flight.arrival?.time ?? flight.arrive ?? '';

    const duration = flight.duration ?? '';
    const stops =
        typeof flight.stops === 'number' ? flight.stops : flight.stops ?? 0;
    const rating = flight.rating ?? 4.6;
    const airline = flight.airline ?? 'Flyee Airways';

    return (
        <motion.div
            whileHover={{ scale: 1.01, boxShadow: '0 12px 30px rgba(79, 70, 229, 0.1)' }}
            transition={{ duration: 0.3 }}
            className="relative w-full bg-white/70 backdrop-blur-md border border-indigo-100 rounded-3xl shadow-md hover:shadow-indigo-200 overflow-hidden flex flex-col md:flex-row justify-between items-center transition-all"
        >
            <div className="flex flex-col md:flex-row items-center w-full md:w-[75%] px-6 py-5">
                <div className="flex flex-col justify-center items-start mb-4 md:mb-0 md:w-[25%]">
                    <h3 className="font-semibold text-gray-900 text-lg">{airline}</h3>
                    <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-600 font-medium">{rating}</span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-between text-center md:px-6">
                    <div className="flex flex-col items-center">
                        <PlaneTakeoff className="w-6 h-6 text-indigo-600 mb-2" />
                        <p className="text-sm font-medium text-gray-500">{departureCity}</p>
                        <p className="text-2xl font-bold text-gray-900">{departureCode}</p>
                        <p className="text-xs text-gray-500 mt-1">{departureTime}</p>
                    </div>

                    <div className="flex flex-col items-center mx-4">
                        <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 rounded mb-1" />
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            {duration}
                        </div>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded mt-1" />
                    </div>

                    <div className="flex flex-col items-center">
                        <PlaneLanding className="w-6 h-6 text-indigo-600 mb-2" />
                        <p className="text-sm font-medium text-gray-500">{arrivalCity}</p>
                        <p className="text-2xl font-bold text-gray-900">{arrivalCode}</p>
                        <p className="text-xs text-gray-500 mt-1">{arrivalTime}</p>
                    </div>
                </div>
            </div>

            <div className="md:w-[25%] w-full border-t md:border-t-0 md:border-l border-indigo-100 bg-gradient-to-br from-indigo-50 to-white px-6 py-6 flex flex-col items-center justify-center text-center md:text-right">
                <div className="mb-3">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-3xl font-bold text-indigo-700">${flight.price}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    {stops === 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                            Nonstop
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium">
                            {stops} stop{stops > 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                <Link
                    href={`/flight/${encodeURIComponent(flight.id)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
