import React, { useEffect, useState } from 'react'
import BudgetForm from '../components/getStarted/BudgetFrom'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const GetStarted = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    fetch(`http://localhost:3000/data-status/${user?.email}`)
    .then(res => res.json())
    .then(data => {
      if(data?.dataStatus){
        navigate('/signin');
      }
    })
  }, [user?.email])

  return (
    <div>
      <BudgetForm />
    </div>
  )
}

export default GetStarted