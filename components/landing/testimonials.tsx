import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "I've tried many remittance services, but iSendMoney is by far the fastest and cheapest. Highly recommended!",
        author: "Sarah Johnson",
        role: "Freelancer",
        rating: 5,
    },
    {
        quote: "The mobile app is so easy to use. I can send money to my family in seconds, and they receive it instantly.",
        author: "Michael Chen",
        role: "Expat",
        rating: 5,
    },
    {
        quote: "Great customer support and very transparent fees. I always know exactly how much my recipient will get.",
        author: "Elena Rodriguez",
        role: "Small Business Owner",
        rating: 4,
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Trusted by thousands
                    </h2>
                    <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
                        See what our customers are saying about us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-8 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-neutral-200 text-neutral-200"}`}
                                    />
                                ))}
                            </div>
                            <blockquote className="flex-1 text-lg text-neutral-700 dark:text-neutral-300 mb-6 font-medium leading-relaxed">
                                "{testimonial.quote}"
                            </blockquote>
                            <div>
                                <div className="font-bold">{testimonial.author}</div>
                                <div className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
