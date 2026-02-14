"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/app/ui/input";
import { useAuth } from "@/app/contexts/AuthContext";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                router.push("/marketplace");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <Input 
                label="Email Address" 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
            />
            <Input 
                label="Password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
            />

            <div className="flex justify-between text-sm mb-6">
                <label className="flex items-center gap-2">
                    <input type="checkbox" disabled={isLoading} />
                    Remember me
                </label>

                <Link href="#" className="text-blue-500 hover:underline">
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-brand text-black font-semibold hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300 dark:bg-white/20" />
                <span className="px-4 text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300 dark:bg-white/20" />
            </div>

            <button
                type="button"
                disabled={isLoading}
                className="w-full py-3 rounded-xl border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition disabled:opacity-50"
            >
                Continue with Google
            </button>

            <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                    href="/auth/register"
                    className="text-blue-500 hover:underline"
                >
                    Create one
                </Link>
            </p>
        </form>
    );
}
