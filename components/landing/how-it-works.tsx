import { UserPlus, PenLine, Send } from "lucide-react";

const steps = [
    {
        title: "Create an Account",
        description: "Sign up for free in minutes. Verify your identity to ensure secure transactions.",
        icon: UserPlus,
    },
    {
        title: "Enter Details",
        description: "Choose your recipient and enter the amount you want to send. See our low fees upfront.",
        icon: PenLine,
    },
    {
        title: "Send Money",
        description: "Pay with your card or bank account. We'll handle the rest and keep you updated.",
        icon: Send,
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-white dark:bg-neutral-950">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        How it works
                    </h2>
                    <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
                        Sending money abroad is as easy as 1-2-3.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-neutral-200 dark:bg-neutral-800 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={step.title} className="flex flex-col items-center text-center">
                            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-neutral-950 border-4 border-neutral-100 dark:border-neutral-900 mb-6">
                                <step.icon className="h-10 w-10 text-primary" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
