import React from 'react'
import Sidebar from '../components/Sidebar'
import AdminHeader from '../components/AdminHeader'

const AdminLayout = ({ children, user, onLogout }) => {
    return (
        <div className="flex h-screen bg-[#0b0b0b] text-white overflow-hidden">
            {/* Sidebar remains fixed */}
            <Sidebar onLogout={onLogout} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <AdminHeader user={user} />
                
                <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                    
                    <div className="container mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
