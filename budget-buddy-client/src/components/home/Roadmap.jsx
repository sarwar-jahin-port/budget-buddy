import React, { useEffect } from 'react';
import './Roadmap.css'; // Import the custom styles
import { useInView } from 'react-intersection-observer';

const Roadmap = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const steps = document.querySelectorAll('.step');
      const line = document.querySelector('.dashed-line');

      steps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add('visible');
          if (index === 0) {
            line.classList.add('visible');
          }
        }, (index + 1) * 1000); // delay each step's visibility
      });
    }
  }, [inView]);

  return (
    <section id="how-it-works" className="py-24 bg-green-100">
      <div className="container mx-auto text-center">
        <div className="relative inline-block">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <hr
            ref={ref}
            className={`absolute bottom-10 h-[2px] bg-black transition-all duration-2000 ${
              inView ? 'w-full' : 'w-0'
            }`}
          />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="dashed-line"></div>
          <div className="step step-1">
            <div className="w-full lg:w-1/2 text-center bg-white p-4 rounded shadow-md">
              <h3 className="text-2xl font-bold">1. Sign Up</h3>
              <p>Create an account to get started.</p>
            </div>
          </div>
          <div className="step step-2">
            <div className="w-full lg:w-1/2 text-center bg-white p-4 rounded shadow-md">
              <h3 className="text-2xl font-bold">2. Add Transactions</h3>
              <p>Log your income and expenses easily.</p>
            </div>
          </div>
          <div className="step step-3">
            <div className="w-full lg:w-1/2 text-center bg-white p-4 rounded shadow-md">
              <h3 className="text-2xl font-bold">3. Set Budgets</h3>
              <p>Define your budget limits.</p>
            </div>
          </div>
          <div className="step step-4">
            <div className="w-full lg:w-1/2 text-center bg-white p-4 rounded shadow-md">
              <h3 className="text-2xl font-bold">4. Analyze Data</h3>
              <p>Review your financial data and trends.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
