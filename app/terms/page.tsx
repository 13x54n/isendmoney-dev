import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function TermsPage() {
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
                <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-white">Terms of Service</h1>

                <div className="prose dark:prose-invert max-w-none space-y-6 text-neutral-600 dark:text-neutral-300">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using iSendMoney, you accept and agree to be bound by the terms and provision of this agreement.
                            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable
                            to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">2. Service Description</h2>
                        <p>
                            iSendMoney provides a digital platform for international money transfers. We reserve the right to modify, suspend,
                            or discontinue the service at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">3. User Responsibilities</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your account and password and for restricting access to
                            your computer, and you agree to accept responsibility for all activities that occur under your account or password.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">4. Transaction Limits and Fees</h2>
                        <p>
                            We reserve the right to impose limits on the amount of money you can send or receive through our service.
                            Fees for our services are subject to change and will be clearly displayed before you complete a transaction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">5. Intellectual Property</h2>
                        <p>
                            The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other
                            matters related to the Site are protected under applicable copyrights, trademarks and other proprietary
                            (including but not limited to intellectual property) rights.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
