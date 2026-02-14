
"use client";
import { useState } from "react";
import { UserCheck, Search, CreditCard, Building2, Upload, CalendarCheck, FileBarChart, ArrowRight } from "lucide-react";

const endUserSteps = [
    { icon: UserCheck, title: "Register & Verify", desc: "Create your account and complete identity verification with our secure KYC process.", color: "bg-blue-500/10 text-blue-500" },
    { icon: Search, title: "Browse Vehicles", desc: "Search available vehicles from verified rental companies, filter by location, type, and price.", color: "bg-green-500/10 text-green-500" },
    { icon: CreditCard, title: "Book, Pay & Sign", desc: "Book your vehicle, pay securely, and sign a digital contract — all in minutes.", color: "bg-purple-500/10 text-purple-500" },
];

const businessSteps = [
    { icon: Building2, title: "Create Company", desc: "Register your rental business, set up branches, and configure your team roles.", color: "bg-orange-500/10 text-orange-500" },
    { icon: Upload, title: "Upload Vehicles", desc: "Add your fleet with photos, pricing, availability, and insurance details.", color: "bg-cyan-500/10 text-cyan-500" },
    { icon: CalendarCheck, title: "Accept Bookings", desc: "Receive and manage bookings with automated availability and conflict resolution.", color: "bg-pink-500/10 text-pink-500" },
    { icon: FileBarChart, title: "Auto Reports", desc: "Get automated contracts, payment processing, and financial reports.", color: "bg-indigo-500/10 text-indigo-500" },
];

const HowItWorksSection = () => {
    const [tab, setTab] = useState<"users" | "business">("users");
    const steps = tab === "users" ? endUserSteps : businessSteps;

    return (
        <section id="how-it-works" className="py-24 bg-gradient-dark">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center">
                    <h2 className="font-heading text-3xl font-bold text-foreground text-brand md:text-4xl">How It Works</h2>
                    <p className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">
                        Whether you're renting a vehicle or running a fleet, getting started takes minutes.
                    </p>
                </div>

                <div className="mt-10 flex justify-center gap-2">
                    <button
                        onClick={() => setTab("users")}
                        className={`rounded-lg px-6 py-3 font-heading text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            tab === "users" 
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105" 
                                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                        }`}
                    >
                        <UserCheck size={16} />
                        For End Users
                    </button>
                    <button
                        onClick={() => setTab("business")}
                        className={`rounded-lg px-6 py-3 font-heading text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            tab === "business" 
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105" 
                                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                        }`}
                    >
                        <Building2 size={16} />
                        For Businesses
                    </button>
                </div>

                <div className="mt-12">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
                        {steps.map((step, i) => (
                            <div 
                                key={step.title} 
                                className="group relative rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 flex flex-col min-h-[280px]"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 font-heading text-sm font-bold text-primary-foreground shadow-lg z-10">
                                    {i + 1}
                                </div>
                                
                                {/* Icon */}
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.color} transition-all duration-300 group-hover:scale-110 mb-4`}>
                                    <step.icon size={24} />
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Arrow for connecting steps */}
                                {i < steps.length - 1 && (
                                    <div className="absolute top-1/2 -right-3 hidden lg:block -translate-y-1/2 z-20">
                                        <ArrowRight size={20} className="text-border/50" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* CTA Section */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                            <span className="font-medium">Ready to get started?</span>
                            <ArrowRight size={16} />
                        </div>
                        <p className="mt-4 font-body text-muted-foreground">
                            Join thousands of users and businesses already using GLOBALDEV ONE™
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
