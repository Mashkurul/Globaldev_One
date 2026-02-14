import LegalLayout from "@/app/components/legal/LegalLayout";

export default function TermsPage() {
    return (
        <LegalLayout title="Terms & Conditions">
            <p>Last updated: February 2026</p>

            <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
            <p>
                By accessing or using VehicleRent, you agree to comply with and be
                bound by these Terms & Conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-8">2. Eligibility</h2>
            <p>
                You must be at least 18 years old and possess a valid driver's license
                to use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8">3. Account Responsibility</h2>
            <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities under your account.
            </p>

            <h2 className="text-2xl font-semibold mt-8">4. Booking & Payments</h2>
            <p>
                All bookings are subject to availability. Payments must be completed
                through our secure payment system before confirmation.
            </p>

            <h2 className="text-2xl font-semibold mt-8">5. Cancellations & Refunds</h2>
            <p>
                Cancellation policies may vary depending on the vehicle owner. Refund
                eligibility will be determined based on the specific booking terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8">6. Prohibited Use</h2>
            <ul className="list-disc ml-6">
                <li>Driving under the influence of alcohol or drugs</li>
                <li>Illegal activities using rented vehicles</li>
                <li>Providing false identity information</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">7. Limitation of Liability</h2>
            <p>
                VehicleRent is not liable for indirect, incidental, or consequential
                damages arising from the use of our platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8">8. Modifications</h2>
            <p>
                We reserve the right to update these Terms at any time. Continued use
                of the platform constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8">9. Contact</h2>
            <p>
                For inquiries regarding these Terms, contact:
                support@vehiclerent.com
            </p>
        </LegalLayout>
    );
}