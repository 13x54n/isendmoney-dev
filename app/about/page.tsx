import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function AboutPage() {
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
                <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-white">About Us</h1>

                <div className="prose dark:prose-invert max-w-none space-y-6 text-neutral-600 dark:text-neutral-300">
                    <p className="text-lg leading-relaxed">
                        iSendMoney was founded with a simple mission: to make sending money globally as easy as sending a text message.
                        We believe that financial borders shouldn't exist in a connected world.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Our Story</h2>
                        <p>
                            Started in 2024, we recognized the frustration people faced with high fees, slow transfer times, and opaque exchange rates.
                            We set out to build a platform that prioritizes transparency, speed, and security. Today, we serve thousands of customers
                            across the globe, helping them support their families, pay for services, and grow their businesses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Our Values</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Transparency:</strong> No hidden fees. What you see is what you pay.</li>
                            <li><strong>Speed:</strong> We know your time is valuable. We strive for instant transfers.</li>
                            <li><strong>Security:</strong> Your money and data are protected by bank-grade security.</li>
                            <li><strong>Customer First:</strong> We are here to serve you, 24/7.</li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
