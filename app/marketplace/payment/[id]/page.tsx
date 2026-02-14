"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, CreditCard, Shield, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useAuth } from "@/app/contexts/AuthContext";

interface BookingData {
    vehicleId: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    totalPrice: number;
    vehicle: {
        name: string;
        year: number;
        price: number;
        image: string;
    };
}

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </main>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
                        <p className="text-gray-300 mb-8">Please login to complete payment.</p>
                        <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition mr-4">
                            Login
                        </Link>
                        <Link href="/auth/register" className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition">
                            Sign Up
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return <PaymentContent vehicleId={id} />;
}

function PaymentContent({ vehicleId }: { vehicleId: string }) {
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    
    // Form states
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Load contract data from sessionStorage
    useEffect(() => {
        const storedData = sessionStorage.getItem('contractData');
        if (storedData) {
            const data = JSON.parse(storedData);
            if (data.vehicleId === vehicleId && data.contractSigned) {
                setBookingData(data);
            }
        }
        setLoading(false);
    }, [vehicleId]);

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        setExpiryDate(formatted);
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Show success state
        setPaymentSuccess(true);
        setProcessing(false);
        
        // Store contract in user documents (in a real app, this would be an API call)
        const contractData = {
            id: `contract-${Date.now()}`,
            name: `Rental Agreement - ${bookingData.vehicle.name}`,
            type: "contract",
            status: "verified",
            uploadDate: new Date().toISOString(),
            fileUrl: "#", // In a real app, this would be the actual file URL
            description: `Rental contract for ${bookingData.vehicle.name} from ${bookingData.startDate} to ${bookingData.endDate}`
        };
        
        // Store in user's documents (simplified for demo)
        const existingContracts = JSON.parse(localStorage.getItem('userContracts') || '[]');
        existingContracts.push(contractData);
        localStorage.setItem('userContracts', JSON.stringify(existingContracts));
        
        // Clear contract data
        sessionStorage.removeItem('contractData');
    };

    const isFormValid = () => {
        return cardNumber.replace(/\s/g, '').length === 16 &&
               cardName.trim() !== "" &&
               expiryDate.length === 5 &&
               cvv.length === 3 &&
               email.trim() !== "" &&
               phone.trim() !== "";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </main>
            </div>
        );
    }

    if (!bookingData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Contract Not Found</h1>
                        <p className="text-gray-300 mb-8">Please sign the rental agreement first.</p>
                        <Link href={`/marketplace/contract/${vehicleId}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                            Sign Contract
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    if (paymentSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={40} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
                        <p className="text-gray-300 mb-8">
                            Your booking has been confirmed. Check your email for booking details.
                        </p>
                        <div className="bg-gray-900 rounded-xl p-6 mb-8 text-left">
                            <h3 className="font-semibold text-white mb-4">Booking Summary</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Vehicle: {bookingData.vehicle.year} {bookingData.vehicle.name}</p>
                                <p>Duration: {bookingData.totalDays} days</p>
                                <p>Total Paid: ${bookingData.totalPrice}</p>
                                <p>Booking ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            </div>
                        </div>
                        <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                            Back to Marketplace
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
            <Navbar />
            <main className="pt-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href={`/marketplace/book/${vehicleId}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Complete Your Payment</h1>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Left Column - Payment Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handlePayment} className="space-y-6">
                                
                                {/* Contact Information */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                       focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                       focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <CreditCard size={20} />
                                        Payment Method
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                required
                                                maxLength={19}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                       focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Cardholder Name
                                            </label>
                                            <input
                                                type="text"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                       focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    value={expiryDate}
                                                    onChange={handleExpiryDateChange}
                                                    required
                                                    maxLength={5}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                           focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                                    required
                                                    maxLength={3}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                           focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-start gap-3">
                                        <Shield size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                                        <div className="text-sm text-blue-800 dark:text-blue-300">
                                            <p className="font-semibold mb-1">Secure Payment</p>
                                            <p>Your payment information is encrypted and secure. We never store your card details.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!isFormValid() || processing}
                                    className="w-full py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2
                                           bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Processing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard size={20} />
                                            Complete Payment - ${bookingData.totalPrice}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                                
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h3>
                                
                                {/* Vehicle Info */}
                                <div className="flex gap-4 mb-6">
                                    <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={bookingData.vehicle.image}
                                            alt={bookingData.vehicle.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {bookingData.vehicle.year} {bookingData.vehicle.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            ${bookingData.vehicle.price}/day
                                        </p>
                                    </div>
                                </div>

                                {/* Rental Details */}
                                <div className="space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Start Date</span>
                                        <span className="text-gray-900 dark:text-white">
                                            {new Date(bookingData.startDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">End Date</span>
                                        <span className="text-gray-900 dark:text-white">
                                            {new Date(bookingData.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Duration</span>
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            {bookingData.totalDays} days
                                        </span>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-2 py-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            ${bookingData.vehicle.price} × {bookingData.totalDays} days
                                        </span>
                                        <span className="text-gray-900 dark:text-white">
                                            ${bookingData.vehicle.price * bookingData.totalDays}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Service fee</span>
                                        <span className="text-gray-900 dark:text-white">$0</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-2xl font-bold text-blue-600">${bookingData.totalPrice}</span>
                                    </div>
                                </div>

                                {/* Cancellation Policy */}
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle size={16} className="text-gray-500 dark:text-gray-400 mt-0.5" />
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            <p className="font-semibold mb-1">Cancellation Policy</p>
                                            <p>Free cancellation up to 24 hours before pickup. 50% refund for cancellations within 24 hours.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
