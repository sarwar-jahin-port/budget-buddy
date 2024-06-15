import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as Linked } from 'react-scroll'
import useAuth from '../hooks/useAuth'
import logo from "../assets/logo.gif"
import checkUserDataStatus from '../utiles/checkUserDataStatus'

const Navbar = () => {
    const {user, logOut} = useAuth();
    const [dataStatus, setDataStatus] = useState(false);

    useEffect(()=>{
        const fetchUserDataStatus = async() =>{
            if(user?.email){
                const status = await checkUserDataStatus(user?.email);
                setDataStatus(status);
            }
        }
        fetchUserDataStatus();
    },[user])

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Linked to="how-it-works" smooth={true} duration={500} className="text-gray-400 hover:text-white transition-colors duration-200">How it works</Linked></li>
                        <li>
                            <Link>Parent</Link>
                            <ul className="p-2">
                                <li><Link>Submenu 1</Link></li>
                                <li><Link>Submenu 2</Link></li>
                            </ul>
                        </li>
                        <li><Link>Pricing</Link></li>
                    </ul>
                </div>
                <div className='relative flex items-center'>
                    <img className='max-w-10 max-h-10' src={logo} alt="" />
                    <Link className="btn btn-ghost text-xl p-0">Budget Buddy</Link>
                    <hr className='logo absolute bottom-0 h-[2px] bg-black animate-lineDrawToRight' />
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {!dataStatus && <li><Link to="/get-started">Get Started</Link></li>}
                    <li><Link to='/transactions'>Transactions</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul>
            </div>
            {
                user
                    ? <div className="navbar-end flex items-center space-x-4">
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <button onClick={()=>logOut()} className="btn btn-sm">
                            Logout
                        </button>
                    </div>
                    : <div className="navbar-end">
                        <Link to="/signin" className="btn btn-sm mx-2">Sign In</Link>
                        <Link to="/signup" className="btn btn-sm">Sign Up</Link>
                    </div>
            }
        </div>
    )
}

export default Navbar