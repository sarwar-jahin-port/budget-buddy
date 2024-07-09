import React from 'react'
import useAuth from '../hooks/useAuth'
import { MdVerifiedUser } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import TransactionForm from '../components/dashboard/transactions/TransactionForm';

const Summary = () => {
    const { user } = useAuth();
    return (
        <container className="w-full">
            <section className="user-info border flex justify-center text-lg gap-4">
                <div className="p-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center justify-center">
                    <div className="card bg-base-200 shadow-md p-4 w-full md:w-auto">
                        <p><span className='font-bold'>Name:</span> {user?.displayName ? user?.displayName : "Unknown"}</p>
                    </div>
                    <div className="card bg-base-200 shadow-md p-4 w-full md:w-auto">
                        <p><span className='font-bold'>Email:</span> {user?.email}</p>
                    </div>
                    <div className="card bg-base-200 shadow-md p-4 w-full md:w-auto">
                        <p className='flex justify-center items-center gap-1'><span className='font-bold'>Verified:</span> {user?.emailVerified ? <MdVerifiedUser /> : <IoIosWarning />}</p>
                    </div>
                </div>
            </section>
            <section className="transaction-form border">
                <TransactionForm />
            </section>
            <section className="important-notice border flex justify-between gap-10">
                <div className="budget-health border w-full flex flex-col justify-center items-center">
                    <div className="radial-progress text-green-600 text-3xl" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }} role="progressbar">70%</div>
                    <p className='text-2xl py-2'>Overall budget health</p>
                </div>
                <div className="take-action border p-32 w-full">Need to take action</div>
            </section>
            <div className="stock-update border p-32">
                Current booming and falling stocks update
            </div>
        </container>
    )
}

export default Summary