"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Check, Clock, AlertCircle, ChevronRight, Upload, Camera, User, MapPin, Phone, Mail, Star, Lock, X } from "lucide-react";

export default function VerificationPage() {
    const [activeStep, setActiveStep] = useState(1);

    const verificationSteps = [
        {
            id: 1,
            title: "Email Verification",
            description: "Verify your email address",
            status: "completed",
            icon: Mail,
            completedDate: "2026-01-15",
            benefits: ["Secure communication", "Account recovery", "Important notifications"]
        },
        {
            id: 2,
            title: "Phone Verification",
            description: "Add and verify your phone number",
            status: "completed",
            icon: Phone,
            completedDate: "2026-01-16",
            benefits: ["Two-factor authentication", "SMS notifications", "Quick support"]
        },
        {
            id: 3,
            title: "Identity Verification",
            description: "Upload government-issued ID",
            status: "pending",
            icon: User,
            completedDate: null,
            benefits: ["Higher rental limits", "Priority booking", "Trust badge"]
        },
        {
            id: 4,
            title: "Address Verification",
            description: "Verify your residential address",
            status: "pending",
            icon: MapPin,
            completedDate: null,
            benefits: ["Local pickup options", "Faster verification", "Enhanced security"]
        },
        {
            id: 5,
            title: "Payment Verification",
            description: "Add and verify payment method",
            status: "in_progress",
            icon: Lock,
            completedDate: null,
            benefits: ["Instant bookings", "Auto-renewal options", "Payment protection"]
        }
    ];

    const verificationLevels = [
        {
            level: "Basic",
            completedSteps: 2,
            totalSteps: 5,
            color: "bg-gray-600",
            benefits: ["Browse vehicles", "Make bookings", "Email support"],
            limits: { dailyRentals: 1, monthlySpending: 500, vehicleTypes: ["Economy", "Compact"] }
        },
        {
            level: "Verified",
            completedSteps: 3,
            totalSteps: 5,
            color: "bg-blue-600",
            benefits: ["Higher rental limits", "Priority support", "Trust badge", "Faster approvals"],
            limits: { dailyRentals: 3, monthlySpending: 2000, vehicleTypes: ["All except Luxury"] }
        },
        {
            level: "Premium",
            completedSteps: 5,
            totalSteps: 5,
            color: "bg-purple-600",
            benefits: ["Unlimited rentals", "VIP support", "Exclusive vehicles", "Best rates", "Instant approvals"],
            limits: { dailyRentals: "Unlimited", monthlySpending: "Unlimited", vehicleTypes: ["All"] }
        }
    ];

    const currentLevel = verificationLevels.find(level => level.completedSteps >= 2) || verificationLevels[0];
    const nextLevel = verificationLevels.find(level => level.completedSteps > currentLevel.completedSteps);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-900/50 text-green-400 border-green-800";
            case "in_progress": return "bg-blue-900/50 text-blue-400 border-blue-800";
            case "pending": return "bg-gray-900/50 text-gray-400 border-gray-800";
            default: return "bg-gray-900/50 text-gray-400 border-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return <Check size={20} />;
            case "in_progress": return <Clock size={20} />;
            case "pending": return <AlertCircle size={20} />;
            default: return <AlertCircle size={20} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black pt-28">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/profile" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                        ← Back to Profile
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Identity Verification</h1>
                    <p className="text-gray-400">Complete verification steps to unlock premium features and increase your rental limits</p>
                </div>

                {/* Current Verification Level */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-blue-800">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Current Level: {currentLevel.level}</h3>
                            <p className="text-gray-300">You've completed {currentLevel.completedSteps} of {currentLevel.totalSteps} verification steps</p>
                        </div>
                        <div className="text-right">
                            <div className={`w-16 h-16 ${currentLevel.color} rounded-full flex items-center justify-center mb-2`}>
                                <Shield size={32} className="text-white" />
                            </div>
                            <p className="text-sm text-gray-300">{currentLevel.level} Member</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-sm text-gray-400 mb-1">Daily Rentals</p>
                            <p className="text-lg font-semibold text-white">{currentLevel.limits.dailyRentals}</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-sm text-gray-400 mb-1">Monthly Spending</p>
                            <p className="text-lg font-semibold text-white">${currentLevel.limits.monthlySpending}</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-sm text-gray-400 mb-1">Vehicle Access</p>
                            <p className="text-lg font-semibold text-white">{currentLevel.limits.vehicleTypes.length} types</p>
                        </div>
                    </div>

                    {nextLevel && (
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-sm text-gray-300 mb-1">
                                Complete {nextLevel.completedSteps - currentLevel.completedSteps} more steps to reach {nextLevel.level} level
                            </p>
                            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                    style={{ width: `${(currentLevel.completedSteps / currentLevel.totalSteps) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Verification Steps */}
                <div className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-white">Verification Steps</h3>
                    {verificationSteps.map((step, index) => (
                        <div 
                            key={step.id}
                            className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border transition-all ${
                                step.status === "completed" ? "border-green-800" : 
                                step.status === "in_progress" ? "border-blue-800" : 
                                "border-gray-800"
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    step.status === "completed" ? "bg-green-600" : 
                                    step.status === "in_progress" ? "bg-blue-600" : 
                                    "bg-gray-600"
                                }`}>
                                    {getStatusIcon(step.status)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                                            <p className="text-gray-400 mb-2">{step.description}</p>
                                            {step.completedDate && (
                                                <p className="text-sm text-green-400">Completed on {new Date(step.completedDate).toLocaleDateString()}</p>
                                            )}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(step.status)}`}>
                                            {step.status.replace('_', ' ').charAt(0).toUpperCase() + step.status.replace('_', ' ').slice(1)}
                                        </span>
                                    </div>

                                    {/* Benefits */}
                                    <div className="mb-4">
                                        <h5 className="text-sm font-medium text-white mb-2">Benefits:</h5>
                                        <div className="grid md:grid-cols-2 gap-2">
                                            {step.benefits.map((benefit, benefitIndex) => (
                                                <div key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Star size={14} className="text-yellow-400" />
                                                    {benefit}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        {step.status === "completed" && (
                                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2">
                                                <Check size={16} />
                                                Completed
                                            </button>
                                        )}
                                        {step.status === "in_progress" && (
                                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
                                                <Clock size={16} />
                                                In Progress
                                            </button>
                                        )}
                                        {step.status === "pending" && (
                                            <>
                                                <button 
                                                    onClick={() => setActiveStep(step.id)}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                    {step.id === 3 ? <Upload size={16} /> : <ChevronRight size={16} />}
                                                    {step.id === 3 ? "Upload ID" : "Start Verification"}
                                                </button>
                                                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                                                    Learn More
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Verification Benefits Comparison */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-4">Verification Benefits</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-3 px-4 text-gray-400">Feature</th>
                                    {verificationLevels.map((level) => (
                                        <th key={level.level} className="text-center py-3 px-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 ${level.color} rounded-full mb-1`}></div>
                                                <span className="text-white font-medium">{level.level}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-800">
                                    <td className="py-3 px-4 text-gray-300">Daily Rental Limit</td>
                                    {verificationLevels.map((level) => (
                                        <td key={level.level} className="text-center py-3 px-4 text-white">
                                            {level.limits.dailyRentals}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-3 px-4 text-gray-300">Monthly Spending Limit</td>
                                    {verificationLevels.map((level) => (
                                        <td key={level.level} className="text-center py-3 px-4 text-white">
                                            ${level.limits.monthlySpending}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-3 px-4 text-gray-300">Vehicle Types</td>
                                    {verificationLevels.map((level) => (
                                        <td key={level.level} className="text-center py-3 px-4 text-white text-sm">
                                            {level.limits.vehicleTypes.length === 1 ? "Limited" : 
                                             level.limits.vehicleTypes.length === 4 ? "Most" : "All"}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-3 px-4 text-gray-300">Priority Support</td>
                                    {verificationLevels.map((level) => (
                                        <td key={level.level} className="text-center py-3 px-4">
                                            {level.level === "Premium" ? <Check size={20} className="text-green-400 mx-auto" /> : 
                                             level.level === "Verified" ? <Check size={20} className="text-yellow-400 mx-auto" /> :
                                             <X size={20} className="text-gray-600 mx-auto" />}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-3 px-4 text-gray-300">Trust Badge</td>
                                    {verificationLevels.map((level) => (
                                        <td key={level.level} className="text-center py-3 px-4">
                                            {level.level !== "Basic" ? <Check size={20} className="text-green-400 mx-auto" /> : 
                                             <X size={20} className="text-gray-600 mx-auto" />}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-gray-300">Instant Approvals</td>
                                    {verificationLevels.map((level) => (
                                        <td key={level.level} className="text-center py-3 px-4">
                                            {level.level === "Premium" ? <Check size={20} className="text-green-400 mx-auto" /> : 
                                             <X size={20} className="text-gray-600 mx-auto" />}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Security Information */}
                <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Shield size={20} className="text-blue-400" />
                        Security & Privacy
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                        <div>
                            <h5 className="font-medium text-white mb-2">Data Protection:</h5>
                            <ul className="space-y-1">
                                <li>• End-to-end encryption</li>
                                <li>• Secure cloud storage</li>
                                <li>• Regular security audits</li>
                                <li>• GDPR compliant</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-white mb-2">Privacy Controls:</h5>
                            <ul className="space-y-1">
                                <li>• Data minimization</li>
                                <li>• User consent required</li>
                                <li>• Right to deletion</li>
                                <li>• Transparent policies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
