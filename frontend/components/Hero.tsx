'use client';

import { useState } from 'react';
import { Plane, Calendar, Users, MapPin, ArrowLeftRight, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Calendar as ShadCalendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import countries from '@/data/countries';

export default function Hero() {
    const router = useRouter();

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [depart, setDepart] = useState<Date | undefined>(undefined);
    const [ret, setRet] = useState<Date | undefined>(undefined);
    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [showToSuggestions, setShowToSuggestions] = useState(false);

    const [travelers, setTravelers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const totalTravelers =
        travelers.adults + travelers.children + travelers.infants;

    const handleTravelerChange = (type: keyof typeof travelers, delta: number) => {
        setTravelers((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta),
        }));
    };

    const handleSwap = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSearch = () => {
        const params = new URLSearchParams({
            from,
            to,
            depart: depart ? format(depart, 'yyyy-MM-dd') : '',
            return: ret ? format(ret, 'yyyy-MM-dd') : '',
            travelers: totalTravelers.toString(),
        });
        router.push(`/search?${params.toString()}`);
    };

    const filterCountries = (input: string) =>
        countries.filter((c) => c.toLowerCase().startsWith(input.toLowerCase()));

    return (
        <section className="relative flex items-center justify-center overflow-visible min-h-[95vh] z-[60]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://plus.unsplash.com/premium_photo-1661952798931-14d398307ee2?auto=format&fit=crop&q=80&w=1600')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-blue-800/40 to-indigo-900/85" />

            <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 -mt-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                    <Plane className="w-4 h-4" />
                    <span className="text-sm">Welcome to Flyee</span>
                </div>
                <h1 className="text-5xl font-bold mb-3 leading-tight">
                    <span className="bg-gradient-to-r from-blue-300 via-white to-indigo-200 bg-clip-text text-transparent">
                        Discover the World with Flyee
                    </span>
                </h1>
                <p className="text-blue-100 mb-8">
                    Smart, fast, and effortless flight booking
                </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full z-50">
                <div className="w-full bg-white/10 backdrop-blur-md border-t border-white/20 shadow-xl hover:shadow-2xl transition p-4 md:p-6 flex flex-col md:flex-row items-center gap-3 md:gap-2 relative z-50">
                    <div className="flex flex-col w-full relative">
                        <label className="text-sm font-semibold text-gray-200 mb-1">From</label>
                        <div className="flex items-center bg-white/15 rounded-lg p-3 relative">
                            <MapPin className="w-5 h-5 text-blue-300 mr-2" />
                            <Input
                                value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    setShowFromSuggestions(true);
                                }}
                                onFocus={() => setShowFromSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                                placeholder="City or Airport"
                                className="bg-transparent text-white placeholder:text-white/90 border-none focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:border-transparent shadow-none"
                            />
                            {showFromSuggestions && from && (
                                <ul className="absolute top-full mt-1 left-0 w-full bg-white/95 text-gray-800 rounded-lg shadow-lg max-h-48 overflow-y-auto z-[70]">
                                    {filterCountries(from).map((country) => (
                                        <li
                                            key={country}
                                            onMouseDown={() => {
                                                setFrom(country);
                                                setShowFromSuggestions(false);
                                            }}
                                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                        >
                                            {country}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleSwap}
                        className="self-center p-3 mt-6 bg-white/20 hover:bg-white/30 transition rounded-full border border-white/30"
                        title="Swap"
                    >
                        <ArrowLeftRight className="w-5 h-5 text-white" />
                    </button>
                    <div className="flex flex-col w-full relative">
                        <label className="text-sm font-semibold text-gray-200 mb-1">To</label>
                        <div className="flex items-center bg-white/15 rounded-lg p-3 relative">
                            <MapPin className="w-5 h-5 text-pink-300 mr-2" />
                            <Input
                                value={to}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                    setShowToSuggestions(true);
                                }}
                                onFocus={() => setShowToSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                                placeholder="Destination"
                                className="bg-transparent text-white placeholder:text-white/90 border-none focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:border-transparent shadow-none"
                            />
                            {showToSuggestions && to && (
                                <ul className="absolute top-full mt-1 left-0 w-full bg-white/95 text-gray-800 rounded-lg shadow-lg max-h-48 overflow-y-auto z-[70]">
                                    {filterCountries(to).map((country) => (
                                        <li
                                            key={country}
                                            onMouseDown={() => {
                                                setTo(country);
                                                setShowToSuggestions(false);
                                            }}
                                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                        >
                                            {country}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col w-full relative z-[80]">
                        <label className="text-sm font-semibold text-gray-200 mb-1">Depart</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center bg-white/15 rounded-lg p-4 cursor-pointer">
                                    <Calendar className="w-5 h-5 text-blue-300 mr-2" />
                                    <span className="text-white">
                                        {depart ? format(depart, 'yyyy-MM-dd') : 'Select date'}
                                    </span>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-[80]">
                                <ShadCalendar mode="single" selected={depart} onSelect={setDepart} />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-col w-full relative z-[80]">
                        <label className="text-sm font-semibold text-gray-200 mb-1">Return</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center bg-white/15 rounded-lg p-4 cursor-pointer">
                                    <Calendar className="w-5 h-5 text-indigo-300 mr-2" />
                                    <span className="text-white">
                                        {ret ? format(ret, 'yyyy-MM-dd') : 'Select date'}
                                    </span>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-[80]">
                                <ShadCalendar
                                    mode="single"
                                    selected={ret}
                                    onSelect={(date) => {
                                        if (!depart || date >= depart) setRet(date);
                                        else toast('Return date must be after depart date');
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-col w-full relative z-[80]">
                        <label className="text-sm font-semibold text-gray-200 mb-1">Travelers</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center bg-white/15 rounded-lg p-4 cursor-pointer justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-300" />
                                        <span className="text-white">
                                            {totalTravelers > 0
                                                ? `${totalTravelers} Traveler${totalTravelers > 1 ? 's' : ''}`
                                                : 'Select Travelers'}
                                        </span>
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 bg-white/90 backdrop-blur-md rounded-xl p-4 space-y-4 z-[80]">
                                {[
                                    { type: 'adults', label: 'Adults', subtitle: '12+ yrs' },
                                    { type: 'children', label: 'Children', subtitle: '2–12 yrs' },
                                    { type: 'infants', label: 'Infants', subtitle: 'Under 2 yrs' },
                                ].map(({ type, label, subtitle }) => (
                                    <div key={type} className="flex items-center justify-between text-gray-800">
                                        <div>
                                            <p className="font-medium">{label}</p>
                                            <p className="text-xs text-gray-500">{subtitle}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                className="p-1 border border-gray-300 text-gray-700 rounded-full"
                                                onClick={() => handleTravelerChange(type as keyof typeof travelers, -1)}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="w-5 text-center font-semibold">
                                                {travelers[type as keyof typeof travelers]}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                className="p-1 border border-gray-300 text-gray-700 rounded-full"
                                                onClick={() => handleTravelerChange(type as keyof typeof travelers, 1)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button
                        onClick={handleSearch}
                        className="w-full md:w-auto px-8 py-6 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
                    >
                        SEARCH
                    </Button>
                </div>
            </div>
        </section>
    );
}
