"use client";

import AuthLayout from "@/app/components/auth/authlayout";
import LoginForm from "@/app/components/auth/loginfrom";

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue your premium journey"
        >
            <LoginForm />
        </AuthLayout>
    );
}
