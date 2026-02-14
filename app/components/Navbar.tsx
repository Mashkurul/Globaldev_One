"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const { user, logout } = useAuth();
    
    const navLinks = [
        { label: "How It Works", href: isHomePage ? "#how-it-works" : "/home/howitworks" },
        { label: "Features", href: isHomePage ? "#features" : "/home/feature" },
        { label: "About", href: isHomePage ? "#about" : "/home/about" },
    ];

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!isHomePage) return; // Don't prevent default on other pages
        
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-xl font-bold">
                        <a href="/home">GLOBALDEV <span className="text-teal-400">ONE™</span></a>
                    </h1>

                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex gap-4">

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-300">Welcome, {user.name}</span>
                                <Link href="/profile" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors">
                                    Profile
                                </Link>
                                <button 
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="bg-teal-400 hover:bg-teal-500 text-black px-4 py-2 rounded-xl font-semibold transition-colors">
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
