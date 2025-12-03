import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPage() {
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
                <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-white">Privacy Policy</h1>

                <div className="prose dark:prose-invert max-w-none space-y-6 text-neutral-600 dark:text-neutral-300">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create or modify your account, request on-demand
                            services, contact customer support, or otherwise communicate with us. This information may include: name, email,
                            phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery
                            notes, and other information you choose to provide.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, such as to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Process payments and facilitate money transfers.</li>
                            <li>Send receipts and transaction updates.</li>
                            <li>Verify your identity and prevent fraud.</li>
                            <li>Respond to your comments, questions, and requests.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">3. Information Sharing</h2>
                        <p>
                            We may share the information we collect about you as described in this Statement or as described at the time of
                            collection or sharing, including as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>With third party service providers to enable them to provide the Services you request.</li>
                            <li>With the general public if you submit content in a public forum, such as blog comments, social media posts, or other features of our Services that are viewable by the general public.</li>
                            <li>With third parties with whom you choose to let us share information, for example other apps or websites that integrate with our API or Services, or those with an API or Service with which we integrate.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">4. Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access,
                            disclosure, alteration and destruction.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
