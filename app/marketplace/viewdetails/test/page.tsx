export default function SimpleTestPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Simple Test</h1>
            <p className="text-xl">This is a static test page</p>
            <p className="text-gray-300 mt-4">If you can see this at /marketplace/viewdetails/test, basic routing works.</p>
            <a href="/marketplace" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Back to Marketplace
            </a>
        </div>
    );
}
