'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa6'
import { Gi3dMeeple, GiDuration } from 'react-icons/gi'
import { IoMdFitness } from 'react-icons/io'
import { MdAccessTime, MdLocalMovies, MdOutlineLocalMovies } from 'react-icons/md'
import { toast } from 'react-toastify'

export default function page() {
    const [fitness, setFitness] = useState([])
    const [id, setId] = useState(null)
    const [formData, setFormData] = useState({
        trainerName: "",
        price: "",
        time: "",
        hall: ""
    });
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = (e) => {
        setFormData({
            trainerName: "",
            price: "",
            time: "",
            hall: ""
        })
        setId(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let AddFitnessObj = {
            trainerName: formData.trainerName,
            price: formData.price,
            time: formData.time,
            hall: formData.hall
        }




        if (id) {
            axios.put(`${APIURL}/ship/fitness/update/${id}`, AddFitnessObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("Fitness Updates")
                        viewFitness()
                    } else {
                        toast.error(finalData.msg)
                    }
                })
        } else {
            axios.post(`${APIURL}/ship/fitness/add-fitness`, AddFitnessObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("You Added Fitness")
                        setFormData({
                            trainerName: "",
                            price: "",
                            time: "",
                            hall: ""
                        })
                        viewFitness()

                    } else {
                        toast.error(finalData.message || "Movie Not Added")
                    }
                })
        }
    };

    let viewFitness = () => {
        axios.get(`${APIURL}/ship/fitness/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setFitness(finalData.data)
            })
    }



    let handleEdit = (id) => {
        setId(id)
        axios.get(`${APIURL}/ship/fitness/view/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                // setFitness(finalData.data)
                // console.log(finalData.data[0]);
                setFormData({
                    trainerName: finalData.data[0].trainerName ?? "",
                    time: finalData.data[0].time ?? "",
                    hall: finalData.data[0].hall ?? ""
                })
            })
    }

    let handleDelete = (id) => {
        axios.delete(`${APIURL}/ship/fitness/delete/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                toast.success("Fitness Deleted")
                viewFitness()
            })
    }

    useEffect(() => {
        viewFitness()
    }, [])

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Add Fitness</h2>
                    <p className="text-gray-600 text-base">Create a new user account with role and permissions.</p>
                </div>
                <Link href={'../admin/add-item'}>
                    <button className="flex items-center gap-2 py-2 px-4 bg-gray-200 text-gray-700 border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-gray-300" id="backToUsersBtn">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Back to Items
                    </button>
                </Link>
            </div>
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* <!-- Full Name --> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trainer Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IoMdFitness className='opacity-50' />
                                </div>
                                <input
                                    type="text"
                                    name="trainerName"
                                    value={formData.trainerName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter Trainer Name" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaRupeeSign className='opacity-50' />
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter Trainer Name" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Timing <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdAccessTime className='opacity-80' />

                                </div>
                                <input type="time" name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter Duration" />
                            </div>
                            <p className="text-red-600 text-sm mt-1 hidden" id="emailError">Please enter a valid email address</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gym Hall <span className="text-red-500">*</span>
                            </label>
                            <select name="hall"
                                value={formData.hall}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white">
                                <option value="">Select Hall</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>


                    </div>

                    {/* <!-- Form Actions --> */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button type="button" onClick={handleCancel} id="cancelBtn"
                            className="py-2.5 px-6 bg-gray-200 text-gray-700 border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit"
                            className="py-2.5 px-6 bg-blue-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            {id ? "Update Now" : "Create Now"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-5">
                <div className="p-5">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b-2 border-gray-200">
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Trainer Name</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Price</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">time</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Hall</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fitness.length > 0 ?

                                    fitness.map((items, index) => (
                                        <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-blue-50/50">
                                            <td className="py-4 px-4 text-sm text-slate-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">{getInitials(items.trainerName)}</div>
                                                    <span>{items.trainerName}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm"><span className="inline-block py-1 px-3 text-xs font-medium rounded-lg">{items.price}</span></td>
                                            <td className="py-4 px-4 text-sm text-slate-900">{items.time}</td>
                                            <td className="py-4 px-4 text-sm"><span className="inline-block py-1 px-3 text-xs font-medium rounded-lg">{items.hall}</span></td>
                                            <td className="py-4 px-4 text-sm">
                                                <button
                                                    onClick={() => handleEdit(items._id)}
                                                    className="py-1 px-3 bg-transparent border border-gray-300 rounded-md font-sans text-xs text-slate-900 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-600 mr-2">Edit</button>
                                                <button
                                                    onClick={() => handleDelete(items._id)}
                                                    className="py-1 px-3 bg-transparent border border-gray-300 rounded-md font-sans text-xs text-slate-900 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-600">Delete</button>
                                            </td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <td colSpan="5" className="pt-4 text-center text-gray-500">
                                            No Data
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
