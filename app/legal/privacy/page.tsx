import LegalLayout from "@/app/components/legal/LegalLayout";

export default function PrivacyPolicy() {
    return (
        <LegalLayout title="Privacy Policy">
            <p>Last updated: February 2026</p>

            <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
            <p>
                Welcome to VehicleRent. We respect your privacy and are committed to
                protecting your personal information. This Privacy Policy explains how
                we collect, use, and safeguard your information when you use our
                platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8">2. Information We Collect</h2>
            <p>We may collect the following information:</p>
            <ul className="list-disc ml-6">
                <li>Full name, email address, phone number</li>
                <li>Government-issued identification for verification</li>
                <li>Payment and billing information</li>
                <li>Booking and rental history</li>
                <li>Device and usage data</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">3. How We Use Your Information</h2>
            <p>Your information is used to:</p>
            <ul className="list-disc ml-6">
                <li>Verify your identity</li>
                <li>Process bookings and payments</li>
                <li>Improve our services</li>
                <li>Provide customer support</li>
                <li>Ensure platform security</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">4. Data Protection</h2>
            <p>
                We implement industry-standard security measures to protect your data.
                Payment transactions are encrypted and processed through secure third-party providers.
            </p>

            <h2 className="text-2xl font-semibold mt-8">5. Sharing of Information</h2>
            <p>
                We do not sell your personal data. We may share information with:
            </p>
            <ul className="list-disc ml-6">
                <li>Vehicle owners for booking fulfillment</li>
                <li>Payment processors</li>
                <li>Legal authorities when required by law</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">6. Your Rights</h2>
            <p>
                You may request access, correction, or deletion of your personal data
                by contacting us.
            </p>

            <h2 className="text-2xl font-semibold mt-8">7. Contact Us</h2>
            <p>
                If you have questions regarding this Privacy Policy, please contact us at:
                support@vehiclerent.com
            </p>
        </LegalLayout>
    );
}