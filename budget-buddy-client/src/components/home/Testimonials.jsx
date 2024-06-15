import React from 'react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="testimonial bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-lg italic mb-4">"BudgetBuddy has transformed the way I manage my finances. It's intuitive and easy to use!"</p>
            <cite className="block text-right text-sm text-gray-600">- Jane Doe</cite>
          </div>
          <div className="testimonial bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-lg italic mb-4">"I love the data analysis features. It's so helpful to see where my money goes each month."</p>
            <cite className="block text-right text-sm text-gray-600">- John Smith</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
