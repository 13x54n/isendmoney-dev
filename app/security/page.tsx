import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="relative w-full min-h-screen flex flex-col bg-white dark:bg-neutral-950">
            <Navbar className="top-0 relative">
                <NavBody>
                    <NavbarLogo />
                    <div className="flex items-center gap-4">
                        <NavbarButton href="/" variant="secondary">Back to Home</NavbarButton>
                    </div>
                </NavBody>
            </Navbar>

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Your Security is Our Priority</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        We use bank-level security measures to protect your money and personal information.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg h-fit">
                            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Bank-Grade Encryption</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                We use 256-bit SSL encryption to protect your data in transit and at rest. This is the same level of security used by major banks.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg h-fit">
                            <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Two-Factor Authentication</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Add an extra layer of security to your account with 2FA. We support SMS and authenticator apps.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg h-fit">
                            <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Fraud Monitoring</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Our automated systems monitor transactions 24/7 for suspicious activity to prevent fraud before it happens.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg h-fit">
                            <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Secure Data Storage</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Your personal data is stored in secure, access-controlled data centers with redundant backups.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
