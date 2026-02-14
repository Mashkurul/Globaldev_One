
"use client";
import Image from "next/image"
import { MapPin, Calendar, CheckCircle } from "lucide-react"
import Navbar from "@/app/components/Navbar"

// Vehicle data - in a real app this would come from a database
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

export default function CarDetailsPage({ params }: { params: { id: string } }) {
    const vehicle = vehicleData[params.id];

    if (!vehicle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                <Navbar />
                <main className="pt-28 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Vehicle Not Found</h1>
                        <p className="text-gray-300 mb-8">The vehicle you're looking for doesn't exist.</p>
                        <a href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                            Back to Marketplace
                        </a>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
            <Navbar />
            <main className="pt-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen">

                {/* HERO IMAGE */}
                <section className="max-w-7xl mx-auto px-6">
                    <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl">
                        <Image
                            src={vehicle.image as string}
                            alt={vehicle.name}
                            fill
                            priority
                            className="object-cover"
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        {/* title overlay */}
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-sm opacity-80">{vehicle.category}</p>
                            <h1 className="text-4xl font-bold">{vehicle.year} {vehicle.name}</h1>
                        </div>
                    </div>
                </section>

                {/* CONTENT */}
                <section className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-10">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* INFO CARD */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2 text-gray-500 mb-4">
                                <MapPin size={18} />
                                {vehicle.location}
                            </div>

                            <div className="grid grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="text-gray-400">License Plate</p>
                                    <p className="font-semibold">{vehicle.licensePlate}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">VIN</p>
                                    <p className="font-semibold">{vehicle.vin}</p>
                                </div>
                            </div>
                        </div>

                        {/* FEATURES */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-semibold mb-6">Features</h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {vehicle.features.map((feature: string) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                                    >
                                        <CheckCircle size={18} className="text-blue-600" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {vehicle.description}
                            </p>
                        </div>
                    </div>

                    {/* BOOKING CARD */}
                    <div className="lg:sticky lg:top-32 h-fit">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">

                            <div className="mb-6">
                                <p className="text-3xl font-bold text-blue-600">${vehicle.price}</p>
                                <p className="text-gray-500 text-sm">per day</p>
                            </div>

                            {/* DATE SELECTOR */}
                            <div className="flex items-center gap-3 border rounded-xl p-3 mb-6">
                                <Calendar size={18} />
                                <span className="text-sm">Feb 14, 2026 — Feb 17, 2026</span>
                            </div>

                            {/* PRICE SUMMARY */}
                            <div className="space-y-2 text-sm mb-6">
                                <div className="flex justify-between">
                                    <span>${vehicle.price} × 3 days</span>
                                    <span>${vehicle.price * 3}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Service fee</span>
                                    <span>$0</span>
                                </div>

                                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                                    <span>Total</span>
                                    <span>${vehicle.price * 3}</span>
                                </div>
                            </div>

                            <button className={`w-full py-3 rounded-xl font-semibold transition ${
                                vehicle.status === "Available"
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`} disabled={vehicle.status !== "Available"}>
                                {vehicle.status === "Available" ? "Book Now" : "Currently Rented"}
                            </button>

                            <p className="text-xs text-center text-gray-500 mt-3">
                                You'll need to log in to complete this booking
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
