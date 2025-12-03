import { Navbar, NavBody, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/landing/footer";

export default function ExchangeRatesPage() {
    const rates = [
        { currency: "USD", name: "US Dollar", rate: "1.00", flag: "🇺🇸" },
        { currency: "EUR", name: "Euro", rate: "0.92", flag: "🇪🇺" },
        { currency: "GBP", name: "British Pound", rate: "0.79", flag: "🇬🇧" },
        { currency: "CAD", name: "Canadian Dollar", rate: "1.36", flag: "🇨🇦" },
        { currency: "AUD", name: "Australian Dollar", rate: "1.52", flag: "🇦🇺" },
        { currency: "JPY", name: "Japanese Yen", rate: "151.42", flag: "🇯🇵" },
        { currency: "CNY", name: "Chinese Yuan", rate: "7.23", flag: "🇨🇳" },
        { currency: "INR", name: "Indian Rupee", rate: "83.50", flag: "🇮🇳" },
        { currency: "MXN", name: "Mexican Peso", rate: "16.85", flag: "🇲🇽" },
        { currency: "BRL", name: "Brazilian Real", rate: "5.15", flag: "🇧🇷" },
    ];

    return (
        <div className="relative w-full min-h-screen flex flex-col bg-white dark:bg-neutral-950">
            <Navbar className="top-0 relative">
                <NavBody>
                    <NavbarLogo />
                    <div className="flex items-center gap-4">
                        <NavbarButton href="/" variant="secondary">Back to Home</NavbarButton>
                        <NavbarButton href="/login" variant="primary">Send Money Now</NavbarButton>
                    </div>
                </NavBody>
            </Navbar>

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Live Exchange Rates</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Check our competitive rates. Real-time updates every minute.</p>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900 dark:text-white">Currency</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900 dark:text-white">Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900 dark:text-white text-right">1 USD =</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-neutral-900 dark:text-white text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {rates.map((rate) => (
                                    <tr key={rate.currency} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{rate.flag}</span>
                                                <span className="font-medium text-neutral-900 dark:text-white">{rate.currency}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                                            {rate.name}
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-neutral-900 dark:text-white">
                                            {rate.rate}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium text-sm">Send</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-neutral-500">
                    * Rates are for indicative purposes only and subject to change. Actual rates may vary at the time of transaction.
                </p>
            </main>

            <Footer />
        </div>
    );
}
