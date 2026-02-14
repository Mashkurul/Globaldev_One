export default function LegalLayout({
                                        title,
                                        children,
                                    }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-300 px-6 py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
                    {title}
                </h1>

                <div className="space-y-6 leading-relaxed text-base">
                    {children}
                </div>
            </div>
        </div>
    );
}