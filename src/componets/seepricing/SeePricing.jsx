import React from 'react'
import './Seepricing.css'
import { IoIosCheckmark } from "react-icons/io";

export default function SeePricing() {
    const pricingPlans = [
        {
            title: "Free",
            price: "$0",
            description: "Perfect for small businesses looking to get started.",
            features: ["Basic Payroll Processing", "Limited Support", "Up to 5 Employees"],
        },
        {
            title: "Monthly",
            price: "$49/month",
            description: "Ideal for growing businesses with more employees.",
            features: ["Advanced Payroll Tools", "Tax Calculations", "Unlimited Employees", "24/7 Support"],
        },
        {
            title: "Yearly",
            price: "$499/year",
            description: "Best for scaling businesses that need premium features.",
            features: ["Priority Support", "Payroll Automation", "Custom Reports", "Dedicated Account Manager"],
        },
    ];

    return (
        <div className="min-h-[140vh] flex flex-col items-center text-center p-12 justify-center">
            <h1 className="text-5xl font-bold">Paysum Plus</h1>
            <p className="text-lg mt-4 max-w-2xl">
                Unlock Powerful Features and make payroll easier than ever! Whether you're just starting out or scaling, there's a plan for you.
            </p>
            <p className="text-md mt-2 max-w-2xl">
                By subscribing to a plan, you support the Paysum mission to make payroll accessible to everyone.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
                {pricingPlans.map((plan, index) => (
                    <div
                        key={index}
                        className="w-96 h-[500px] p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl opacity-100 flex flex-col justify-between"
                    >
                        <h3 className="text-3xl font-bold text-center">{plan.title}</h3>
                        <p className="text-4xl font-semibold text-center my-4">{plan.price}</p>
                        <p className="text-center text-lg mb-6">{plan.description}</p>

                        <div className="mt-4 space-y-3 flex-grow">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <IoIosCheckmark className="text-green-300 text-3xl" />
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </div>

                        <button className="mt-6 w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-all">
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
  )
}
