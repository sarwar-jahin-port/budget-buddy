import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TransactionForm = ({ onSubmit }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateChange = (date) => {
        setDate(date);
        setValue('date', date);
        setShowCalendar(false);
    };

    const onFormSubmit = (data) => {
        onSubmit(data);
    };

    useEffect(() => {
        const now = new Date();
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5); // Format to HH:MM
        setTime(currentTime);
        setValue('time', currentTime);
    }, [setValue]);

    return (
        <>
            <h1 className='text-5xl text-center my-5'>Add a new Transaction</h1>
            <form onSubmit={handleSubmit(onFormSubmit)} className="lg:w-4/5 lg:mx-auto flex flex-col justify-start items-start lg:flex-row lg:justify-center lg:items-center gap-5 border rounded p-5 m-5">
                <div className="form-control flex flex-row justify-center items-center w-full lg:w-fit relative">
                    <label className="label">
                        <span className="label-text">Date:</span>
                    </label>
                    <input
                        type="text"
                        value={date.toLocaleDateString()}
                        onClick={() => setShowCalendar(!showCalendar)}
                        readOnly
                        className="input input-bordered cursor-pointer w-full lg:w-fit"
                    />
                    {showCalendar && (
                        <div className="absolute top-14">
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                    <input type="hidden" {...register('date')} value={date} />
                </div>

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-fit">
                    <label className="label">
                        <span className="label-text">Time:</span>
                    </label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value);
                            setValue('time', e.target.value);
                        }}
                        className="input input-bordered w-full lg:w-fit"
                    />
                    <input type="hidden" {...register('time')} value={time} />
                </div>

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-fit">
                    <label className="label">
                        <span className="label-text">Category:</span>
                    </label>
                    <select {...register('category')} className="select select-bordered w-full lg:w-fit">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-fit">
                    <label className="label">
                        <span className="label-text">Amount:</span>
                    </label>
                    <input
                        type="number"
                        {...register('amount')}
                        className="input input-bordered w-full lg:w-fit"
                    />
                </div>

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-fit">
                    <label className="label">
                        <span className="label-text">Tag:</span>
                    </label>
                    <input
                        type="text"
                        {...register('tag')}
                        className="input input-bordered w-full lg:w-fit"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full lg:w-fit">
                    Add Transaction
                </button>
            </form>
        </>
    );
};

export default TransactionForm;
