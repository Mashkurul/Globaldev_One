export default function Stats() {
    const stats = [
        { value: "10K+", label: "Vehicles Listed" },
        { value: "99.9%", label: "Uptime" },
        { value: "500+", label: "Businesses" },
        { value: "1M+", label: "Rentals Processed" },
    ];

    return (
        <section className="px-6 md:px-12 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-900 p-10 rounded-2xl">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <h2 className="text-3xl font-bold text-teal-400">{stat.value}</h2>
                            <p className="text-gray-400 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
