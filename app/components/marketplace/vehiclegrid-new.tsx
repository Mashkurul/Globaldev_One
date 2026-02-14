"use client";

import { useState, useMemo } from "react";
import VehicleCard from "./vehiclecard";
import { Search, X, Filter } from "lucide-react";

const vehicles = [
    {
        id: "tesla-model-3",
        name: "Tesla Model 3",
        year: 2024,
        price: 85,
        status: "Available",
        fuel: "Electric",
        seats: 5,
        transmission: "Auto",
        category: "Sedan",
        model: "Premium",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    },
    {
        id: "bmw-x5",
        name: "BMW X5",
        year: 2023,
        price: 120,
        status: "Available",
        fuel: "Petrol",
        seats: 5,
        transmission: "Auto",
        category: "SUV",
        model: "Luxury",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54d",
    },
    {
        id: "toyota-corolla",
        name: "Toyota Corolla",
        year: 2022,
        price: 45,
        status: "Available",
        fuel: "Petrol",
        seats: 5,
        transmission: "Auto",
        category: "Sedan",
        model: "Economy",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
    },
    {
        id: "honda-civic",
        name: "Honda Civic",
        year: 2023,
        price: 48,
        status: "Rented",
        fuel: "Petrol",
        seats: 5,
        transmission: "Auto",
        category: "Sedan",
        model: "Sport",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    },
    {
        id: "ford-f150",
        name: "Ford F-150",
        year: 2023,
        price: 150,
        status: "Available",
        fuel: "Petrol",
        seats: 5,
        transmission: "Auto",
        category: "Truck",
        model: "Heavy Duty",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
    },
    {
        id: "mazda-cx5",
        name: "Mazda CX-5",
        year: 2024,
        price: 95,
        status: "Available",
        fuel: "Petrol",
        seats: 5,
        transmission: "Auto",
        category: "SUV",
        model: "Compact",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54d",
    },
];

interface Filters {
    search: string;
    category: string;
    model: string;
    priceRange: string;
    status: string;
    fuel: string;
}

export default function VehicleGrid() {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        search: "",
        category: "",
        model: "",
        priceRange: "",
        status: "",
        fuel: "",
    });

    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            // Search filter
            if (filters.search && !vehicle.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // Category filter
            if (filters.category && vehicle.category !== filters.category) {
                return false;
            }

            // Model filter
            if (filters.model && vehicle.model !== filters.model) {
                return false;
            }

            // Price range filter
            if (filters.priceRange) {
                if (filters.priceRange === "150+") {
                    if (vehicle.price < 150) return false;
                } else {
                    const [min, max] = filters.priceRange.split("-").map(Number);
                    if (vehicle.price < min || vehicle.price > max) {
                        return false;
                    }
                }
            }

            // Status filter
            if (filters.status && vehicle.status !== filters.status) {
                return false;
            }

            // Fuel filter
            if (filters.fuel && vehicle.fuel !== filters.fuel) {
                return false;
            }

            return true;
        });
    }, [filters]);

    const handleFilterChange = (key: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            category: "",
            model: "",
            priceRange: "",
            status: "",
            fuel: "",
        });
    };

    const activeFiltersCount = Object.values(filters).filter(value => value !== "").length;

    return (
        <div>
            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search make, model..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 dark:border-gray-600
                               bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-white/20
                           hover:bg-gray-100 dark:hover:bg-white/10 transition relative"
                >
                    <Filter size={20} />
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>

                {/* Clear Filters Button */}
                {activeFiltersCount > 0 && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-300 dark:border-red-500/20
                               hover:bg-red-50 dark:hover:bg-red-500/10 transition text-red-600 dark:text-red-400"
                    >
                        <X size={20} />
                        <span>Clear</span>
                    </button>
                )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="bg-gray-900 dark:bg-gray-900 rounded-xl p-6 mb-8 border border-gray-700 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange("category", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-600 dark:border-gray-600
                                       bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">All Categories</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Truck">Truck</option>
                            </select>
                        </div>

                        {/* Model Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Model
                            </label>
                            <select
                                value={filters.model}
                                onChange={(e) => handleFilterChange("model", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-600 dark:border-gray-600
                                       bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">All Models</option>
                                <option value="Economy">Economy</option>
                                <option value="Compact">Compact</option>
                                <option value="Sport">Sport</option>
                                <option value="Premium">Premium</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Heavy Duty">Heavy Duty</option>
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Price Range ($/day)
                            </label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-600 dark:border-gray-600
                                       bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Any Price</option>
                                <option value="0-50">$0 - $50</option>
                                <option value="50-100">$50 - $100</option>
                                <option value="100-150">$100 - $150</option>
                                <option value="150+">$150+</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Availability
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange("status", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-600 dark:border-gray-600
                                       bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">All Status</option>
                                <option value="Available">Available</option>
                                <option value="Rented">Rented</option>
                            </select>
                        </div>

                        {/* Fuel Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Fuel Type
                            </label>
                            <select
                                value={filters.fuel}
                                onChange={(e) => handleFilterChange("fuel", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-600 dark:border-gray-600
                                       bg-gray-800 dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">All Fuel Types</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Diesel">Diesel</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-end">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">{filteredVehicles.length}</span> vehicles found
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Vehicle Grid */}
            {filteredVehicles.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredVehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-4">No vehicles found matching your criteria</div>
                    <button
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
