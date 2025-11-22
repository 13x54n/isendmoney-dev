import {
    Zap,
    Shield,
    Globe,
    Smartphone,
    CreditCard,
    Headphones
} from "lucide-react";

const features = [
    {
        name: "Instant Transfers",
        description: "Send money in seconds to mobile wallets and bank accounts worldwide.",
        icon: Zap,
    },
    {
        name: "Bank-Level Security",
        description: "Your money is protected by industry-leading encryption and fraud prevention.",
        icon: Shield,
    },
    {
        name: "Global Reach",
        description: "Send to over 150 countries with our extensive network of local partners.",
        icon: Globe,
    },
    {
        name: "Mobile First",
        description: "Manage your transfers on the go with our top-rated mobile app.",
        icon: Smartphone,
    },
    {
        name: "Low Fees",
        description: "Save up to 90% compared to banks with our transparent, low-fee structure.",
        icon: CreditCard,
    },
    {
        name: "24/7 Support",
        description: "Our dedicated support team is always here to help you, day or night.",
        icon: Headphones,
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Why choose iSendMoney?
                    </h2>
                    <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
                        We make international money transfers simple, secure, and affordable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="relative p-8 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.name}</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
