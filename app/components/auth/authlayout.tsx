"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AuthLayout({
                                       children,
                                       title,
                                       subtitle,
                                   }: {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-900/80 dark:bg-slate-900/80 transition-colors">

            {/* LEFT SIDE - Branding */}
            <div className="relative hidden lg:flex items-center justify-center p-12 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1549924231-f129b911e442"
                    alt="Luxury Lamborghini"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 text-white max-w-md">
                    <h2 className="text-4xl font-bold mb-4">
                        Drive Beyond Limits
                    </h2>
                    <p className="text-white">
                        Join the most premium luxury car rental experience.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="flex items-center justify-center px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-10 shadow-2xl"
                >
                    <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                        {title}
                    </h1>
                    <p className="text-white dark:text-gray-400 mb-8">
                        {subtitle}
                    </p>

                    {children}
                </motion.div>
            </div>
        </div>
    );
}