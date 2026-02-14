import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-sm mb-6">
                <ShieldCheck size={16} />
                <span className="font-medium">Trusted by 500+ Rental Businesses</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl">
                The Trusted Vehicle <br />
                <span className="text-brand">Rental Marketplace</span>
            </h1>

            <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
                Identity verification, automated contracts & payments, and fraud protection —
                all in one multi-tenant platform built for scale.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
                <button className="bg-brand hover:bg-brand/90 text-black font-semibold px-8 py-4 rounded-lg flex items-center gap-2 transition-all">
                    <a href="/marketplace">Browse Vehicles</a>
                </button>

            </div>


        </section>
    );
}