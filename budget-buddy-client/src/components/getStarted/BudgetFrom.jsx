import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const initialIncomeCategories = ["Salary", "Business", "Investment", "Others"];
const initialExpenseCategories = ["Home Rent", "Transport", "Food", "Gym", "Travel", "Games"];

const BudgetForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [incomeCategories, setIncomeCategories] = useState(initialIncomeCategories);
  const [expenseCategories, setExpenseCategories] = useState(initialExpenseCategories);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      incomeCategories: {},
      expenseCategories: {}
    }
  });

  const incomeCategoriesWatch = watch('incomeCategories', {});
  const expenseCategoriesWatch = watch('expenseCategories', {});
  const [incomeSelected, setIncomeSelected] = useState(false);

  useEffect(() => {
    const hasSelectedIncome = Object.values(incomeCategoriesWatch).some(value => value);
    setIncomeSelected(hasSelectedIncome);
  }, [incomeCategoriesWatch]);

  const onSubmit = data => {
    console.log('Form Data:', data);
    fetch("http://localhost:3000/user-budget-data", {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({data, user})
    })
    .then(res=>res.json())
    .then(data=> data?.acknowledged ? navigate("/"):"");
  };

  const addIncomeCategory = (e) => {
    e.preventDefault();
    const newCategory = e.target.previousSibling.value;
    if (newCategory && !incomeCategories.includes(newCategory)) {
      setIncomeCategories([...incomeCategories, newCategory]);
      setValue(`incomeCategories.${newCategory}`, true);  // Select the new category by default
    }
    e.target.previousSibling.value = "";
  };

  const addExpenseCategory = (e) => {
    e.preventDefault();
    const newCategory = e.target.previousSibling.value;
    if (newCategory && !expenseCategories.includes(newCategory)) {
      setExpenseCategories([...expenseCategories, newCategory]);
      setValue(`expenseCategories.${newCategory}`, true);  // Select the new category by default
    }
    e.target.previousSibling.value = "";
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg my-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Budget Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Income Categories */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Income Categories</h3>
          {incomeCategories?.map(category => (
            <div key={category} className="form-control">
              <label className="cursor-pointer label">
                <input 
                  type="checkbox" 
                  {...register(`incomeCategories.${category}`)}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text ml-2">{category}</span>
              </label>
            </div>
          ))}
          <div className="mt-4 flex">
            <input
              type="text"
              name="newIncomeCategory"
              className="input input-bordered w-full mr-2"
              placeholder="Add custom income category"
            />
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={addIncomeCategory}
            >Add</button>
          </div>
          {errors.incomeCategories && <p className="text-red-500 mt-2">Select at least one income category.</p>}
        </div>

        {/* Expense Categories */}
        <div className={`mb-6 ${!incomeSelected && 'opacity-50 pointer-events-none'}`}>
          <h3 className="text-xl font-semibold mb-2">Expense Categories</h3>
          {expenseCategories?.map(category => (
            <div key={category} className="form-control">
              <label className="cursor-pointer label">
                <input 
                  type="checkbox" 
                  {...register(`expenseCategories.${category}`)}
                  className="checkbox checkbox-primary"
                  disabled={!incomeSelected}
                />
                <span className="label-text ml-2">{category}</span>
              </label>
            </div>
          ))}
          <div className="mt-4 flex">
            <input
              type="text"
              name="newExpenseCategory"
              className="input input-bordered w-full mr-2"
              placeholder="Add custom expense category"
              disabled={!incomeSelected}
            />
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={addExpenseCategory}
              disabled={!incomeSelected}
            >Add</button>
          </div>
          {!incomeSelected && <p className="text-gray-500 mt-2">Select at least one income category to enable expense categories.</p>}
        </div>

        {/* Budget Allocation */}
        <div className={`mb-6 ${!incomeSelected && 'opacity-50 pointer-events-none'}`}>
          <h3 className="text-xl font-semibold mb-2">Set Budget</h3>
          {Object.keys(expenseCategoriesWatch)?.map(category => expenseCategoriesWatch[category] && (
            <div key={category} className="form-control mb-4">
              <label className="label">
                <span className="label-text">{category}</span>
              </label>
              <input 
                type="number" 
                {...register(`budgets.${category}`, { required: true, min: 0 })}
                className="input input-bordered w-full" 
                placeholder="Enter budget"
              />
              {errors.budgets?.[category] && <p className="text-red-500 mt-2">Enter a valid budget.</p>}
            </div>
          ))}
          {!incomeSelected && <p className="text-gray-500 mt-2">Select at least one income category to enable budget allocation.</p>}
        </div>

        <div className="flex justify-center">
          <button type="submit" className={`btn btn-primary ${!incomeSelected && 'cursor-not-allowed'}`} disabled={!incomeSelected}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
