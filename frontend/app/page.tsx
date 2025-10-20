'use client';

import { useState, useEffect } from 'react';
import {
  CheckCircle,
  BadgeDollarSign,
  Headphones,
  Plane,
} from 'lucide-react';
import Link from 'next/link';
import { searchFlights } from '../lib/api';
import FlightCard from '../components/FeaturedFlights';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';


type View = 'form' | 'list' | 'success';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('form');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [featured, setFeatured] = useState<any[]>([]);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const handleBookingCreated = (booking: any) => {
    setCurrentView('success');
    setRefreshTrigger((prev) => prev + 1);
    setShowBookingModal(false);
    setShowBookingSuccess(true);
  };

  const handleCreateAnother = () => {
    setCurrentView('form');
    setShowBookingSuccess(false);
  };



  const features = [
    {
      icon: BadgeDollarSign,
      title: 'Best Price Guarantee',
      desc: 'We compare top airlines and find you the best fares — guaranteed.',
      color: 'from-blue-100 to-indigo-100',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      desc: 'Our travel experts are here to assist you anytime, anywhere.',
      color: 'from-indigo-100 to-blue-100',
    },
    {
      icon: Plane,
      title: 'Easy Booking',
      desc: 'Seamless booking in just a few clicks — intuitive and fast.',
      color: 'from-blue-100 to-indigo-100',
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const results = await searchFlights({ limit: '4' });
        setFeatured(Array.isArray(results) ? results.slice(0, 4) : []);
      } catch (err) {
        console.warn('Failed to load featured flights', err);
        setFeatured([]);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Hero />
      <main className="flex-1 w-full">

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 text-center sm:text-left">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Featured Flights
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Explore handpicked routes with top-rated airlines and great prices.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-4 sm:mt-0 transition-colors"
            >
              View All Flights
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.length === 0 ? (
              <div className="col-span-full text-gray-500 text-center py-10">
                No featured flights available right now.
              </div>
            ) : (
              featured.map((f) => <FlightCard key={f.id} flight={f} />)
            )}
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/50 to-white" />
        </section>


        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white -z-10" />
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          >
            Why Travelers Trust <span className="text-indigo-600">FLYEE</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc, color }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 30px rgba(59,130,246,0.15)',
                  rotateX: 1,
                  rotateY: -1,
                }}
                viewport={{ once: true }}
                className={`group p-10 rounded-3xl bg-gradient-to-br ${color} text-center shadow-md transition-transform duration-300 ease-out cursor-default`}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-white/70 rounded-2xl shadow-inner">
                    <Icon className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      <section className="relative w-full py-20 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-50"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center rounded-3xl shadow-lg bg-white/80 backdrop-blur-sm border border-indigo-100 py-16">
          <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5">
            Ready to Book Your Next Flight?
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Start your journey with <span className="font-semibold text-indigo-600">FLYEE</span> today.
            Discover the best flight deals and book with total confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all"
            >
              Search Flights
            </Link>
          </div>
        </div>
      </section>


      {showBookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Booking created</h3>
            <p className="text-gray-600 mt-2">
              Your booking was created successfully.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => setShowBookingSuccess(false)}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
