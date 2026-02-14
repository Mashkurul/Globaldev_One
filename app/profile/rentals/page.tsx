"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, MapPin, Star, Download, ChevronRight, Check, X, Clock } from "lucide-react";

export default function RentalHistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date");

    const rentals = [
        {
            id: "RNT-2024-001",
            vehicle: "Tesla Model 3",
            vehicleImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
            startDate: "2026-02-10",
            endDate: "2026-02-12",
            location: "New York, NY",
            pickupLocation: "JFK Airport",
            dropoffLocation: "Manhattan Downtown",
            totalAmount: 255,
            status: "completed",
            rating: 5,
            paymentMethod: "Credit Card ending in 4242",
            insurance: "Premium Coverage",
            additionalDrivers: 0,
            review: "Excellent vehicle, very clean and well-maintained. Pickup process was smooth."
        },
        {
            id: "RNT-2024-002",
            vehicle: "BMW X5",
            vehicleImage: "https://images.unsplash.com/photo-1555215695-3004980ad54d",
            startDate: "2026-01-25",
            endDate: "2026-01-28",
            location: "Los Angeles, CA",
            pickupLocation: "LAX Airport",
            dropoffLocation: "Beverly Hills",
            totalAmount: 360,
            status: "completed",
            rating: 4,
            paymentMethod: "Credit Card ending in 4242",
            insurance: "Basic Coverage",
            additionalDrivers: 1,
            review: "Great SUV, perfect for family trip. Customer service was helpful."
        },
        {
            id: "RNT-2024-003",
            vehicle: "Toyota Corolla",
            vehicleImage: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
            startDate: "2025-12-15",
            endDate: "2025-12-17",
            location: "Chicago, IL",
            pickupLocation: "O'Hare Airport",
            dropoffLocation: "Downtown Chicago",
            totalAmount: 135,
            status: "cancelled",
            rating: null,
            paymentMethod: "Credit Card ending in 4242",
            insurance: "Basic Coverage",
            additionalDrivers: 0,
            review: null,
            cancellationReason: "Flight cancelled due to weather"
        },
        {
            id: "RNT-2024-004",
            vehicle: "Honda Civic",
            vehicleImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
            startDate: "2025-11-20",
            endDate: "2025-11-22",
            location: "Miami, FL",
            pickupLocation: "Miami International Airport",
            dropoffLocation: "South Beach",
            totalAmount: 144,
            status: "completed",
            rating: 5,
            paymentMethod: "Credit Card ending in 4242",
            insurance: "Premium Coverage",
            additionalDrivers: 0,
            review: "Perfect car for city driving. Fuel efficient and comfortable."
        }
    ];

    const filteredAndSortedRentals = rentals
        .filter(rental => {
            const matchesSearch = rental.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                rental.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                rental.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || rental.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "date":
                    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                case "amount":
                    return b.totalAmount - a.totalAmount;
                case "vehicle":
                    return a.vehicle.localeCompare(b.vehicle);
                default:
                    return 0;
            }
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-900/50 text-green-400";
            case "cancelled": return "bg-red-900/50 text-red-400";
            case "active": return "bg-blue-900/50 text-blue-400";
            default: return "bg-gray-900/50 text-gray-400";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return <Check size={12} />;
            case "cancelled": return <X size={12} />;
            case "active": return <Clock size={12} />;
            default: return null;
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
                    <h1 className="text-4xl font-bold text-white mb-2">Rental History</h1>
                    <p className="text-gray-400">View and manage all your past and current rentals</p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">Total Rentals</span>
                            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <Calendar size={16} className="text-blue-400" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{rentals.length}</p>
                        <p className="text-sm text-gray-400">All time</p>
                    </div>
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">Completed</span>
                            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                                <Check size={16} className="text-green-400" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{rentals.filter(r => r.status === "completed").length}</p>
                        <p className="text-sm text-gray-400">Successful rentals</p>
                    </div>
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">Total Spent</span>
                            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                <span className="text-purple-400 text-sm font-bold">$</span>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            ${rentals.filter(r => r.status === "completed").reduce((sum, r) => sum + r.totalAmount, 0)}
                        </p>
                        <p className="text-sm text-gray-400">Lifetime spending</p>
                    </div>
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">Avg Rating</span>
                            <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                                <Star size={16} className="text-yellow-400" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">
                            {rentals.filter(r => r.rating).length > 0 
                                ? (rentals.filter(r => r.rating).reduce((sum, r) => sum + r.rating!, 0) / rentals.filter(r => r.rating).length).toFixed(1)
                                : "N/A"
                            }
                        </p>
                        <p className="text-sm text-gray-400">Your average rating</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-800">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by vehicle, location, or rental ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="active">Active</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="amount">Sort by Amount</option>
                                <option value="vehicle">Sort by Vehicle</option>
                            </select>
                            <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center gap-2">
                                <Filter size={16} />
                                More Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rentals List */}
                <div className="space-y-6">
                    {filteredAndSortedRentals.map((rental) => (
                        <div key={rental.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Vehicle Image */}
                                    <div className="lg:w-48">
                                        <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                            <img
                                                src={rental.vehicleImage}
                                                alt={rental.vehicle}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Rental Details */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-1">{rental.vehicle}</h3>
                                                <p className="text-sm text-gray-400 mb-2">Rental ID: {rental.id}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {rental.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-white">${rental.totalAmount}</p>
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(rental.status)}`}>
                                                    {getStatusIcon(rental.status)}
                                                    {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Additional Details */}
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Pickup:</span>
                                                    <span className="text-white">{rental.pickupLocation}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Drop-off:</span>
                                                    <span className="text-white">{rental.dropoffLocation}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Payment:</span>
                                                    <span className="text-white">{rental.paymentMethod}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Insurance:</span>
                                                    <span className="text-white">{rental.insurance}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Additional Drivers:</span>
                                                    <span className="text-white">{rental.additionalDrivers}</span>
                                                </div>
                                                {rental.rating && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-400">Your Rating:</span>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={14}
                                                                    className={i < rental.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Review */}
                                        {rental.review && (
                                            <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-gray-300 italic">"{rental.review}"</p>
                                            </div>
                                        )}

                                        {/* Cancellation Reason */}
                                        {rental.cancellationReason && (
                                            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-red-300">
                                                    <strong>Cancellation Reason:</strong> {rental.cancellationReason}
                                                </p>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
                                                View Details
                                                <ChevronRight size={16} />
                                            </button>
                                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2">
                                                <Download size={16} />
                                                Download Receipt
                                            </button>
                                            {rental.status === "completed" && !rental.review && (
                                                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                                                    Leave Review
                                                </button>
                                            )}
                                            {rental.status === "cancelled" && (
                                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                                    Book Again
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAndSortedRentals.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No rentals found</h3>
                        <p className="text-gray-400">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
