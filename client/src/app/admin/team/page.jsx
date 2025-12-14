import React from 'react'
import { GrUserAdmin, GrUserManager } from 'react-icons/gr';


export default function page() {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="py-5 px-5 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                </div>
                <div className="p-5">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <GrUserAdmin className="w-6 h-6 text-blue-600" />
                            <span>Add Admin</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <GrUserManager className="w-6 h-6 text-blue-600" />
                            <span>Add Manager</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <line x1="12" y1="12" x2="12" y2="12.01"></line>
                            </svg>
                            <span>New Product</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>Create Order</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="12" y1="18" x2="12" y2="12"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                            <span>Generate Report</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
