import React from 'react';
import { motion } from 'framer-motion';

interface LaunchLeftPanelProps {
    isAnimated?: boolean;
    activeItem?: string;
}

const LaunchLeftPanel = ({ isAnimated, activeItem }: LaunchLeftPanelProps) => {
    const navItems = ['Chat', 'Projects', 'Roadmap', 'Specs', 'Calendar'];

    return (
        <div className={`w-[280px] bg-[#1C1C1C] flex flex-col h-full rounded-tl-3xl rounded-bl-3xl border-r border-[#2A2A2A] relative overflow-hidden ${isAnimated ? 'pointer-events-none' : ''}`}>
            {/* Header */}
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm tracking-tight leading-none">Formeon AI</div>
                        <div className="text-[10px] text-gray-500 font-medium mt-0.5">Work</div>
                    </div>
                </div>

                <div className="bg-[#2A2A2A] rounded-lg p-1.5 transition-colors">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Navigation */}
            <div className="px-3 flex-1 overflow-y-auto">
                <div className="space-y-1 mb-8">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item}
                            initial={isAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                        >
                            <NavItem
                                icon={item === 'Projects' ? 'Folder' : item === 'Specs' ? 'CheckSquare' : item === 'Roadmap' ? 'Calendar' : item}
                                label={item}
                                active={activeItem ? activeItem === item : item === 'Chat'}
                                isAnimated={isAnimated}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mb-4 px-2">
                    <motion.div
                        initial={isAnimated ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3"
                    >
                        Integrations
                    </motion.div>
                    <div className="space-y-1">
                        {[
                            { name: 'Google Workspace', connected: true },
                            { name: 'Slack', connected: true },
                            { name: 'Microsoft 365', connected: false },
                            { name: 'Workday', connected: false },
                            { name: 'Jira', connected: true }
                        ].map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={isAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                            >
                                <IntegrationItem name={item.name} connected={item.connected} isAnimated={isAnimated} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer - AI Engine */}
            <div className="p-4 border-t border-[#2A2A2A] bg-[#1F1F1F]">
                <div className="mb-3">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">AI Engine</div>
                    <div className="bg-[#252525] rounded-xl p-2.5 border border-[#333] flex items-center justify-between group transition-colors">
                        <div>
                            <div className="text-xs font-semibold text-gray-200">Claude 3 Haiku</div>
                            <div className="text-[10px] text-gray-500">Fast & Concise</div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm" />
                    </div>
                </div>

                <div className="flex items-center justify-between text-[#555] text-[10px] font-medium pt-1">
                    <div className="flex items-center gap-1.5 transition-colors">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </div>
                    <div className="flex items-center gap-1.5 text-green-500/80">
                        <div className="w-1 h-1 rounded-full bg-green-500" />
                        SYSTEM ONLINE
                        <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active = false, isAnimated }: { icon: string, label: string, active?: boolean, isAnimated?: boolean }) => {
    const getIcon = () => {
        switch (icon) {
            case 'Chat': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />;
            case 'Folder': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />;
            case 'Calendar': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
            case 'To-Dos': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />;
            case 'CheckSquare': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
            default: return null;
        }
    }

    return (
        <div className={`
            flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
            ${active ? 'bg-[#2A2A2A] text-white font-semibold' : 'text-gray-400'}
            ${!isAnimated ? 'hover:text-gray-200 hover:bg-[#252525] cursor-pointer' : ''}
        `}>
            <svg className={`w-4 h-4 ${active ? 'text-blue-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {getIcon()}
            </svg>
            <span className="text-sm">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />}
        </div>
    );
};

const IntegrationItem = ({ name, connected = false, isAnimated }: { name: string, connected?: boolean, isAnimated?: boolean }) => {
    const getIcon = () => {
        switch (name) {
            case 'Google Workspace': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
            );
            case 'Slack': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M5.042 15.123a2.52 2.52 0 0 1-2.52-2.52 2.52 2.52 0 0 1 2.52-2.52h2.52v5.04z" fill="#E01E5A" />
                    <path d="M1.26 15.123a1.26 1.26 0 0 0-1.26 1.26c0 1.392 1.128 2.52 2.52 2.52 1.392 0 2.52-1.128 2.52-2.52v-1.26h-3.78z" fill="#E01E5A" />
                    <path d="M8.82 15.123a2.52 2.52 0 0 1 2.52 2.52 2.52 2.52 0 0 1 2.52 2.52v-5.04h-5.04z" fill="#36C5F0" />
                    <path d="M8.82 23.94a1.26 1.26 0 0 0 1.26-1.26c0-1.392-1.128-2.52-2.52-2.52h-1.26v3.78h2.52z" fill="#36C5F0" />
                    <path d="M5.042 8.82a2.52 2.52 0 0 1 2.52 2.52 2.52 2.52 0 0 1-2.52 2.52v-5.04h5.04z" fill="#2EB67D" />
                    <path d="M5.042 5.04a1.26 1.26 0 0 0 1.26-1.26c0-1.392-1.128-2.52-2.52-2.52-1.392 0-2.52 1.128-2.52 2.52v1.26h3.78z" fill="#2EB67D" />
                    <path d="M15.12 8.82a2.52 2.52 0 0 1-2.52-2.52 2.52 2.52 0 0 1-2.52-2.52v5.04h5.04z" fill="#ECB22E" />
                    <path d="M17.64 8.82a1.26 1.26 0 0 0 1.26 1.26c1.392 0 2.52-1.128 2.52-2.52s-1.128-2.52-2.52-2.52h-1.26v3.78z" fill="#ECB22E" />
                </svg>
            );
            case 'Microsoft 365': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path fill="#F25022" d="M1 1h10v10H1z" /><path fill="#7FBA00" d="M13 1h10v10H13z" /><path fill="#00A4EF" d="M1 13h10v10H1z" /><path fill="#FFB900" d="M13 13h10v10H13z" />
                </svg>
            )
            case 'Jira': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" color="#0052CC">
                    <path d="M11.571 11.429h5.714v5.714H11.57zM11.571 0h5.714v10H11.57zM0 11.429h5.715v5.714H0z" />
                    <path fillOpacity=".5" d="M0 .571h5.715v9.143H0z" />
                </svg>
            )
            case 'Workday': return (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" color="#005CB9">
                    <path d="M2.2 0C1 0 0 1 0 2.2V22c0 1.2 1 2.2 2.2 2.2h19.6c1.2 0 2.2-1 2.2-2.2V9.8h-7.6l-1.3 3.3-1.6 3.9h-4L12.3 8l3 3h-3l-2.1-2.1L8.1 4.5l-2.4 6-2.6 6.5H2.2V0z" />
                </svg>
            )
            default: return <div className="w-4 h-4 bg-gray-600 rounded-sm" />;
        }
    }

    return (
        <div className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${!isAnimated ? 'hover:bg-[#252525] group cursor-pointer' : ''}`}>
            <div className="flex items-center gap-3">
                <div className="opacity-80">
                    {getIcon()}
                </div>
                <span className="text-xs font-medium text-gray-400">{name}</span>
            </div>
            <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-500 shadow-sm' : 'bg-gray-700'}`} />
        </div>
    )
}

export default LaunchLeftPanel;
