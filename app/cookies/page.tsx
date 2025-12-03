import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function CookiesPage() {
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
                <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-white">Cookie Policy</h1>

                <div className="prose dark:prose-invert max-w-none space-y-6 text-neutral-600 dark:text-neutral-300">
                    <p>
                        This Cookie Policy explains how iSendMoney uses cookies and similar technologies to recognize you when you visit our website.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">What are cookies?</h2>
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Why do we use cookies?</h2>
                        <p>
                            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics and other purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">Types of Cookies We Use</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our Website.</li>
                            <li><strong>Performance and Functionality Cookies:</strong> These are used to enhance the performance and functionality of our Website but are non-essential to their use.</li>
                            <li><strong>Analytics and Customization Cookies:</strong> These collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</li>
                            <li><strong>Advertising Cookies:</strong> These are used to make advertising messages more relevant to you.</li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
