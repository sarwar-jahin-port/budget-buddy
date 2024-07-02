import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const TransactionEditForm = ({ transaction, onClose }) => {
    const { register, handleSubmit, setValue } = useForm({ defaultValues: transaction });

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        }
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        }
    }, [onClose]);

    useEffect(()=>{
        for(const key in transaction){
            setValue(key, transaction[key]);
        }
    }, [transaction, setValue])

    const onSubmitForm = (data) =>{
        onSubmit(data);
    }
    return (
        <div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Transaction</h3>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="py-2">
                            <label>Date</label>
                            <input
                                type="date"
                                {...register('date')}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="py-2">
                            <label>Time</label>
                            <input
                                type="time"
                                {...register('time')}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="py-2">
                            <label>Category</label>
                            <input
                                type="text"
                                {...register('category')}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="py-2">
                            <label>Tag</label>
                            <input
                                type="text"
                                {...register('tag')}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="py-2">
                            <label>Amount</label>
                            <input
                                type="number"
                                {...register('amount')}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="py-2">
                            <label>Comment</label>
                            <input
                                type="text"
                                {...register('comment')}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn">Submit</button>
                            <button type="button" className="btn" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default TransactionEditForm