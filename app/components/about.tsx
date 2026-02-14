import { ShieldCheck, Cog, TrendingUp, Eye } from "lucide-react";

const values = [
    { icon: ShieldCheck, title: "Reduce Fraud", desc: "Identity verification and risk scoring stop bad actors before they cause damage. Protect your fleet and your customers." },
    { icon: Cog, title: "Simplify Operations", desc: "Automate contracts, payments, reporting, and compliance. Spend less time on paperwork, more time growing your business." },
    { icon: TrendingUp, title: "Increase Revenue", desc: "Reach more customers through the shared marketplace. Optimize pricing, reduce downtime, and maximize fleet utilization." },
];

const AboutSection = () => (
    <section id="about" className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-heading text-3xl font-bold text-foreground text-brand md:text-4xl">
                    Our Vision
                </h2>
                <p className="mt-6 font-body text-lg text-muted-foreground leading-relaxed">
                    We believe the vehicle rental industry deserves better. Better technology, better trust, better outcomes for everyone involved. GLOBALDEV ONE™ is building the infrastructure for a transparent, secure, and efficient rental ecosystem — one where businesses thrive and customers feel safe.
                </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
                {values.map((v) => (
                    <div key={v.title} className="rounded-xl border border-border/50  bg-card p-8 text-center transition-all hover:border-primary/30">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                            <v.icon size={28} className="text-primary" />
                        </div>
                        <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{v.title}</h3>
                        <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-20 mx-auto max-w-2xl rounded-xl border border-border/50 bg-gradient-card p-10 text-center">
                <Eye size={32} className="mx-auto text-primary" />
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">A Trusted Ecosystem</h3>
                <p className="mt-3 font-body text-muted-foreground leading-relaxed">
                    Our mission is to create a world where renting a vehicle is as trusted and seamless as booking a flight. Where every identity is verified, every transaction is transparent, and every business has the tools to succeed.
                </p>
            </div>
        </div>
    </section>
);

export default AboutSection;
