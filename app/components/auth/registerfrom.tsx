"use client";

import Link from "next/link";
import Input from "@/app/ui/input";

export default function RegisterForm() {
    return (
        <form className="space-y-2">

            <Input label="Full Name" required />
            <Input label="Email Address" type="email" required />
            <Input label="Password" type="password" required />
            <Input label="Confirm Password" type="password" required />

            <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-semibold hover:scale-105 transition-transform shadow-lg mt-4"
            >
                Create Account
            </button>

            <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="text-blue-500 hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
}