import React, { useEffect, useState } from 'react';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:3000/transactions');
      const data = await response.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <> 
    <h1 className='text-5xl text-center my-10'>Transactions Table</h1>
    <table className="table w-full md:w-fit mx-auto border rounded mt-4">
      <thead>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Time</th>
          <th>Category</th>
          <th>Tag</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={transaction._id}>
            <td>{index + 1}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{new Date(transaction.date).toLocaleTimeString()}</td>
            <td>{transaction.category}</td>
            <td>{transaction.tag}</td>
            <td>{transaction.amount}</td>
            <td>
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default TransactionTable;
