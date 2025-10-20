'use client';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { getFlight } from '../../../lib/api';
import FlightBookingForm from '../../../components/FlightBookingForm';
import FlightOverview from '../../../components/FlightOverview';
import FlightDetailsCard from '../../../components/FlightDetailsCard';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    params: { id: string };
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function FlightDetail({ params }: Props) {
    const [flight, setFlight] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                setLoading(true);
                const data = await getFlight(params.id);
                if (!data) {
                    throw new Error("Flight not found");
                }
                setFlight(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load flight');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchFlight();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-center h-96">
                        <div className="animate-spin">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !flight) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                            <p className="text-red-700 font-medium">{error || "Flight not found"}</p>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/search"
                                className="text-indigo-600 hover:text-indigo-700 font-semibold"
                            >
                                ← Back to Search
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className="mb-8">
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition"
                    >
                        <span>←</span>
                        <span>Back to Search</span>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 space-y-6"
                    >
                        <FlightOverview flight={flight} />
                        <FlightDetailsCard flight={flight} />
                    </motion.div>

                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <FlightBookingForm flight={flight} />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}