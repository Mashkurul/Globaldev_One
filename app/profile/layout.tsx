"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        redirect("/auth/login");
    }

    return <>{children}</>;
}
