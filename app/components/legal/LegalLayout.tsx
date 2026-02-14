import { ReactNode } from 'react';

interface LegalLayoutProps {
    title: string;
    children: ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            <div className="prose prose-lg max-w-none">
                {children}
            </div>
        </div>
    );
}
