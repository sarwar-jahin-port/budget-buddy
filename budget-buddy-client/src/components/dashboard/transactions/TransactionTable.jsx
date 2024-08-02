import React, { useEffect, useState } from 'react';
import TransactionEditForm from './TransactionEditForm';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const TransactionTable = () => {
  const {user} = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState({});
  const [updated, setUpdated] = useState(false); // checks if data updated at TransactionEditForm.

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`http://localhost:3000/ten-transactions/${user?.email}`);
      const data = await response.json();
      setTransactions(data);
      setUpdated(false);
    };
    fetchTransactions();
  }, [updated]);

  const handleEditClick = (transaction) =>{
    setIsModalOpen(true);
    setEditTransaction(transaction);
  }

  const handleDeleteClick = (id) =>{
    fetch(`http://localhost:3000/delete-transaction/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      data.deleted ? toast.success("Transaction Deleted") : toast.error("Transaction failed to delete")
      setUpdated(true);
    })
  }

  return (
    <section className='my-10 min-h-96'> 
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
              <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(transaction)}>Edit</button>
              <button className="btn btn-danger btn-sm ml-2" onClick={()=>handleDeleteClick(transaction._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
        {isModalOpen && <TransactionEditForm transaction={editTransaction} onClose={()=>setIsModalOpen(false)} onUpdate = {()=>setUpdated(true)}/>}
    </table>
    </section>
  );
};

export default TransactionTable;
