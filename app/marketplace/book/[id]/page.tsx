"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, Users, Fuel, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useAuth } from "@/app/contexts/AuthContext";

// Vehicle data - same as viewdetails
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
        features: ["Electric", "Autopilot", "Leather Seats", "Premium Audio", "Fast Charging", "GPS"],
        description: "Experience luxury and performance with this 2024 Tesla Model 3. Perfect for business trips or weekend getaways. Meticulously maintained and detailed before every rental."
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
        features: ["Petrol Engine", "Leather Seats", "Premium Audio", "All-Wheel Drive", "Parking Sensors", "Bluetooth"],
        description: "Command the road in this luxurious BMW X5. Perfect for families and business executives who demand comfort, performance, and prestige."
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
        features: ["Petrol Engine", "Cloth Seats", "Bluetooth", "Cruise Control", "Backup Camera", "USB Charging"],
        description: "Reliable and fuel-efficient, the Toyota Corolla is perfect for daily commuting and city driving. Low maintenance costs and excellent safety ratings."
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
        features: ["Petrol Engine", "Sport Seats", "Apple CarPlay", "Lane Assist", "Turbo Engine", "LED Lights"],
        description: "Sporty and efficient, the Honda Civic offers an exciting driving experience with modern technology and excellent fuel economy."
    }
};

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user, isLoading } = useAuth();
    const vehicle = vehicleData[id];

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
                        <p className="text-gray-300 mb-8">Please login to book a vehicle.</p>
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

    if (!vehicle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Vehicle Not Found</h1>
                        <p className="text-gray-300 mb-8">The vehicle you're looking for doesn't exist.</p>
                        <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                            Back to Marketplace
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return <BookNowContent vehicle={vehicle} vehicleId={id} />;
}

function BookNowContent({ vehicle, vehicleId }: { vehicle: any; vehicleId: string }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);
    const [loading, setLoading] = useState(false);

    // Calculate total days and price whenever dates change
    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDiff = end.getTime() - start.getTime();
            const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
            if (days > 0) {
                setTotalDays(days);
                setTotalPrice(days * vehicle.price);
                checkAvailability();
            } else {
                setTotalDays(0);
                setTotalPrice(0);
            }
        }
    }, [startDate, endDate, vehicle.price]);

    const checkAvailability = async () => {
        setLoading(true);
        // Simulate API call to check availability
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, always show as available unless vehicle is already rented
        setIsAvailable(vehicle.status !== "Rented");
        setLoading(false);
    };

    const handleProceedToPayment = () => {
        if (startDate && endDate && totalDays > 0 && isAvailable) {
            const bookingData = {
                vehicleId,
                startDate,
                endDate,
                totalDays,
                totalPrice,
                vehicle: {
                    name: vehicle.name,
                    year: vehicle.year,
                    price: vehicle.price,
                    image: vehicle.image
                }
            };
            
            // Store booking data in sessionStorage for contract page
            sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
            
            // Navigate to contract signing page
            window.location.href = `/marketplace/contract/${vehicleId}`;
        }
    };

    const getToday = () => {
        return new Date().toISOString().split('T')[0];
    };

    const getMinEndDate = () => {
        if (startDate) {
            const start = new Date(startDate);
            start.setDate(start.getDate() + 1);
            return start.toISOString().split('T')[0];
        }
        return getToday();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
            <Navbar />
            <main className="pt-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href={`/marketplace/viewdetails/${vehicleId}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Book Your Vehicle</h1>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Left Column - Vehicle Info & Date Selection */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Vehicle Summary */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex gap-6">
                                    <div className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {vehicle.year} {vehicle.name}
                                        </h2>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Fuel size={16} />
                                                {vehicle.fuel}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users size={16} />
                                                {vehicle.seats} Seats
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin size={16} />
                                                {vehicle.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Calendar size={20} />
                                    Select Rental Dates
                                </h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            min={getToday()}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                   focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={getMinEndDate()}
                                            disabled={!startDate}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                                                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                                   focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Availability Check */}
                                {startDate && endDate && (
                                    <div className="mt-6 p-4 rounded-lg border">
                                        {loading ? (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                Checking availability...
                                            </div>
                                        ) : isAvailable ? (
                                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                                                Vehicle is available for selected dates
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                                                Vehicle is not available for selected dates
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Vehicle Features */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vehicle Features</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {vehicle.features.map((feature: string, index: number) => (
                                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Price Summary */}
                        <div className="lg:sticky lg:top-32 h-fit">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                                
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Price Summary</h3>
                                
                                {/* Daily Rate */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600 dark:text-gray-400">Daily Rate</span>
                                    <span className="text-2xl font-bold text-blue-600">${vehicle.price}</span>
                                </div>

                                {/* Rental Period */}
                                {totalDays > 0 && (
                                    <div className="space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Start Date</span>
                                            <span className="text-gray-900 dark:text-white">{new Date(startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">End Date</span>
                                            <span className="text-gray-900 dark:text-white">{new Date(endDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Total Days</span>
                                            <span className="text-gray-900 dark:text-white font-medium">{totalDays} days</span>
                                        </div>
                                    </div>
                                )}

                                {/* Price Breakdown */}
                                {totalDays > 0 && (
                                    <div className="space-y-2 py-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">${vehicle.price} × {totalDays} days</span>
                                            <span className="text-gray-900 dark:text-white">${vehicle.price * totalDays}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Service fee</span>
                                            <span className="text-gray-900 dark:text-white">$0</span>
                                        </div>
                                    </div>
                                )}

                                {/* Total */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                                    </div>
                                </div>

                                {/* Proceed Button */}
                                <button
                                    onClick={handleProceedToPayment}
                                    disabled={!startDate || !endDate || totalDays === 0 || !isAvailable || loading}
                                    className="w-full mt-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2
                                           bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Proceed to Contract
                                    <ArrowRight size={20} />
                                </button>

                                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                                    You'll need to log in to complete this booking
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
