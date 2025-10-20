'use client';
import Link from 'next/link';
import { PlaneTakeoff, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const isLandingPage = pathname === '/';

    useEffect(() => {
        if (!isLandingPage) return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLandingPage]);

    const isTransparent = isLandingPage && !isScrolled;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isTransparent
                    ? 'bg-transparent'
                    : 'backdrop-blur-xl bg-white/30 border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.1)] bg-white'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <PlaneTakeoff
                            className={`w-7 h-7 mr-2 transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-indigo-600'
                                }`}
                        />
                        <Link
                            href="/"
                            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white hover:text-indigo-300' : 'text-gray-800'
                                }`}
                        >
                            FLYEE
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        {['search','about'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item}`}
                                className={`text-sm font-medium transition-colors duration-300 ${isTransparent
                                        ? 'text-white hover:text-indigo-300'
                                        : 'text-gray-700 hover:text-indigo-600'
                                    }`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Link>
                        ))}
                    </nav>

                    <button
                        className={`md:hidden p-2 transition-colors duration-300 ${isTransparent
                                ? 'text-white hover:text-indigo-300'
                                : 'text-gray-700 hover:text-indigo-600'
                            }`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {menuOpen && (
                    <div
                        className={`md:hidden border-t border-white/10 pb-3 animate-fadeIn rounded-lg mt-2 ${isTransparent
                                ? 'bg-black/70 backdrop-blur-md'
                                : 'bg-white/90 backdrop-blur-md'
                            }`}
                    >
                        <nav className="flex flex-col space-y-3 mt-3 text-center">
                            {['search','about'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item}`}
                                    className={`text-sm transition-colors ${isTransparent
                                            ? 'text-white hover:text-indigo-300'
                                            : 'text-gray-700 hover:text-indigo-600'
                                        }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
