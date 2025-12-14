'use client'
import axios from 'axios';
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        phone: ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let AddUserObj = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            phone: formData.phone
        }


       
        axios.post(`${APIURL}/ship/auth/add-user`, AddUserObj)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    toast.success("You Added User")
                    router.push('/admin/view-user')

                } else {
                    toast.error(finalData.message || "Invalid username or password")
                }
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.")
            })
    };
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Add New User</h2>
                    <p className="text-gray-600 text-base">Create a new user account with role and permissions.</p>
                </div>
                <Link href={'../admin/view-user'}>
                    <button className="flex items-center gap-2 py-2 px-4 bg-gray-200 text-gray-700 border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-gray-300" id="backToUsersBtn">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Back to Users
                    </button>
                </Link>
            </div>
            <div className="max-w-3xl mx-auto">
                <form id="addUserForm" onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* <!-- Full Name --> */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter full name" />
                            </div>
                            <p className="text-red-600 text-sm mt-1 hidden" id="fullNameError">Please enter a full name</p>
                        </div>

                        {/* <!-- Email Address --> */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <input type="email" id="email" name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="user@example.com" />
                            </div>
                            <p className="text-red-600 text-sm mt-1 hidden" id="emailError">Please enter a valid email address</p>
                        </div>

                        {/* <!-- Phone Number --> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <input type="tel" id="phone" name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 123-4567" />
                            </div>
                        </div>

                        {/* <!-- Role --> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select id="role" name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white">
                                <option value="">Select a role</option>
                                <option value="Voyager">Voyager</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="HeadCook">Head-Cook</option>
                                <option value="Supervisor">Supervisor</option>
                            </select>
                            {/* <p className="text-red-600 text-sm mt-1 hidden" id="roleError">Please select a role</p> */}
                        </div>

                        {/* <!-- Department --> */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Department
                            </label>
                            <select id="department" name="department"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white">
                                <option value="">Select a department</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Support">Support</option>
                                <option value="HR">HR</option>
                            </select>
                        </div> */}

                        {/* <!-- Status --> */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4 mt-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="status" value="Active" checked
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-700">Active</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="status" value="Inactive"
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-700">Inactive</span>
                                </label>
                            </div>
                        </div> */}

                        {/* <!-- Password --> */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input type="password" id="password" name="password" required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter password" />
                                <button type="button" id="togglePassword" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" id="eyeIcon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                            <p className="text-red-600 text-sm mt-1 hidden" id="passwordError">Password must be at least 8 characters</p>
                        </div> */}

                        {/* <!-- Confirm Password --> */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input type="password" id="confirmPassword" name="confirmPassword" required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Confirm password" />
                                <button type="button" id="toggleConfirmPassword" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" id="eyeIconConfirm" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className="text-red-600 text-sm mt-1 hidden" id="confirmPasswordError">Passwords do not match</p>
                        </div> */}

                        {/* <!-- Bio / Notes --> */}
                        {/* <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio / Notes
                            </label>
                            <textarea id="bio" name="bio" rows="4"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Add any additional notes or bio information"></textarea>
                            <p className="text-xs text-gray-500 mt-1">Optional additional information about the user</p>
                        </div> */}
                    </div>

                    {/* <!-- Form Actions --> */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button type="button" id="cancelBtn"
                            className="py-2.5 px-6 bg-gray-200 text-gray-700 border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit"
                            className="py-2.5 px-6 bg-blue-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}