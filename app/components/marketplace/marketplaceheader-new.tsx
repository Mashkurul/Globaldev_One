"use client";

export default function MarketplaceHeader() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center py-12 px-6 max-w-7xl mx-auto lg:justify-between gap-6 mb-12">

            <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-brand mb-2">
                    Vehicle Marketplace
                </h1>
                <p className="text-muted-foreground text-lg">
                    Find the perfect vehicle for your needs.
                </p>
            </div>

        </div>
    );
}
