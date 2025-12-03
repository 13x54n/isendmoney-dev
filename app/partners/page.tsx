import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function PartnersPage() {
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
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Our Partners</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">We work with the best to provide you with the best service.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Global Banks</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            We partner with major international banks to ensure your money reaches its destination safely and quickly.
                        </p>
                    </div>
                    <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Payment Processors</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Our payment processing partners help us accept a wide range of payment methods, including credit cards and bank transfers.
                        </p>
                    </div>
                    <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Security Firms</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            We work with leading security firms to audit our systems and ensure your data is always protected.
                        </p>
                    </div>
                    <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Regulators</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            We work closely with financial regulators in every country we operate in to ensure full compliance with local laws.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Become a Partner</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        Interested in partnering with iSendMoney? We'd love to hear from you.
                    </p>
                    <NavbarButton href="mailto:partners@isendmoney.com" variant="primary">Contact Partnerships</NavbarButton>
                </div>
            </main>

            <Footer />
        </div>
    );
}
