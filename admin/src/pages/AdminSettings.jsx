import React, { useState, useEffect } from 'react'
import { Settings, Save, Server, Globe, Shield } from 'lucide-react'
import { API } from '../App'

const AdminSettings = () => {
    const [config, setConfig] = useState({
        aiModel: 'gpt-3.5-turbo',
        maxTokens: 2000,
        maintenanceMode: false,
        systemName: 'AI Chat Ecosystem'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const user = JSON.parse(localStorage.getItem('adminUser'));

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await API.get('/admin/config', { headers: { 'user-id': user.id } });
                if (data) setConfig(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await API.post('/admin/config', config, { headers: { 'user-id': user.id } });
            alert('System configuration updated');
        } catch (err) {
            alert('Failed to save config');
        } finally {
            setSaving(false);
        }
    };

    const cardStyle = {
        backgroundColor: '#171717',
        border: '1px solid #262626',
        borderRadius: '32px',
        padding: '40px',
        marginTop: '32px'
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: '#0b0b0b',
        border: '1px solid #262626',
        borderRadius: '16px',
        padding: '16px',
        outline: 'none',
        color: 'white',
        fontSize: '14px',
        marginTop: '8px'
    };

    const labelStyle = {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    if (loading) return <div style={{ color: '#6b7280', padding: '40px', textAlign: 'center' }}>Loading system configuration...</div>;

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out', maxWidth: '900px' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; filter: blur(10px); }
                    to { opacity: 1; filter: blur(0); }
                }
            `}</style>

            <div>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>System Settings</h1>
                <p style={{ color: '#6b7280', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>Global environment configuration</p>
            </div>

            <form onSubmit={handleSave}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #262626' }}>
                        <Server color="#3b82f6" size={20} />
                        <h3 style={{ fontWeight: 'bold', margin: 0 }}>Engine Configuration</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                        <div>
                            <label style={labelStyle}>Primary AI Model</label>
                            <select 
                                style={inputStyle}
                                value={config.aiModel}
                                onChange={e => setConfig({...config, aiModel: e.target.value})}
                            >
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                <option value="gpt-4">GPT-4 (Enterprise Only)</option>
                                <option value="claude-3">Claude 3</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Max Tokens Per Session</label>
                            <input 
                                type="number" 
                                style={inputStyle}
                                value={config.maxTokens}
                                onChange={e => setConfig({...config, maxTokens: parseInt(e.target.value)})}
                            />
                        </div>
                    </div>
                </div>

                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #262626' }}>
                        <Globe color="#22c55e" size={20} />
                        <h3 style={{ fontWeight: 'bold', margin: 0 }}>Public Presence</h3>
                    </div>

                    <div>
                        <label style={labelStyle}>System Title</label>
                        <input 
                            type="text" 
                            style={inputStyle}
                            value={config.systemName}
                            onChange={e => setConfig({...config, systemName: e.target.value})}
                        />
                    </div>
                </div>

                <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: config.maintenanceMode ? 'rgba(239,68,68,0.05)' : 'rgba(34,197,94,0.05)', borderColor: config.maintenanceMode ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Shield color={config.maintenanceMode ? '#ef4444' : '#22c55e'} size={24} />
                        <div>
                            <h4 style={{ margin: 0, fontWeight: 'bold' }}>Maintenance Mode</h4>
                            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Restrict public access to the AI chat interface</p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setConfig({...config, maintenanceMode: !config.maintenanceMode})}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: config.maintenanceMode ? '#ef4444' : '#262626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '12px'
                        }}
                    >
                        {config.maintenanceMode ? 'Deactivate' : 'Activate'}
                    </button>
                </div>

                <button 
                    type="submit" 
                    disabled={saving}
                    style={{
                        width: '100%',
                        marginTop: '32px',
                        padding: '20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '24px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        boxShadow: '0 10px 25px rgba(59,130,246,0.2)'
                    }}
                >
                    <Save size={20} />
                    {saving ? 'Synchronizing...' : 'Save Global Configuration'}
                </button>
            </form>
        </div>
    )
}

export default AdminSettings
