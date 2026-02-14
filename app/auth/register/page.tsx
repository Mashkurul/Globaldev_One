import AuthLayout from "@/app/components/auth/authlayout";
import RegisterForm from "@/app/components/auth/registerfrom";

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the premium luxury rental experience"
        >
            <RegisterForm />
        </AuthLayout>
    );
}