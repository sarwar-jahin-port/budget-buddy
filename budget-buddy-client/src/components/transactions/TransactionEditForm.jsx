import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

const TransactionEditForm = ({ transaction, onClose, onUpdate }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const tags = ["business", "home rent", "transport", "food"];

    const handleDateChange = (date) => {
        setDate(date);
        setValue('date', date);
        setShowCalendar(false);
    };

    const cleanData = rawData => {
        const dateObj = new Date(rawData.date);

        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });

        const formattedTime = dateObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

        const cleanedData = {
            date: formattedDate,
            time: formattedTime,
            category: rawData.category,
            amount: rawData.amount,
            tag: rawData.tag
        }
        return cleanedData;
    }

    const onFormSubmit = (rawData) => {
        const cleanedData = cleanData(rawData);
        console.log(cleanedData);
        fetch(`http://localhost:3000/update-transaction/${transaction._id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cleanedData)
        })
        .then(res => res.json())
        .then(data => {
            data.updated ? onUpdate() : "";
            data.updated ? toast.success("Transaction Updated") : toast.error("Transaction Update Failed");
        })
        onClose();
    }

    useEffect(() => {
        for (const key in transaction) {
            if (key === 'time') {
                const now = new Date();
                const currentTime = now.toTimeString().split(' ')[0].slice(0, 5); // Format to HH:MM
                setTime(currentTime);
                setValue('time', currentTime);
            }
            else if (key !== 'date') {
                setValue(key, transaction[key]);
            }
        }

    }, [transaction, setValue]);

    return (
        <div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
                <div className="modal-box">
                    <div className='flex flex-row-reverse'><button className='btn btn-sm bg-red-400 hover:bg-red-500' onClick={onClose}>X</button></div>
                    <h3 className="font-bold text-2xl text-center">Edit Transaction</h3>
                    <form onSubmit={handleSubmit(onFormSubmit)} action="" className='py-2 flex flex-col gap-4'>
                        <div className="form-control flex flex-row justify-between items-center w-full lg:w-full relative">
                            <label className="label">
                                <span className="label-text">Date:</span>
                            </label>
                            <input
                                type="text"
                                value={date.toLocaleDateString()}
                                onClick={() => setShowCalendar(!showCalendar)}
                                readOnly
                                className="input input-bordered cursor-pointer w-3/4 lg:w-3/4"
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

                        <div className="form-control flex flex-row justify-between items-center w-full lg:w-full">
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
                                className="input input-bordered w-3/4 lg:w-3/4"
                            />
                            <input type="hidden" {...register('time')} value={time} />
                        </div>

                        <div className="form-control flex flex-row justify-between items-center w-full lg:w-full">
                            <label className="label">
                                <span className="label-text">Category:</span>
                            </label>
                            <select {...register('category')} className="select select-bordered w-3/4 lg:w-3/4">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div className="form-control flex flex-row justify-between items-center w-full lg:w-full relative">
                            <label className="label">
                                <span className="label-text">Amount:</span>
                            </label>
                            <input
                                type="number"
                                {...register('amount', {
                                    required: "Amount is required",
                                    min: { value: 0, message: "Amount cannot be negative" }
                                })}
                                className="input input-bordered w-3/4 lg:w-3/4"
                            />
                            {errors.amount && <p className="text-red-500 absolute -bottom-6 right-0">{errors.amount.message}</p>}
                        </div>

                        <div className="form-control flex flex-row justify-between items-center w-full lg:w-full">
                            <label className="label">
                                <span className="label-text">Tag:</span>
                            </label>
                            <select
                                {...register('tag')}
                                className="input input-bordered w-3/4 lg:w-3/4"
                            >
                                <option value="">Select a tag</option> {/* Default option */}
                                {tags.map((tag, index) => (
                                    <option key={index} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary flex flex-col justify-center items-center w-full lg:w-full">
                            Update Transaction
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default TransactionEditForm