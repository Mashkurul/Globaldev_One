import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/features";
import Stats from "@/app/components/Stats";
import Security from "@/app/components/about";
import CTA from "@/app/components/cta";
import Footer from "@/app/components/footer";
import HowItWorks from "@/app/components/howitworks";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Features />
                <HowItWorks />
                <Security />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}