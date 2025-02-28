import React from 'react';
import PricingCard from './PricingCard';

// Reusable PricingCard Component

// Main Section Component
const PricingSection = () => {
  const plans = [
    {
      title: 'Basic',
      price: 'Free',
      description: 'Best option for personal use & for your next project.',
      features: [
        'Get a professionally structured CV',
        'Receive a tailored cover letter',
        'We’ll apply to 5 jobs on your behalf',
        'Perfect for trying out our services and getting a feel for our expertise',
      ],
      buttonText: 'Select Plan',
      isPopular: false,
    },
    {
      title: 'Premium',
      price: '£25',
      priceNote: '/ month',
      description: 'Best for large scale uses and extended redistribution.',
      features: [
        'Minimum of 50 job applications per month',
        'Unique and Professionally tailored CV, Cover Letter for each application',
        'Crafted follow-up emails to recruiters when available',
        'Dedicated support to ensure maximum visibility and impact',
        'Ongoing access to our expertise and resources',
        'Ideal for serious job seekers who want to maximize their chances',
      ],
      buttonText: 'Select Plan',
      isPopular: true,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="lg:grid lg:grid-cols-2 mx-auto gap-6">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
