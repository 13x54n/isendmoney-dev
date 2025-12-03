import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function PressPage() {
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
                <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-white">Press & Media</h1>

                <div className="space-y-8">
                    <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">November 20, 2024</span>
                        <h2 className="text-2xl font-semibold mt-2 mb-3 text-neutral-900 dark:text-white">iSendMoney Launches Global Platform</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            Today marks the official launch of iSendMoney, a revolutionary platform designed to simplify international money transfers.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline font-medium">Read More &rarr;</a>
                    </div>

                    <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">October 15, 2024</span>
                        <h2 className="text-2xl font-semibold mt-2 mb-3 text-neutral-900 dark:text-white">iSendMoney Secures Series A Funding</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                            We are excited to announce that we have raised $10M in Series A funding to accelerate our growth and product development.
                        </p>
                        <a href="#" className="text-blue-600 hover:underline font-medium">Read More &rarr;</a>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                    <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Media Contact</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        For press inquiries, please contact <a href="mailto:press@isendmoney.com" className="text-blue-600 hover:underline">press@isendmoney.com</a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
