"use client";
import { useAuth } from "@/context/AuthContext";
import { ArrowUpRight, ArrowDownLeft, DollarSign, CreditCard } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();

    const stats = [
        {
            name: "Total Balance",
            value: "$12,345.00",
            change: "+2.5%",
            changeType: "positive",
            icon: DollarSign,
        },
        {
            name: "Total Sent",
            value: "$4,200.00",
            change: "+12%",
            changeType: "positive",
            icon: ArrowUpRight,
        },
        {
            name: "Total Received",
            value: "$1,100.00",
            change: "+4.3%",
            changeType: "positive",
            icon: ArrowDownLeft,
        },
        {
            name: "Active Cards",
            value: "2",
            change: "0",
            changeType: "neutral",
            icon: CreditCard,
        },
    ];

    const recentTransactions = [
        { id: 1, name: "Netflix Subscription", date: "Today, 12:42 PM", amount: "-$15.00", status: "Completed" },
        { id: 2, name: "Payment Received", date: "Yesterday, 4:30 PM", amount: "+$250.00", status: "Completed" },
        { id: 3, name: "Transfer to John", date: "Nov 28, 2025", amount: "-$120.00", status: "Completed" },
        { id: 4, name: "Spotify Premium", date: "Nov 25, 2025", amount: "-$9.99", status: "Pending" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Dashboard
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Welcome back, {user?.displayName?.split(" ")[0] || "User"}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                                <stat.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                            </div>
                            <span className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600 dark:text-green-400" :
                                    stat.changeType === "negative" ? "text-red-600 dark:text-red-400" :
                                        "text-neutral-600 dark:text-neutral-400"
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            {stat.name}
                        </h3>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                        Recent Transactions
                    </h2>
                </div>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.amount.startsWith("+")
                                        ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                        : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                                    }`}>
                                    {transaction.amount.startsWith("+") ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">{transaction.name}</p>
                                    <p className="text-sm text-neutral-500">{transaction.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-medium ${transaction.amount.startsWith("+")
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-neutral-900 dark:text-white"
                                    }`}>
                                    {transaction.amount}
                                </p>
                                <p className="text-sm text-neutral-500">{transaction.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
