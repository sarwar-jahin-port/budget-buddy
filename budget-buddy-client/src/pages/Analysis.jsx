import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    BarChart, Bar
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dummyData = [
    { date: '2024-06-01', income: 4000, expense: 2400 },
    { date: '2024-06-02', income: 3000, expense: 1398 },
    { date: '2024-06-03', income: 2000, expense: 9800 },
    { date: '2024-06-04', income: 2780, expense: 3908 },
    { date: '2024-06-05', income: 1890, expense: 4800 },
    { date: '2024-06-06', income: 2390, expense: 3800 },
    { date: '2024-06-07', income: 3490, expense: 4300 },
];

const pieData = [
    { name: 'Food', value: 400 },
    { name: 'Rent', value: 300 },
    { name: 'Utilities', value: 300 },
    { name: 'Entertainment', value: 200 },
];

const monthlyIncomeExpenseData = [
    { month: 'January', income: 5000, expense: 2000 },
    { month: 'February', income: 6000, expense: 2500 },
    { month: 'March', income: 7000, expense: 3000 },
    { month: 'April', income: 8000, expense: 3500 },
];

const categorySpendingData = [
    { name: 'Home Rent', value: 1000 },
    { name: 'Transport', value: 600 },
    { name: 'Food', value: 1200 },
    { name: 'Gym', value: 200 },
    { name: 'Travel', value: 800 },
    { name: 'Games', value: 300 },
];

const savingsData = [
    { month: 'January', savings: 3000 },
    { month: 'February', savings: 3500 },
    { month: 'March', savings: 4000 },
    { month: 'April', savings: 4500 },
];

const Analysis = () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Financial Analysis</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-40">

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Monthly Income vs Expense Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyIncomeExpenseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#82ca9d" />
                            <Bar dataKey="expense" fill="#ff7300" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                <section className="mb-8 p-4">
                    <h2 className="text-xl font-semibold mb-2">Category-Wise Spending Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={categorySpendingData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                                {categorySpendingData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Budget vs Actual Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categorySpendingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#ff7300" />
                            <Bar dataKey="budget" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Income Source Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Trend Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dummyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="expense" stroke="#ff7300" />
                        </LineChart>
                    </ResponsiveContainer>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Savings Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={savingsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="savings" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Expense Tag Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categorySpendingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#ff7300" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">High/Low Spending Periods</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dummyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="expense" stroke="#ff7300" />
                        </LineChart>
                    </ResponsiveContainer>
                </section>
            </div>
        </>
    );
};

export default Analysis;
