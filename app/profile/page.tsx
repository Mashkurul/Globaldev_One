"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { User, FileText, Shield, History, Settings, ChevronRight, Check, X, Clock, Calendar, MapPin, CreditCard, Star, Bell, Palette } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("overview");

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-gray-300 mb-8">Please login to view your profile.</p>
                    <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black pt-28">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Profile Dashboard</h1>
                    <p className="text-gray-400">Manage your account, view rental history, and complete verification</p>
                </div>

                {/* Profile Overview Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-800">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                            <User size={40} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                            <p className="text-gray-400 mb-2">{user.email}</p>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-green-400">
                                    <Check size={16} />
                                    Email Verified
                                </span>
                                <span className="flex items-center gap-1 text-yellow-400">
                                    <Clock size={16} />
                                    Identity: Pending
                                </span>
                            </div>
                        </div>
                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-800">
                    {[
                        { id: "overview", label: "Overview", icon: User },
                        { id: "rentals", label: "Rental History", icon: History },
                        { id: "documents", label: "Documents", icon: FileText },
                        { id: "verification", label: "Verification", icon: Shield },
                        { id: "settings", label: "Settings", icon: Settings }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl transition-colors ${
                                activeTab === tab.id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                    {activeTab === "overview" && <OverviewTab user={user} />}
                    {activeTab === "rentals" && <RentalHistoryTab />}
                    {activeTab === "documents" && <DocumentsTab />}
                    {activeTab === "verification" && <VerificationTab />}
                    {activeTab === "settings" && <SettingsTab user={user} />}
                </div>
            </div>
        </div>
    );
}

// Tab Content Components
function OverviewTab({ user }: { user: any }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Account Overview</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Total Rentals</span>
                        <History size={20} className="text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-sm text-gray-400">Last 6 months</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Total Spent</span>
                        <CreditCard size={20} className="text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">$2,450</p>
                    <p className="text-sm text-gray-400">Lifetime</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Member Since</span>
                        <Calendar size={20} className="text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">Jan 2024</p>
                    <p className="text-sm text-gray-400">1 year ago</p>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Quick Actions</h4>
                <div className="space-y-2">
                    <Link href="/marketplace" className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <span className="text-gray-300">Book a New Vehicle</span>
                        <ChevronRight size={18} className="text-gray-400" />
                    </Link>
                    <button className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <span className="text-gray-300">Update Payment Method</span>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                    <Link href="/profile/rentals" className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <span className="text-gray-300">View Rental History</span>
                        <ChevronRight size={18} className="text-gray-400" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function RentalHistoryTab() {
    const rentals = [
        {
            id: "1",
            vehicle: "Tesla Model 3",
            date: "Feb 10-12, 2026",
            location: "New York, NY",
            total: "$255",
            status: "completed",
            rating: 5
        },
        {
            id: "2", 
            vehicle: "BMW X5",
            date: "Jan 25-28, 2026",
            location: "Los Angeles, CA",
            total: "$360",
            status: "completed",
            rating: 4
        },
        {
            id: "3",
            vehicle: "Toyota Corolla",
            date: "Dec 15-17, 2025",
            location: "Chicago, IL",
            total: "$135",
            status: "cancelled",
            rating: null
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Recent Rentals</h3>
                <Link href="/profile/rentals" className="text-blue-400 hover:text-blue-300 text-sm">
                    View All →
                </Link>
            </div>
            
            <div className="space-y-4">
                {rentals.map((rental) => (
                    <div key={rental.id} className="bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h4 className="font-semibold text-white">{rental.vehicle}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {rental.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {rental.location}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-white">{rental.total}</p>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                    rental.status === "completed" 
                                        ? "bg-green-900/50 text-green-400"
                                        : "bg-red-900/50 text-red-400"
                                }`}>
                                    {rental.status === "completed" ? <Check size={12} /> : <X size={12} />}
                                    {rental.status}
                                </span>
                            </div>
                        </div>
                        {rental.rating && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">Your rating:</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-4 h-4 rounded-full ${
                                                i < rental.rating ? "bg-yellow-400" : "bg-gray-600"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <Link href={`/profile/rentals#${rental.id}`} className="mt-3 text-blue-400 hover:text-blue-300 text-sm inline-block">
                            View Details →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DocumentsTab() {
    const documents = [
        { name: "Driver's License", status: "verified", uploadDate: "Jan 15, 2026" },
        { name: "Passport", status: "pending", uploadDate: "Feb 1, 2026" },
        { name: "Insurance Card", status: "missing", uploadDate: null },
        { name: "Utility Bill", status: "verified", uploadDate: "Jan 10, 2026" }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Documents</h3>
                <Link href="/profile/documents" className="text-blue-400 hover:text-blue-300 text-sm">
                    Manage All →
                </Link>
            </div>
            
            <div className="space-y-4">
                {documents.map((doc, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-gray-400" />
                                <div>
                                    <h4 className="font-semibold text-white">{doc.name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {doc.uploadDate ? `Uploaded: ${doc.uploadDate}` : "Not uploaded"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                    doc.status === "verified" 
                                        ? "bg-green-900/50 text-green-400"
                                        : doc.status === "pending"
                                        ? "bg-yellow-900/50 text-yellow-400"
                                        : "bg-red-900/50 text-red-400"
                                }`}>
                                    {doc.status === "verified" && <Check size={12} />}
                                    {doc.status === "pending" && <Clock size={12} />}
                                    {doc.status === "missing" && <X size={12} />}
                                    {doc.status}
                                </span>
                                <Link href="/profile/documents" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                                    {doc.status === "missing" ? "Upload" : "View"}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Why we need these documents</h4>
                <p className="text-sm text-blue-300">
                    We require these documents to verify your identity and ensure a safe rental experience for all users. 
                    All documents are encrypted and stored securely.
                </p>
            </div>
        </div>
    );
}

function SettingsTab({ user }: { user: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Settings</h3>
                <Link href="/profile/settings" className="text-blue-400 hover:text-blue-300 text-sm">
                    Manage All Settings →
                </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                <Link href="/profile/settings" className="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <User size={20} className="text-blue-400" />
                        <h4 className="font-medium text-white">Profile Settings</h4>
                    </div>
                    <p className="text-sm text-gray-400">Update your personal information and profile details</p>
                </Link>

                <Link href="/profile/settings" className="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <Bell size={20} className="text-green-400" />
                        <h4 className="font-medium text-white">Notifications</h4>
                    </div>
                    <p className="text-sm text-gray-400">Manage email and push notification preferences</p>
                </Link>

                <Link href="/profile/settings" className="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield size={20} className="text-purple-400" />
                        <h4 className="font-medium text-white">Privacy & Security</h4>
                    </div>
                    <p className="text-sm text-gray-400">Control your privacy settings and security options</p>
                </Link>

                <Link href="/profile/settings" className="block p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <Palette size={20} className="text-yellow-400" />
                        <h4 className="font-medium text-white">Appearance</h4>
                    </div>
                    <p className="text-sm text-gray-400">Customize theme, language, and display settings</p>
                </Link>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Quick Settings</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-blue-300">Email Notifications</span>
                        <span className="text-blue-400">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-300">Two-Factor Auth</span>
                        <span className="text-blue-400">Disabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-300">Profile Visibility</span>
                        <span className="text-blue-400">Public</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-300">Theme</span>
                        <span className="text-blue-400">Dark</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function VerificationTab() {
    const verificationSteps = [
        { step: "Email Verification", status: "completed", description: "Your email has been verified" },
        { step: "Phone Verification", status: "completed", description: "Your phone number has been verified" },
        { step: "Identity Verification", status: "pending", description: "Upload government-issued ID" },
        { step: "Address Verification", status: "pending", description: "Upload proof of address" }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Identity Verification</h3>
                <Link href="/profile/verification" className="text-blue-400 hover:text-blue-300 text-sm">
                    Complete Verification →
                </Link>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <Shield size={20} className="text-yellow-400 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">Verification Required</h4>
                        <p className="text-sm text-yellow-300">
                            Complete all verification steps to unlock premium features and increase your rental limits.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {verificationSteps.map((step, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step.status === "completed" 
                                        ? "bg-green-600"
                                        : "bg-gray-600"
                                }`}>
                                    {step.status === "completed" ? (
                                        <Check size={16} className="text-white" />
                                    ) : (
                                        <span className="text-white text-sm">{index + 1}</span>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{step.step}</h4>
                                    <p className="text-sm text-gray-400">{step.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    step.status === "completed"
                                        ? "bg-green-900/50 text-green-400"
                                        : "bg-gray-700 text-gray-400"
                                }`}>
                                    {step.status}
                                </span>
                                {step.status !== "completed" && (
                                    <Link href="/profile/verification" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                                        Complete
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Verification Benefits</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                        <Check size={16} className="text-green-400" />
                        Higher rental limits
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <Check size={16} className="text-green-400" />
                        Priority customer support
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <Check size={16} className="text-green-400" />
                        Exclusive vehicle access
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                        <Check size={16} className="text-green-400" />
                        Faster booking process
                    </div>
                </div>
            </div>
        </div>
    );
}
