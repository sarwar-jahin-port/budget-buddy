import React, { useState } from 'react'
import Transactions from './Transactions';
import Summary from './Summary';
import Analysis from './Analysis';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("summary");

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {(activeSection==="summary") && <Summary/>}
                {(activeSection==="transactions") && <Transactions/>}
                {(activeSection==="analysis") && <Analysis/>}
                {(activeSection==="future-plan") && <div>Future Plan</div>}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content text-xl min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><button onClick={()=>setActiveSection("summary")}>Summary</button></li>
                    <li><button onClick={()=>setActiveSection("transactions")}>Transactions</button></li>
                    <li><button onClick={()=>setActiveSection("analysis")}>Analysis</button></li>
                    <li><button onClick={()=>setActiveSection("future-plan")}>Future Plan</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard