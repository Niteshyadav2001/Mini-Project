import React from 'react';

const features = [
  {
    title: 'Transfer Money',
    desc: 'Instantly send money to anyone. Fast, secure and easy.',
    extra: 'Supports UPI, NEFT, RTGS and wallet transfers.',
    icon: '💸',
  },
  {
    title: 'Recharge',
    desc: 'Quick mobile, DTH and broadband recharge.',
    extra: 'All operators supported with instant confirmation.',
    icon: '📱',
  },
  {
    title: 'Tax Saver Funds',
    desc: 'Save taxes while you invest smartly.',
    extra: 'Get benefits under section 80C.',
    icon: '💰',
  },
  {
    title: 'Track Your Expenses',
    desc: 'Monitor your daily, weekly, and monthly expenses.',
    extra: 'Automatic categorization and budgeting tools.',
    icon: '📊',
  },
  {
    title: 'Investment Ideas',
    desc: 'Explore expert investment tips and strategies.',
    extra: 'Updated regularly by market analysts.',
    icon: '💡',
  },
  {
    title: 'Futures & Options',
    desc: 'Trade in F&O with low brokerage.',
    extra: 'Advanced tools and real-time market data.',
    icon: '📈',
  },
];

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">
        Finance Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700/20 p-8 rounded-2xl min-h-[220px] flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-700/30"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
                {feature.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                {feature.desc}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {feature.extra}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;