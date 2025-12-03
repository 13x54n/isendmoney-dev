import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";
import { CheckCircle2 } from "lucide-react";

export default function StatusPage() {
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
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">System Status</h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                        <CheckCircle2 className="w-5 h-5" />
                        All Systems Operational
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <span className="font-medium text-neutral-900 dark:text-white">Website & API</span>
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <span className="font-medium text-neutral-900 dark:text-white">Mobile App (iOS)</span>
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <span className="font-medium text-neutral-900 dark:text-white">Mobile App (Android)</span>
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <span className="font-medium text-neutral-900 dark:text-white">Payment Processing</span>
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <span className="font-medium text-neutral-900 dark:text-white">Customer Support</span>
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
