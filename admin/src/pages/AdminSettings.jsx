import { Save, Shield, Key, Bell, Globe } from 'lucide-react'
import { API } from '../App'

const AdminSettings = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('adminUser'));

    const fetchConfig = async () => {
        try {
            const { data } = await API.get('/admin/config', { headers: { 'user-id': user.id } });
            setConfig(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchConfig();
    }, []);

    const handleSave = async () => {
        try {
            await API.post('/admin/config', config, { headers: { 'user-id': user.id } });
            alert('System configuration updated across all services!');
        } catch (err) {
            alert('Failed to save configuration');
        }
    };

    if (loading || !config) return <div className='p-10 text-gray-500'>Loading system configuration...</div>;

    return (
        <div className='p-10 space-y-10 animate-in fade-in duration-500'>
            <div>
                <h1 className='text-4xl font-bold'>Admin Settings</h1>
                <p className='text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1'>Global system configuration</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* AI Configuration */}
                <div className='bg-[#171717] border border-[#262626] rounded-[40px] p-8 space-y-6'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='p-2 bg-blue-500/10 rounded-xl'>
                            <Key className='size-5 text-blue-500' />
                        </div>
                        <h3 className='font-bold'>AI Engine Config</h3>
                    </div>
                    
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <label className='text-[10px] font-bold text-gray-600 uppercase tracking-widest px-1'>Default System Prompt</label>
                            <textarea 
                                value={config.systemPrompt}
                                onChange={(e) => setConfig({...config, systemPrompt: e.target.value})}
                                className='w-full bg-[#0b0b0b] border border-[#262626] rounded-2xl p-4 text-sm outline-none focus:border-blue-500/50 min-h-[120px] resize-none'
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-[10px] font-bold text-gray-600 uppercase tracking-widest px-1'>OpenAI Model</label>
                            <select 
                                value={config.apiModel}
                                onChange={(e) => setConfig({...config, apiModel: e.target.value})}
                                className='w-full bg-[#0b0b0b] border border-[#262626] rounded-2xl p-4 text-sm outline-none focus:border-blue-500/50'
                            >
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Cost Optimized)</option>
                                <option value="gpt-4">GPT-4 (Performance)</option>
                                <option value="gpt-4-turbo">GPT-4 Turbo (Balanced)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* System Permissions */}
                <div className='bg-[#171717] border border-[#262626] rounded-[40px] p-8 space-y-6'>
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='p-2 bg-green-500/10 rounded-xl'>
                            <Shield className='size-5 text-green-500' />
                        </div>
                        <h3 className='font-bold'>Security & Access</h3>
                    </div>

                    <div className='space-y-6'>
                        <div className='flex items-center justify-between p-4 bg-[#0b0b0b] rounded-2xl border border-[#262626]'>
                            <div>
                                <p className='text-sm font-bold'>New Registrations</p>
                                <p className='text-[10px] text-gray-500 uppercase'>Allow users to sign up</p>
                            </div>
                            <button 
                                onClick={() => setConfig({...config, registrationEnabled: !config.registrationEnabled})}
                                className={`w-12 h-6 rounded-full transition-all p-1 ${config.registrationEnabled ? 'bg-green-500' : 'bg-gray-800'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-all ${config.registrationEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className='flex items-center justify-between p-4 bg-[#0b0b0b] rounded-2xl border border-[#262626]'>
                            <div>
                                <p className='text-sm font-bold text-red-500'>Maintenance Mode</p>
                                <p className='text-[10px] text-gray-500 uppercase'>Shutdown frontend access</p>
                            </div>
                            <button 
                                onClick={() => setConfig({...config, maintenanceMode: !config.maintenanceMode})}
                                className={`w-12 h-6 rounded-full transition-all p-1 ${config.maintenanceMode ? 'bg-red-500' : 'bg-gray-800'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-all ${config.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-end'>
                <button 
                    onClick={handleSave}
                    className='flex items-center gap-3 px-10 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-2xl transition-all shadow-lg shadow-green-500/20 active:scale-95'
                >
                    <Save size={20} />
                    Save Configuration
                </button>
            </div>
        </div>
    )
}

export default AdminSettings
