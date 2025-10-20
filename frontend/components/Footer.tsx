'use client';

import React from "react";
import { PlaneTakeoff, Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 text-white pt-16 pb-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/patterns/gradient-noise.png')] opacity-10 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                        <PlaneTakeoff className="w-6 h-6 text-white drop-shadow-md" />
                        <span className="text-2xl font-bold tracking-tight">FLYEE</span>
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed">
                        Simplifying travel with a modern, elegant booking experience —
                        fast, secure, and built for explorers.
                    </p>
                </div>

                <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold mb-3">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a
                                href="/search"
                                className="hover:text-white hover:underline transition-all"
                            >
                                Flights
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline transition-all">
                                Destinations
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline transition-all">
                                Special Offers
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-white hover:underline transition-all">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline transition-all">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white hover:underline transition-all">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold mb-3">Connect</h3>
                    <div className="flex justify-center sm:justify-start gap-4 mb-4">
                        <a
                            href="#"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="text-sm text-blue-100">
                        hello@flyee.io
                    </p>
                </div>
            </div>

            <div className="relative border-t border-white/20 mt-10 pt-6 text-center text-sm text-blue-100">
                © {new Date().getFullYear()} <span className="font-semibold">FLYEE</span> — Built using Next.js & Node.js.
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-gradient-to-t from-indigo-300/20 to-transparent blur-3xl pointer-events-none"></div>
        </footer>
    );
}
