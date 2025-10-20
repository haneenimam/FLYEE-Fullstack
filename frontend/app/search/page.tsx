// frontend/app/search/page.tsx
'use client';

import { useEffect, useState } from 'react';
import FlightCard from '../../components/FlightCard';
import { searchFlights } from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowLeft, ArrowRight, Calendar as CalendarIcon, Globe, Plane } from 'lucide-react';
import { format } from 'date-fns';
// Assuming these UI components are correctly configured in your project
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import countries from '@/data/countries';

interface Props {
    searchParams: Record<string, string | undefined>;
}

export default function SearchPage({ searchParams }: Props) {
    const [flights, setFlights] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const flightsPerPage = 4;

    const [from, setFrom] = useState(searchParams.from ?? '');
    const [to, setTo] = useState(searchParams.to ?? '');
    const [date, setDate] = useState<Date | undefined>(
        searchParams.depart ? new Date(searchParams.depart) : undefined
    );
    const q = searchParams.q ?? '';

    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [showToSuggestions, setShowToSuggestions] = useState(false);

    const filterCountries = (input: string) =>
        countries.filter((c) => c.toLowerCase().startsWith(input.toLowerCase()));

    useEffect(() => {
        async function fetchFlights() {
            setLoading(true);
            try {
                const data = await searchFlights({
                    from,
                    to,
                    date: date ? date.toISOString().split('T')[0] : '',
                    q,
                });
                setFlights(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch flights');
            } finally {
                setLoading(false);
            }
        }
        fetchFlights();
    }, [from, to, date, q]);

    const indexOfLastFlight = page * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);
    const totalPages = Math.ceil(flights.length / flightsPerPage);

    return (
        <section className="min-h-screen pt-28 mb-10 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🌟 NEW MODERN HERO SECTION 🌟 */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center relative z-0"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100/80 backdrop-blur-sm border border-indigo-200/50 rounded-full text-indigo-700 font-medium text-sm mb-4">
                        <Plane className="w-4 h-4" />
                        Explore the World with FLYEE
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-800 to-cyan-600 bg-clip-text text-transparent">
                        Find Your Perfect Flight
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Search millions of routes, compare prices, and book your journey seamlessly.
                    </p>
                </motion.div>
                
                {/* 🔍 SEARCH FORM (Redesigned Container) 🔍 */}
                <motion.form
                    action="/search"
                    method="get"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-indigo-200/50 rounded-3xl border border-indigo-100 p-8 mb-16 grid grid-cols-1 lg:grid-cols-4 gap-4 relative z-10"
                >
                    {/* FROM Input */}
                    <div className="relative flex items-center flex-col w-full">
                        <div className="relative w-full">
                            <Globe className="absolute left-3 top-3 text-indigo-500 w-5 h-5" />
                            <input
                                name="from"
                                value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    setShowFromSuggestions(true);
                                }}
                                onFocus={() => setShowFromSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                                placeholder="Departure City/Airport"
                                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition bg-white/70 font-medium text-gray-800"
                            />
                            {showFromSuggestions && from && (
                                <ul className="absolute top-full mt-1 left-0 w-full bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 max-h-48 overflow-y-auto z-50">
                                    {filterCountries(from).map((country) => (
                                        <li
                                            key={country}
                                            onMouseDown={() => {
                                                setFrom(country);
                                                setShowFromSuggestions(false);
                                            }}
                                            className="px-3 py-2 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 text-sm"
                                        >
                                            <MapPin className="w-4 h-4 text-indigo-500" />
                                            {country}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* TO Input */}
                    <div className="relative flex items-center flex-col w-full">
                        <div className="relative w-full">
                            <MapPin className="absolute left-3 top-3 text-indigo-500 w-5 h-5" />
                            <input
                                name="to"
                                value={to}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                    setShowToSuggestions(true);
                                }}
                                onFocus={() => setShowToSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                                placeholder="Arrival City/Airport"
                                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition bg-white/70 font-medium text-gray-800"
                            />
                            {showToSuggestions && to && (
                                <ul className="absolute top-full mt-1 left-0 w-full bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 max-h-48 overflow-y-auto z-50">
                                    {filterCountries(to).map((country) => (
                                        <li
                                            key={country}
                                            onMouseDown={() => {
                                                setTo(country);
                                                setShowToSuggestions(false);
                                            }}
                                            className="px-3 py-2 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 text-sm"
                                        >
                                            <MapPin className="w-4 h-4 text-indigo-500" />
                                            {country}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* DATE Picker (FIXED) */}
                    <div className="relative flex items-center">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`w-full justify-start pl-10 pr-3 py-6 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none transition bg-white/70 hover:bg-white text-left font-medium ${!date ? 'text-gray-500' : 'text-gray-800' // Improved placeholder color
                                        }`}
                                >
                                    <CalendarIcon className="absolute left-3 text-indigo-500 w-5 h-5" />
                                    {date ? format(date, 'PPP') : <span>Select Departure Date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-xl mt-2">
                                <Calendar 
                                    mode="single" 
                                    selected={date} 
                                    onSelect={setDate} 
                                    initialFocus 
                                />
                            </PopoverContent>
                        </Popover>
                        {/* Hidden input moved out of Popover's children but still in the form */}
                        {date && <input type="hidden" name="depart" value={format(date, 'yyyy-MM-dd')} />}
                    </div>

                    {/* SUBMIT Button */}
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold transition transform hover:scale-[1.01] shadow-lg"
                    >
                        <Search className="w-5 h-5" />
                        Search Flights
                    </button>
                </motion.form>

                {/* --- */}

                {/* Search Results and Pagination (Unchanged Logic) */}
                
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-600 text-center mb-6 font-medium p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        {error}
                    </motion.div>
                )}

                {loading ? (
                    <div className="text-center text-gray-500 animate-pulse py-12">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4 animate-spin"></div>
                        Searching for the best routes...
                    </div>
                ) : flights.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 text-center text-lg py-12"
                    >
                        No flights found for the selected criteria. Try adjusting your dates or destinations.
                    </motion.div>
                ) : (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={page}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                {currentFlights.map((f: any) => (
                                    <motion.div
                                        key={f.id}
                                        className="w-full"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <FlightCard flight={f} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-center items-center gap-4 mt-8"
                            >
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <ArrowLeft className="w-4 h-4" /> Prev
                                </button>

                                <span className="text-indigo-800 font-bold px-3 py-1 bg-indigo-100 rounded-full">
                                    {page} / {totalPages}
                                </span>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    Next <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}