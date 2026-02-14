"use client";

import Navbar from "@/app/components/Navbar";
import MarketplaceHeader from "@/app/components/marketplace/marketplaceheader";
import VehicleGrid from "@/app/components/marketplace/vehiclegrid";
import Footer from "@/app/components/footer";

export default function MarketplacePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
            <Navbar />
            <main>
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    <MarketplaceHeader />
                    <VehicleGrid />
                </div>
            </main>
            <Footer />
        </div>
    );
}
