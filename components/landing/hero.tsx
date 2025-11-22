import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-48 md:pb-32">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        Zero fees on your first transfer
                    </div>

                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
                        Send Money Globally, <br className="hidden sm:block" />
                        <span className="text-primary">Instantly & Securely.</span>
                    </h1>

                    <p className="max-w-[42rem] leading-normal text-neutral-500 sm:text-xl sm:leading-8 dark:text-neutral-400">
                        The fastest way to send money to your loved ones abroad.
                        Bank-beating exchange rates, low fees, and bank-level security.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" className="h-12 px-8 text-base">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                            View Exchange Rates
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center justify-center gap-8 text-neutral-500 dark:text-neutral-400 text-sm">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5" />
                            <span>Bank-level Security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            <span>Instant Transfers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            <span>150+ Countries</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-neutral-950">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
                <div className="absolute bottom-auto left-0 right-auto top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(80,227,194,0.5)] opacity-50 blur-[80px]"></div>
            </div>
        </section>
    );
}
