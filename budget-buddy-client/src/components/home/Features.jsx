import React from 'react'
import categoryImg from "../../assets/category.png"
import trackingImg from "../../assets/tracking.png"
import analysisImg from "../../assets/analysis.png"
import planningImg from "../../assets/planning.png"
import {useInView} from 'react-intersection-observer'

const Features = () => {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
    return (
        <section id="#features" className="py-24">
            <div className="container mx-auto text-center">
                <div className='relative inline-block'>
                    <h2 className="text-4xl font-bold mb-12">Features</h2>
                    <hr ref={ref} className={`absolute bottom-10 h-[2px] bg-black transition-all duration-2000 ${inView ? "w-full": "w-0"}`} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="feature-item p-6 bg-white border rounded-lg shadow">
                        <img src={categoryImg} alt="Customizable Categories" className="mx-auto mb-4 h-16" />
                        <h3 className="text-2xl font-semibold mb-2">Customizable Categories</h3>
                        <p>Add, edit, or delete income and expense categories easily.</p>
                    </div>
                    <div className="feature-item p-6 bg-white border rounded-lg shadow">
                        <img src={trackingImg} alt="Daily Tracking" className="mx-auto mb-4 h-16" />
                        <h3 className="text-2xl font-semibold mb-2">Daily Tracking</h3>
                        <p>Record your daily income and expenses with ease.</p>
                    </div>
                    <div className="feature-item p-6 bg-white border rounded-lg shadow">
                        <img src={analysisImg} alt="Data Analysis" className="mx-auto mb-4 h-16" />
                        <h3 className="text-2xl font-semibold mb-2">Data Analysis</h3>
                        <p>Get insightful reports and visualizations of your spending patterns.</p>
                    </div>
                    <div className="feature-item p-6 bg-white border rounded-lg shadow">
                        <img src={planningImg} alt="Budget Planning" className="mx-auto mb-4 h-16" />
                        <h3 className="text-2xl font-semibold mb-2">Budget Planning</h3>
                        <p>Set budget limits and receive notifications to stay on track.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features