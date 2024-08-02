import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from 'react-toastify';
import TransactionForm from '../components/dashboard/transactions/TransactionForm';
import TransactionTable from '../components/dashboard/transactions/TransactionTable';
import ImgAI from '../components/dashboard/transactions/TransactionImage';
const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [currentPage]);

  const fetchCategories = () => {
    fetch(`http://localhost:3000/data-status/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setIncomeCategories(data.incomeCategories || []);
        setExpenseCategories(data.expenseCategories || []);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  const fetchTransactions = () => {
    fetch(`http://localhost:3000/ten-transactions/${user?.email}?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  };

  const onSubmit = (data) => {
    const method = editingTransaction ? 'PATCH' : 'POST';
    const url = editingTransaction 
      ? `http://localhost:3000/transactions/${editingTransaction._id}` 
      : `http://localhost:3000/transactions/${user.email}`;

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
        fetchTransactions();
        reset();
        setEditingTransaction(null);
        toast(editingTransaction ? 'Transaction updated successfully' : 'Transaction added successfully');
      })
      .catch(error => console.error('Error saving transaction:', error));
  };

  const onDelete = (id) => {
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchTransactions();
        toast('Transaction deleted successfully');
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  const startEdit = (transaction) => {
    setEditingTransaction(transaction);
    Object.keys(transaction).forEach(key => setValue(key, transaction[key]));
  };

  return (
    <div>
      <TransactionForm/>
      <TransactionTable/>
    </div>
  );
};

export default Transactions;
