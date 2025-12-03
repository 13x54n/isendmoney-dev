import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function CareersPage() {
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
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Join Our Team</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Help us build the future of global finance.</p>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">No Open Positions</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        We currently don't have any open roles, but we're always looking for talented individuals.
                        Check back soon or send your resume to careers@isendmoney.com.
                    </p>
                    <NavbarButton href="mailto:careers@isendmoney.com" variant="primary">Email Us</NavbarButton>
                </div>
            </main>

            <Footer />
        </div>
    );
}
