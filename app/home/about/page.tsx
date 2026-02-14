"use client";

import Navbar from "@/app/components/Navbar";
import AboutSection from "@/app/components/about";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
            <Navbar />
            <main className="pt-20">
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    <AboutSection />
                </div>
            </main>
        </div>
    );
}