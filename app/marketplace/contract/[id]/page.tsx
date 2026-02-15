"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, FileText, Check, AlertCircle, Clock, Calendar, MapPin, Shield, Download } from "lucide-react";
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

export default function ContractPage({ params }: { params: Promise<{ id: string }> }) {
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
                        <p className="text-gray-300 mb-8">Please login to sign the rental contract.</p>
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

    return <ContractContent vehicleId={id} />;
}

function ContractContent({ vehicleId }: { vehicleId: string }) {
    const { user } = useAuth();
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [contractAccepted, setContractAccepted] = useState(false);
    const [termsRead, setTermsRead] = useState(false);
    const [signature, setSignature] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contractSigned, setContractSigned] = useState(false);
    const [contractId, setContractId] = useState<string>("");

    // Vehicle data - same as other pages
    const vehicleData: { [key: string]: any } = {
        "tesla-model-3": {
            name: "Tesla Model 3",
            year: 2024,
            price: 85,
            status: "Available",
            fuel: "Electric",
            seats: 5,
            transmission: "Auto",
            image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
            category: "Electric • Premium",
            location: "New York, NY",
            licensePlate: "GFR-001",
            vin: "TESLA123456",
        },
        "bmw-x5": {
            name: "BMW X5",
            year: 2023,
            price: 120,
            status: "Available",
            fuel: "Petrol",
            seats: 5,
            transmission: "Auto",
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54d",
            category: "SUV • Luxury",
            location: "Los Angeles, CA",
            licensePlate: "BMW-2023",
            vin: "BMW5X123456",
        },
        "toyota-corolla": {
            name: "Toyota Corolla",
            year: 2022,
            price: 45,
            status: "Available",
            fuel: "Petrol",
            seats: 5,
            transmission: "Auto",
            image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
            category: "Sedan • Economy",
            location: "Chicago, IL",
            licensePlate: "TOY-2022",
            vin: "TOYCOR123456",
        },
        "honda-civic": {
            name: "Honda Civic",
            year: 2023,
            price: 48,
            status: "Rented",
            fuel: "Petrol",
            seats: 5,
            transmission: "Auto",
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
            category: "Sedan • Sport",
            location: "Miami, FL",
            licensePlate: "HON-2023",
            vin: "HONCIV123456",
        }
    };

    useEffect(() => {
        // Load booking data from sessionStorage
        const storedData = sessionStorage.getItem('bookingData');
        if (storedData) {
            const data = JSON.parse(storedData);
            if (data.vehicleId === vehicleId) {
                setBookingData(data);
            }
        }
        
        // Load contract data if contract was already signed
        const contractData = sessionStorage.getItem('contractData');
        if (contractData) {
            const contract = JSON.parse(contractData);
            if (contract.contractSigned && contract.vehicleId === vehicleId) {
                setContractId(contract.contractId);
                setContractSigned(true);
            }
        }
        
        setLoading(false);
    }, [vehicleId]);

    const handleAcceptContract = () => {
        if (!termsRead || !signature.trim()) {
            alert('Please read all terms and provide your signature.');
            return;
        }
        setContractAccepted(true);
    };

    const handleSubmitContract = async () => {
        setIsSubmitting(true);
        
        // Simulate contract submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store contract data
        const contractData = {
            ...bookingData,
            contractSigned: true,
            signature: signature,
            signedDate: new Date().toISOString(),
            contractId: `CONTRACT-${Date.now()}`
        };
        
        sessionStorage.setItem('contractData', JSON.stringify(contractData));
        setContractId(contractData.contractId);
        setContractSigned(true);
        setIsSubmitting(false);
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
                        <h1 className="text-4xl font-bold text-white mb-4">Booking Not Found</h1>
                        <p className="text-gray-300 mb-8">Please start your booking again.</p>
                        <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                            Back to Marketplace
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    if (contractSigned) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={40} className="text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Contract Signed!</h1>
                        <p className="text-gray-300 mb-8">
                            Your rental agreement has been signed successfully. You can now proceed to payment.
                        </p>
                        <div className="bg-gray-900 rounded-xl p-6 mb-8 text-left">
                            <h3 className="font-semibold text-white mb-4">Contract Details</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Contract ID: #{contractId}</p>
                                <p>Vehicle: {bookingData.vehicle.year} {bookingData.vehicle.name}</p>
                                <p>Duration: {bookingData.totalDays} days</p>
                                <p>Signed: {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                        <Link href={`/marketplace/payment/${vehicleId}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                            Proceed to Payment
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const vehicle = vehicleData[vehicleId];

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
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rental Agreement</h1>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Contract Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                
                                {/* Contract Header */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText size={24} className="text-blue-600" />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Vehicle Rental Agreement
                                        </h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div>
                                            <p><strong>Contract ID:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p><strong>Renter:</strong> {user?.name}</p>
                                            <p><strong>Email:</strong> {user?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contract Terms */}
                                <div className="p-6 space-y-6">
                                    <section>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">1. Vehicle Information</h3>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                            <div className="flex gap-4">
                                                <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={vehicle.image}
                                                        alt={vehicle.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {vehicle.year} {vehicle.name}
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                        <p><strong>VIN:</strong> {vehicle.vin}</p>
                                                        <p><strong>License:</strong> {vehicle.licensePlate}</p>
                                                        <p><strong>Category:</strong> {vehicle.category}</p>
                                                        <p><strong>Location:</strong> {vehicle.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">2. Rental Period</h3>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p><strong>Pickup Date:</strong> {new Date(bookingData.startDate).toLocaleDateString()}</p>
                                                    <p><strong>Return Date:</strong> {new Date(bookingData.endDate).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p><strong>Duration:</strong> {bookingData.totalDays} days</p>
                                                    <p><strong>Daily Rate:</strong> ${bookingData.vehicle.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">3. Rental Terms & Conditions</h3>
                                        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex items-start gap-2">
                                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                <p>The renter must be at least 21 years of age and possess a valid driver's license.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                <p>The vehicle must be returned in the same condition as received, excluding normal wear and tear.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                <p>The renter is responsible for all traffic violations and parking tickets during the rental period.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                <p>Smoking is prohibited in the vehicle. A cleaning fee of $250 will apply for violations.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                <p>The vehicle shall not be used for any illegal purposes or racing activities.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                <p>Fuel level must be the same at return as at pickup. Refueling charge is $5.50 per gallon.</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">4. Insurance & Liability</h3>
                                        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex items-start gap-2">
                                                <Shield size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                                <p>Basic insurance coverage is included with a $1,000 deductible.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Shield size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                                <p>Renter is liable for any damages exceeding the insurance coverage.</p>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Shield size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                                <p>Personal belongings are not covered by the rental insurance.</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">5. Payment Terms</h3>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                <p><strong>Total Rental Cost:</strong> ${bookingData.totalPrice}</p>
                                                <p><strong>Security Deposit:</strong> $500 (refundable)</p>
                                                <p><strong>Payment Method:</strong> Credit/Debit Card</p>
                                                <p><strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before pickup</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Terms Acknowledgment */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                                            <div className="text-sm text-blue-800 dark:text-blue-300">
                                                <p className="font-semibold mb-1">Important Notice</p>
                                                <p>By signing this agreement, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions outlined in this rental agreement.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6">
                                
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contract Summary</h3>
                                
                                {/* Rental Summary */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Vehicle</span>
                                        <span className="text-gray-900 dark:text-white font-medium">{bookingData.vehicle.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Duration</span>
                                        <span className="text-gray-900 dark:text-white font-medium">{bookingData.totalDays} days</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
                                        <span className="text-gray-900 dark:text-white font-medium">${bookingData.totalPrice}</span>
                                    </div>
                                </div>

                                {/* Terms Read Confirmation */}
                                <div className="mb-6">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={termsRead}
                                            onChange={(e) => setTermsRead(e.target.checked)}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            I have read and agree to all terms and conditions in this rental agreement
                                        </span>
                                    </label>
                                </div>

                                {/* Signature */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Electronic Signature
                                    </label>
                                    <input
                                        type="text"
                                        value={signature}
                                        onChange={(e) => setSignature(e.target.value)}
                                        placeholder="Type your full name to sign"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        This electronic signature is legally binding
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                {!contractAccepted ? (
                                    <button
                                        onClick={handleAcceptContract}
                                        disabled={!termsRead || !signature.trim()}
                                        className="w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2
                                               bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        <FileText size={20} />
                                        Accept & Sign Contract
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmitContract}
                                        disabled={isSubmitting}
                                        className="w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2
                                               bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Check size={20} />
                                                Submit Signed Contract
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Download Contract */}
                                <button className="w-full mt-3 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2
                                               border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <Download size={20} />
                                    Download Contract PDF
                                </button>

                                {/* Support */}
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle size={16} className="text-gray-500 dark:text-gray-400 mt-0.5" />
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            <p className="font-semibold mb-1">Need Help?</p>
                                            <p>Contact our support team if you have any questions about this agreement.</p>
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
