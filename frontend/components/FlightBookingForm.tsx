'use client';

import { useState } from "react";
import { CreditCard, Lock, AlertCircle } from "lucide-react";
import { useRouter } from 'next/navigation';
import BookingConfirmationDialog from "./BookingConfirmationDialog";

interface FlightBookingFormProps {
    flight: {
        price: number;
        seatsRemaining: number;
    };
}

export default function FlightBookingForm({ flight }: FlightBookingFormProps) {
    const router = useRouter();
    const availableSeats = flight.seatsRemaining;

    const [passengers, setPassengers] = useState(1);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    const totalPrice = flight.price * passengers;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed || loading || passengers > availableSeats || !email || !phone) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsBookingConfirmed(true);
        }, 1500);
    };

    const handleDoneAction = () => {
        setIsBookingConfirmed(false);
        router.push('/');
    }

    return (
        <>
            <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 md:p-8 shadow-lg sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Flight</h3>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 mb-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Price per passenger</span>
                            <span className="font-semibold text-gray-900">${flight.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Passengers</span>
                            <span className="font-semibold text-gray-900">{passengers}</span>
                        </div>
                        <div className="border-t border-indigo-200 pt-2 mt-2 flex justify-between">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-indigo-600">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Number of Passengers
                        </label>
                        <select
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            {Array.from({ length: Math.min(availableSeats, 6) || 1 }).map(
                                (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {i === 0 ? "Passenger" : "Passengers"}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {passengers > availableSeats && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                            <p className="text-sm text-yellow-700">
                                Only {availableSeats} seats available
                            </p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            disabled={loading}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            disabled={loading}
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            disabled={loading}
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                            I agree to the{" "}
                            <a href="#" className="text-indigo-600 hover:underline font-medium">
                                terms & conditions
                            </a>
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={!agreed || loading || passengers > availableSeats || !email || !phone}
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                    >
                        <CreditCard className="w-5 h-5" />
                        {loading ? "Processing..." : "Complete Booking"}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                        <Lock className="w-4 h-4" />
                        <span>Secure payment powered by industry-leading encryption</span>
                    </div>
                </form>
            </div>

            <BookingConfirmationDialog
                isOpen={isBookingConfirmed}
                onClose={() => setIsBookingConfirmed(false)}
                onDone={handleDoneAction}
                totalPrice={totalPrice}
                passengers={passengers}
                email={email}
            />
        </>
    );
}