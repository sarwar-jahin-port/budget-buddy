import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/user/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          Object.keys(data).forEach(key => setValue(key, data[key]));
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    fetch(`http://localhost:3000/user/${user.email}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(result => {
        console.log('Update result:', result);
        toast.success("Data updated successfully.");
      })
      .catch(error => console.error('Error updating user data:', error));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const addCustomCategory = (categoryType) => {
    const category = window.prompt(`Enter custom ${categoryType} category:`);
    if (category) {
      const updatedCategories = [...userData[`${categoryType.toLowerCase()}Categories`], category];
      setUserData(prevState => ({
        ...prevState,
        [`${categoryType.toLowerCase()}Categories`]: updatedCategories,
      }));
    }
  };

  const generateBudgetCategories = () => {
    const budgetCategories = {};
    userData.expenseCategories.forEach(category => {
      budgetCategories[category] = '';
    });
    setUserData(prevState => ({
      ...prevState,
      budgetCategories,
    }));
  };
  console.log(userData);
  return (
    <section className="mx-auto p-6 bg-white shadow-md rounded-lg my-5">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <form className='grid md:grid-cols-2 lg:grid-cols-4 gap-10' onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-6 border min-w-fit p-10 flex flex-col justify-center items-center bg-green-200">
          <img className='w-40 h-40 rounded-full cursor-pointer border text-center' src={userData?.photoURL} alt="profile picture" />
          <input
            type="email"
            defaultValue={userData.email}
            {...register('email')}
            className="input !bg-transparent !border-none !text-black"
            disabled
          />
        </div>

        {/* Income Categories */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Income Categories</h3>
          {userData.incomeCategories.map((category, index) => (
            <div key={index} className="form-control">
              <input
                type="text"
                defaultValue={category}
                {...register(`incomeCategories.${index}`)}
                className="input input-bordered w-full mb-2"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => addCustomCategory('Income')}
          >
            Add Custom Income Category
          </button>
        </div>

        {/* Expense Categories */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Expense Categories</h3>
          {userData.expenseCategories.map((category, index) => (
            <div key={index} className="form-control">
              <input
                type="text"
                defaultValue={category}
                {...register(`expenseCategories.${index}`)}
                className="input input-bordered w-full mb-2"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => addCustomCategory('Expense')}
          >
            Add Custom Expense Category
          </button>
        </div>

        {/* Budget Categories */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Budget Categories</h3>
          {Object.entries(userData.budgetCategories).map(([category, amount], index) => (
            <div key={index} className="form-control mb-2">
              <label className="label">
                <span className="label-text">{category}</span>
              </label>
              <input
                type="number"
                defaultValue={amount}
                {...register(`budgetCategories.${category}`)}
                className="input input-bordered w-full"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={generateBudgetCategories}
          >
            Generate Remaining...
          </button>
        </div>

        {/* Submit Button */}
        <div className="col-span-4 min-w-full">
          <button type="submit" className="btn btn-warning w-full">Update</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
