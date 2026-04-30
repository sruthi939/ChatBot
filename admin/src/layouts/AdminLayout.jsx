import React from 'react'
import Sidebar from '../components/Sidebar'
import AdminHeader from '../components/AdminHeader'

const AdminLayout = ({ children, user, onLogout }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0b0b0b' }}>
            {/* Fixed Sidebar */}
            <Sidebar onLogout={onLogout} />

            {/* Main Content Area */}
            <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
                <AdminHeader user={user} />
                <main style={{ flex: 1, padding: '40px' }}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
