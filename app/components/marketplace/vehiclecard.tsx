"use client";

import Image from "next/image";
import Link from "next/link";

export default function VehicleCard({ vehicle }: any) {
    // Use the vehicle.id from the data structure
    const vehicleId = vehicle.id || vehicle.name.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="group rounded-2xl overflow-hidden border border-border
    bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            {/* Image */}
            <div className="relative h-48">
                <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-5">

                {/* Status + Price */}
                <div className="flex justify-between items-center mb-2">
          <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                  vehicle.status === "Available"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
              }`}
          >
            {vehicle.status}
          </span>

                    <span className="text-primary font-semibold">
            ${vehicle.price}/day
          </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-foreground">
                    {vehicle.year} {vehicle.name}
                </h3>

                {/* Specs */}
                <div className="text-sm text-muted-foreground flex gap-4 mt-2">
                    <span>{vehicle.fuel}</span>
                    <span>{vehicle.seats} Seats</span>
                    <span>{vehicle.transmission}</span>
                </div>

                {/* Button */}
                <Link href={`/marketplace/viewdetails/${vehicleId}`} className="mt-4 block w-full py-2 rounded-xl bg-brand text-black hover:bg-primary/90 transition-colors text-center">View Details</Link>
                                                </div>
        </div>
    );
}