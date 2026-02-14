
"use client";
import { Store, Fingerprint, FileSignature, ScrollText, ShieldCheck, PieChart } from "lucide-react";
import ImageSlider from "./image-slider";

const features = [
    
    { 
        icon: Fingerprint, 
        title: "Identity Verification & Fraud Detection", 
        desc: "Bank-grade KYC with document scanning, selfie matching, and real-time fraud risk scoring. Block bad actors before they book.", 
        visual: "ID Verification Flow",
        images: [
            { url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop", alt: "ID verification interface", title: "Document Scanning" },
            { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop", alt: "Face recognition", title: "Selfie Matching" },
            { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", alt: "Risk assessment dashboard", title: "Risk Scoring" }
        ]
    },
    { 
        icon: FileSignature, 
        title: "Automated Contracts & Payments", 
        desc: "Digital contracts generated from booking data, e-signed by both parties, with integrated payment processing and escrow.", 
        visual: "Contract Builder",
        images: [
            { url: "https://images.unsplash.com/photo-1554224154-260325c0594e?w=600&h=400&fit=crop", alt: "Digital contract interface", title: "Contract Generation" },
            { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop", alt: "Electronic signature", title: "E-Signature" },
            { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", alt: "Payment processing", title: "Payment Integration" }
        ]
    },
    { 
        icon: ScrollText, 
        title: "Audit Logs & Legal Compliance", 
        desc: "Every action logged with timestamps, user IDs, and IP addresses. Legal-grade evidence for disputes and regulatory compliance.", 
        visual: "Audit Log Viewer",
        images: [
            { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", alt: "Audit log dashboard", title: "Activity Logs" },
            { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", alt: "Compliance reports", title: "Compliance Reports" },
            { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop", alt: "Legal documentation", title: "Legal Records" }
        ]
    },

    { 
        icon: PieChart, 
        title: "Reports & Accounting Automation", 
        desc: "Automated revenue reports, tax summaries, and financial exports. Reconcile payments and track profitability per vehicle or branch.", 
        visual: "Analytics Dashboard",
        images: [
            { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", alt: "Analytics dashboard", title: "Revenue Analytics" },
            { url: "https://images.unsplash.com/photo-1554224154-260325c0594e?w=600&h=400&fit=crop", alt: "Financial reports", title: "Financial Reports" },
            { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop", alt: "Tax summaries", title: "Tax Management" }
        ]
    },
];

const FeaturesSection = () => (
    <section id="features" className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
                <h2 className="font-heading text-3xl font-bold text-brand md:text-4xl">
                    Everything You Need to <span className="text-gradient">Scale</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">
                    A complete platform for vehicle rental operations — from identity verification to financial reporting.
                </p>
            </div>

            <div className="mt-16 space-y-16">
                {features.map((f, i) => (
                    <div key={f.title} className={`flex flex-col gap-8 lg:flex-row lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                        <div className="flex-1">
                            <f.icon size={32} className="text-primary" />
                            <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{f.title}</h3>
                            <p className="mt-3 font-body text-muted-foreground leading-relaxed">{f.desc}</p>
                        </div>
                        <div className="flex-1">
                            <ImageSlider images={f.images} autoPlay={true} interval={4000} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeaturesSection;