import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
}

const TransactionForm = ({ onSubmit }) => {
    const {user} = useAuth();
    const { register, handleSubmit, formState: {errors}, setValue } = useForm();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [geminiApiKey, setGeminiApiKey] = useState('AIzaSyBA-ljqvGDlV9IFOvL1PtTbt4BzmlvTh_A'); // Gemini API key
    const tags = ["home rent", "transport", "food"];

    useEffect(() => {
        // Validate Gemini API key
        if (!geminiApiKey) {
            console.error('Please provide a valid Gemini AI API key.');
        }
    }, [geminiApiKey]);


    const handleDateChange = (date) => {
        setDate(date);
        setValue('date', date);
        setShowCalendar(false);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length === 1) {
            setSelectedImage(event.target.files[0]);
        } else {
            alert('Please select only one image.');
        }
    };
    const downloadTextFile = () => {
        if (!extractedText) {
            alert('No text extracted yet. Please convert an image first.');
            return;
        }

        const blob = new Blob([extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'extracted_text.txt';
        link.click();
    };

    const handleConvertClick = async () => {
        if (!selectedImage) {
            alert('Please select an image to convert.');
            return;
        }

        setIsProcessing(true);
        setExtractedText(''); // Clear previous text

        try {
            // Access your API key as an environment variable (see "Set up your API key" above)
            const genAI = new GoogleGenerativeAI("AIzaSyBA-ljqvGDlV9IFOvL1PtTbt4BzmlvTh_A");

            const imagePart = await fileToGenerativePart(selectedImage);

            const prompt = "Extract text from this image"; // Modified prompt
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Replace with appropriate model if needed

            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            const text = response.text();
            setExtractedText(text);
        } catch (error) {
            console.error('Error during text extraction:', error);
            alert('An error occurred while processing the image. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const cleanData = rawData =>{
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
        // onSubmit(data);
        console.log(rawData);
        const cleanedData = cleanData(rawData);
        cleanedData['user-email'] = user?.email ? user?.email : "";
        console.log(cleanedData);
        fetch("http://localhost:3000/add-transaction", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cleanedData)
        })
        .then(res =>res.json())
        .then(data => data?.acknowledged ? toast.success("Transaction Added") : toast.error("Something went wrong"));
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
            <form onSubmit={handleSubmit(onFormSubmit)} className="w-4/5 mx-auto flex flex-col justify-start items-start lg:flex-row lg:justify-center lg:items-center gap-5 border rounded p-5 m-5">
                <div className="form-control flex flex-row justify-center items-center w-full lg:w-full relative">
                    <label className="label">
                        <span className="label-text">Date:</span>
                    </label>
                    <input
                        type="text"
                        value={date.toLocaleDateString()}
                        onClick={() => setShowCalendar(!showCalendar)}
                        readOnly
                        className="input input-bordered cursor-pointer w-full lg:w-full"
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

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-full">
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
                        className="input input-bordered w-full lg:w-full"
                    />
                    <input type="hidden" {...register('time')} value={time} />
                </div>

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-full">
                    <label className="label">
                        <span className="label-text">Category:</span>
                    </label>
                    <select {...register('category')} className="select select-bordered w-full lg:w-full">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-full relative">
                    <label className="label">
                        <span className="label-text">Amount:</span>
                    </label>
                    <input
                        type="number"
                        {...register('amount', {
                            required: "Amount is required",
                            min: { value: 0, message: "Amount cannot be negative" }
                        })}
                        className="input input-bordered w-full lg:w-full"
                    />
                    {errors.amount && <p className="text-red-500 absolute -bottom-6 right-0">{errors.amount.message}</p>}
                </div>

                <div className="form-control flex flex-row justify-center items-center w-full lg:w-full">
                    <label className="label">
                        <span className="label-text">Tag:</span>
                    </label>
                    <select
                        {...register('tag')}
                        className="input input-bordered w-full lg:w-full"
                    >
                        <option value="">Select a tag</option> {/* Default option */}
                        {tags.map((tag, index) => (
                            <option key={index} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary flex flex-col justify-center items-center w-full lg:w-fit">
                    Add Transaction
                </button>

            </form>

            <div className="w-4/5 mx-auto flex flex-col justify-start items-start lg:flex-row lg:justify-center lg:items-center gap-5 p-5 m-5">

                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button className="btn btn-warning flex flex-col justify-center items-center w-full lg:w-fit" onClick={handleConvertClick} disabled={isProcessing}>
                    {isProcessing ? 'Converting...' : 'Convert'}
                </button>

                {extractedText && (
                    <div className="">
                        <h2>Extracted Text:</h2>
                        <pre>{extractedText}</pre>
                        <button className="btn btn-primary" onClick={downloadTextFile}>Download as Text File</button>
                    </div>
                )}
                {!geminiApiKey && <p className="error">Please enter your Gemini AI API key.</p>}
            </div>
        </>

    );
};

export default TransactionForm;
