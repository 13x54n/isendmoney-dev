import { NavbarLogo } from "@/components/ui/resizable-navbar";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 pt-16 pb-8">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <NavbarLogo />
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
                            The fastest, most secure way to send money globally.
                            Licensed and regulated financial institution.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-neutral-400 hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-neutral-400 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-neutral-400 hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-neutral-400 hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Partners</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Licenses</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    <p>&copy; {new Date().getFullYear()} iSendMoney. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
