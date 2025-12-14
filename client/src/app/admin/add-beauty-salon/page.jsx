'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa6'
import { Gi3dMeeple } from 'react-icons/gi'
import { MdLocalMovies, MdOutlineLocalMovies } from 'react-icons/md'
import { toast } from 'react-toastify'

export default function page() {
    const [preview, setPreview] = useState("")
    const [id, setId] = useState(null)
    const [beauty, setBeauty] = useState([])
    const [formData, setFormData] = useState({
        beautyName: "",
        gender: "",
        price: "",
        beautyImage: "",
    });
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };


    // const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = (e) => {
        setFormData({
            beautyName: "",
            gender: "",
            price: "",
            beautyImage: "",
        })
        setPreview("")
        setId(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let AddBeautyObj = new FormData(e.target)

        // console.log(AddBeautyObj);



        if (id) {
            axios.put(`${APIURL}/ship/beauty/update/${id}`, AddBeautyObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("Beauty Updated")
                        viewBeauty()
                    } else {
                        toast.error(finalData.msg)
                    }
                })
        } else {
            axios.post(`${APIURL}/ship/beauty/add-beauty`, AddBeautyObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("You Added Beauty Item")
                        setFormData({
                            beautyName: "",
                            gender: "",
                            price: "",
                            beautyImage: "",
                        })
                        setPreview("")
                        viewBeauty()

                    } else {
                        toast.error(finalData.message || "Beauty Item Not Added")
                    }
                })
        }
    };

    let viewBeauty = () => {
        axios.get(`${APIURL}/ship/beauty/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setBeauty(finalData.data)
            })
    }

    let handleEdit = (id) => {
        setId(id)
        axios.get(`${APIURL}/ship/beauty/view/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                setFormData({
                    beautyName: finalData.data[0].beautyName ?? "",
                    gender: finalData.data[0].gender ?? ""
                })
                setPreview(finalData.data[0].beautyImage)
            })
    }

    let handleDelete = (id) => {
        axios.delete(`${APIURL}/ship/beauty/delete/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                toast.success("Fitness Deleted")
                viewBeauty()
            })
    }

    useEffect(() => {
        viewBeauty()
    }, [])

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Add Beauty</h2>
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
                        <div className='md:col-span-2'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Beauty Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdOutlineLocalMovies className='opacity-50' />
                                </div>
                                <input
                                    type="text"
                                    name="beautyName"
                                    value={formData.beautyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter Beauty Name" />
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
                                    placeholder="Enter Price" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white">
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className='w-full md:col-span-2 flex flex-col text-[#000] mb-4'>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-2'>
                                Beauty Type Image <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                name='beautyImage'
                                accept="image/*"
                                id='image'
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => setPreview(reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden"
                            />
                            <label htmlFor="">
                                <div>
                                    <div className='h-[200px] p-4 bg-[#F4F7FF] border-2 border-dashed border-gray-500 rounded-2xl'>
                                        <div className='flex flex-col justify-center h-full items-center gap-4'>
                                            <h1 className='text-[30px] text-gray-500 font-bold'>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Logo Preview"
                                                        className="w-70 h-24 object-cover rounded-[5px] border border-[#00000019] mt-3"
                                                    />
                                                ) : "Add Beauty Image"}
                                            </h1>
                                            <label htmlFor="image" className='px-10 py-2 bg-gray-500 text-[#fff] font-semibold rounded-[5px] hover:px-12 hover:py-2.5 transition-all duration-300 cursor-pointer'>
                                                {preview ? "Change Image" : "Upload"}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </label>
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
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Image</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Beauty Name</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Price</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Gender</th>
                                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beauty.length > 0 ?

                                    beauty.map((items, index) => (
                                        <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-blue-50/50">
                                            <td className="py-4 px-4 text-sm text-slate-900">
                                                {/* <div className="flex items-center gap-3"> */}
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                                                    {
                                                        // {
                                                        items.beautyImage ? (
                                                            <img
                                                                src={items.beautyImage}
                                                                alt={items.beautyName}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            getInitials(items.beautyName)
                                                        )
                                                        // }

                                                        // getInitials(items.beautyName)
                                                    }
                                                </div>
                                                {/* <span>{items.beautyName}</span>
                                                </div> */}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-900">
                                                {/* <div className="flex items-center gap-3"> */}
                                                {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                                                        {
                                                            // {
                                                            items.beautyImage ? (
                                                                <img
                                                                    src={items.beautyImage}
                                                                    alt={items.beautyName}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                getInitials(items.beautyName)
                                                            )
                                                            // }

                                                            // getInitials(items.beautyName)
                                                        }
                                                    </div> */}
                                                <span>{items.beautyName}</span>
                                                {/* </div> */}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-900">{items.price}</td>
                                            <td className="py-4 px-4 text-sm"><span className="inline-block py-1 px-3 text-xs font-medium rounded-lg">{items.gender}</span></td>
                                            {/* <td className="py-4 px-4 text-sm"><span className="inline-block py-1 px-3 text-xs font-medium rounded-lg">{items.type}</span></td> */}
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
