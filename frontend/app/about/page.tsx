'use client';

import React, { useEffect, useState } from "react";

import { Users, Zap, Globe, Heart, Award, Plane, Shield, TrendingUp, Linkedin, Twitter } from "lucide-react";

const About = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-32 mt-5">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
                    <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div
                        className="mb-6 inline-block animate-fade-in"
                        style={{
                            animation: "fadeIn 0.8s ease-in forwards",
                        }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 backdrop-blur-md border border-blue-200/50 rounded-full text-blue-700 font-medium text-sm">
                            <Plane className="w-4 h-4" />
                            Welcome to FLYEE
                        </span>
                    </div>

                    <h1
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 bg-clip-text text-transparent animate-fade-in"
                        style={{
                            animation: "fadeIn 0.8s ease-in 0.2s forwards",
                            opacity: 0,
                        }}
                    >
                        Your Journey Starts Here
                    </h1>

                    <p
                        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 animate-fade-in"
                        style={{
                            animation: "fadeIn 0.8s ease-in 0.4s forwards",
                            opacity: 0,
                        }}
                    >
                        Connecting millions of travelers worldwide with seamless, affordable,
                        and memorable flight experiences.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
                        style={{
                            animation: "fadeIn 0.8s ease-in 0.6s forwards",
                            opacity: 0,
                        }}
                    >
                        <a href="/search" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
                            Explore Flights
                        </a>
                        <a href="#features" className="px-8 py-3 bg-white/70 backdrop-blur-md border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-white hover:shadow-lg transition-all duration-300">
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div
                        className="text-center mb-12 animate-fade-in-up"
                        style={{ animation: "fadeInUp 0.8s ease-out forwards", }}
                    >
                        <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Mission</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div style={{ animation: "fadeInUp 0.8s ease-out 0.2s forwards", opacity: 0, }} className="space-y-6 animate-fade-in-up">
                            <p className="text-lg text-slate-700 leading-relaxed">At FLYEE, we believe travel should be accessible to everyone. Our mission is to revolutionize the way people book flights by combining cutting-edge technology with exceptional customer service.</p>
                            <div className="pt-4">
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">Our Core Values</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div></div><span className="text-slate-700"><strong>Transparency:</strong> Clear pricing, no hidden fees</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div></div><span className="text-slate-700"><strong>Innovation:</strong> Continuous improvement and technology excellence</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div></div><span className="text-slate-700"><strong>Trust:</strong> Protecting customer data and security</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div></div><span className="text-slate-700"><strong>Sustainability:</strong> Responsible travel for a better future</span></li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ animation: "fadeInUp 0.8s ease-out 0.4s forwards", opacity: 0, }} className="relative h-96 rounded-2xl overflow-hidden animate-fade-in-up">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20"></div>
                            <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><Globe className="w-32 h-32 text-blue-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Connecting the World</p></div></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-slate-900">Why Choose FLYEE</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[{ icon: Zap, title: "Instant Booking", description: "Book your flights in seconds with our fast and intuitive interface", }, { icon: TrendingUp, title: "Price Guarantee", description: "We match any lower price found within 24 hours of booking", }, { icon: Shield, title: "Secure Payment", description: "Enterprise-grade security for all your transactions", }, { icon: Users, title: "24/7 Support", description: "Our dedicated team is always ready to help with any questions", }, { icon: Award, title: "Best Deals", description: "Access exclusive offers and rewards for loyal customers", }, { icon: Heart, title: "Customer First", description: "Your satisfaction is our top priority, guaranteed", }, { icon: Globe, title: "Global Coverage", description: "Flights to over 300 destinations worldwide", }, { icon: Plane, title: "Flexible Changes", description: "Change or cancel your booking with ease and transparency", },].map((feature, index) => (
                            <div key={index} className="group animate-fade-in-up" style={{ animation: `fadeInUp 0.8s ease-out ${0.1 * index}s forwards`, opacity: 0, }}>
                                <div className="relative h-full p-6 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-xl hover:border-blue-300/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                                            <feature.icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Achievements</h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {[{ stat: "50M+", label: "Happy Travelers", color: "from-blue-500 to-cyan-500", }, { stat: "300+", label: "Destinations Worldwide", color: "from-cyan-500 to-blue-500", }, { stat: "15+", label: "Years in Industry", color: "from-blue-400 to-purple-500", }, { stat: "99.9%", label: "Uptime Guarantee", color: "from-purple-500 to-pink-500", },].map((item, index) => (
                            <div key={index} className="group animate-fade-in-up" style={{ animation: `fadeInUp 0.8s ease-out ${0.1 * index}s forwards`, opacity: 0, }}>
                                <div className={`relative h-40 rounded-xl overflow-hidden p-6 bg-gradient-to-br ${item.color} flex flex-col items-center justify-center text-white shadow-lg`}>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative text-center"><div className="text-5xl font-bold mb-2">{item.stat}</div><p className="text-white/90 font-medium">{item.label}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[{ title: "Travel Excellence Award", org: "World Travel Association", year: "2024", }, { title: "Best Flight Booking Platform", org: "Tech Innovation Awards", year: "2023", }, { title: "Customer Service Champion", org: "Customer Choice Awards", year: "2023", }, { title: "Sustainability Leadership", org: "Green Travel Initiative", year: "2024", }, { title: "Innovation in Technology", org: "TechCrunch Disrupt", year: "2023", }, { title: "Best Employer Award", org: "Great Places to Work", year: "2024", },].map((award, index) => (
                            <div key={index} className="group animate-fade-in-up" style={{ animation: `fadeInUp 0.8s ease-out ${0.1 * index}s forwards`, opacity: 0, }}>
                                <div className="p-6 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-xl hover:border-blue-300/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                                    <Award className="w-8 h-8 text-yellow-500 mb-3" />
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{award.title}</h3>
                                    <p className="text-slate-600 text-sm mb-2">{award.org}</p>
                                    <p className="text-blue-600 font-medium text-sm">{award.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;