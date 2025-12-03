import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function SupportPage() {
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
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Contact Support</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">We're here to help. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="max-w-xl mx-auto bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Subject</label>
                            <select
                                id="subject"
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option>General Inquiry</option>
                                <option>Technical Support</option>
                                <option>Billing Question</option>
                                <option>Partnership</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                        <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Email Us</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">support@isendmoney.com</p>
                    </div>
                    <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                        <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Call Us</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">+1 (555) 123-4567</p>
                    </div>
                    <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/50">
                        <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Live Chat</h3>
                        <p className="text-neutral-600 dark:text-neutral-400">Available Mon-Fri, 9am-5pm EST</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
