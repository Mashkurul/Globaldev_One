"use client";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    const footerLinks = {
        product: [
            { name: "Features", href: "#features" },
            { name: "How It Works", href: "#how-it-works" },
            { name: "About", href: "#about" },
        ],
        company: [
            { name: "About Us", href: "#about" },
            { name: "Careers", href: "#" },
            { name: "Contact", href: "#" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/legal/privacy" },
            { name: "Terms of Service", href: "/legal/terms" },
        ],
        social: [
            { name: "GitHub", href: "#", icon: Github },
            { name: "Twitter", href: "#", icon: Twitter },
            { name: "LinkedIn", href: "#", icon: Linkedin },
        ]
    };
    return (
        <footer className="border-t border-border bg-background/50 backdrop-blur-sm px-6 md:px-12 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-5 gap-10">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3 className="text-foreground font-bold mb-4 text-xl">
                            GLOBALDEV <span className="text-primary">ONE™</span>
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            The trusted vehicle rental marketplace worldwide. Building the future of mobility with transparency and security.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                <Mail size={16} />
                                <span className="text-sm">contact@globaldevone.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                <Phone size={16} />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                <MapPin size={16} />
                                <span className="text-sm">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 mb-6">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Social Links */}
                        <div>
                            <h4 className="text-foreground font-semibold mb-3">Follow Us</h4>
                            <div className="flex gap-3">
                                {footerLinks.social.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                                        aria-label={social.name}
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} GLOBALDEV ONE™. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Built with ❤️ for the future of mobility</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
