'use client'
import { loginContext } from '@/app/context/MainContext'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function page() {
    const [preview, setPreview] = useState("")
    const [partyHall, setPartyHall] = useState([])
    const [id, setId] = useState(null)
    const [formData, setFormData] = useState({
        itemName: "",
        category: "",
        description: "",
        price: "",
        prepTime: "",
        isAvailable: "",
        image: ""
    });
    let { setUserRole, userRole, setToken, token } = useContext(loginContext)


    // useEffect(() => {
    //     if (!token || token == "") {
    //         redirect("/login")
    //     }
    // }, [token])

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
            itemName: "",
            category: "",
            description: "",
            price: "",
            prepTime: "",
            isAvailable: "",
        })
        setId(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // let AddCateringObj = {
        //     itemName: formData.itemName,
        //     category: formData.category,
        //     description: formData.description,
        //     price: formData.price,
        //     prepTime: formData.prepTime,
        //     isAvailable: formData.isAvailable,
        // }

        let AddCateringObj = new FormData(e.target)





        if (id) {
            axios.put(`${APIURL}/ship/catering/update/${id}`, AddCateringObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("Food Updates")
                        viewCatering()
                    } else {
                        toast.error(finalData.msg)
                    }
                })
        } else {
            axios.post(`${APIURL}/ship/catering/add-food`, AddCateringObj)
                .then((res) => res.data)
                .then((finalData) => {
                    if (finalData.status) {
                        toast.success("You Added Food")
                        setFormData({
                            itemName: "",
                            category: "",
                            description: "",
                            price: "",
                            prepTime: "",
                            isAvailable: "",
                            image: ""
                        })
                        // viewCatering()

                    } else {
                        toast.error(finalData.message || "Party Hall Not Added")
                    }
                })
        }
    };

    let viewCatering = () => {
        axios.get(`${APIURL}/ship/catering/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setPartyHall(finalData.data)

            })
    }



    let handleEdit = (id) => {
        setId(id)
        axios.get(`${APIURL}/ship/catering/view/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                setFormData({
                    hallName: finalData.data[0].hallName ?? "",
                    capacity: finalData.data[0].capacity ?? "",
                    hall: finalData.data[0].hall ?? "",
                    isAvailable: finalData.data[0].isAvailable ?? ""
                })
            })
    }

    let handleDelete = (id) => {
        axios.delete(`${APIURL}/ship/catering/delete/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                toast.success("Party Hall Deleted")
                viewCatering()
            })
    }

    useEffect(() => {
        viewCatering()
    }, [])

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Add Beauty</h2>
                    <p className="text-gray-600 text-base">Create a new user account with role and permissions.</p>
                </div>
                <Link href={'../admin/view-catering-item'}>
                    <button className="flex items-center gap-2 py-2 px-4 bg-gray-200 text-gray-700 border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-gray-300" id="backToUsersBtn">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Back to View Catering
                    </button>
                </Link>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <div className="">
                        <div className="space-y-5">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Item Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        value={formData.itemName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Please enter Item Name" />
                                    {/* <p className="text-red-600 text-sm mt-1 hidden" id="itemNameError">Please enter an item name</p> */}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select id="category" name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white">
                                        <option value="">Select a category</option>
                                        <option value="appetizers">Appetizers</option>
                                        <option value="main-course">Main Course</option>
                                        <option value="desserts">Desserts</option>
                                        <option value="beverages">Beverages</option>
                                        <option value="sides">Sides</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {/* <p className="text-red-600 text-sm mt-1 hidden" id="categoryError">Please select a category</p> */}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea id="description" name="description"
                                    value={formData.description}
                                    onChange={handleChange} required rows="4"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Describe the catering item..."></textarea>
                                {/* <p className="text-red-600 text-sm mt-1 hidden" id="descriptionError">Please enter a description</p> */}
                            </div>

                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price  <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                                        <input type="number" id="price" name="price" value={formData.price}
                                            onChange={handleChange} required step="0.01" min="0"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="0.00" />
                                    </div>
                                    {/* <p className="text-red-600 text-sm mt-1 hidden" id="priceError">Please enter a price</p> */}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preparation Time <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" id="prepTime" name="prepTime" value={formData.prepTime}
                                        onChange={handleChange} required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="e.g., 30 minutes" />
                                    <p className="text-red-600 text-sm mt-1 hidden" id="prepTimeError">Please enter preparation time</p>
                                </div>
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Availability Status <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="status" value="available" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Available</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="status" value="out-of-stock" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">Out of Stock</span>
                                    </label>
                                </div>
                            </div> */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Availability <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-4 mt-3">

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="isAvailable"
                                            value="Yes"
                                            checked={formData.isAvailable === "Yes"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700">Available</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="isAvailable"
                                            value="No"
                                            checked={formData.isAvailable === "No"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700">Out of Stock</span>
                                    </label>

                                </div>
                            </div>

                        </div>

                        <div className='w-full md:col-span-2 flex flex-col text-[#000] mt-4'>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-2'>
                                Food Image <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                name='image'
                                accept="image/*"
                                id='image'
                                // required={updateData.length === 0}
                                // value={imageTarget.LogoImage}
                                onChange={e => {
                                    // let obj = { ...imageTarget }
                                    // obj['LogoImage'] = e.target.value
                                    // setAccountSItems(obj)
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
                                            <h1 className='text-[30px] text-blue-500 font-bold'>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Logo Preview"
                                                        className="w-70 h-24 object-cover rounded-[5px] border border-[#00000019] mt-3"
                                                    />
                                                ) : "Add Food Image"}
                                            </h1>
                                            <label htmlFor="image" className='px-10 py-2 bg-blue-500 text-[#fff] font-semibold rounded-[5px] hover:px-12 hover:py-2.5 transition-all duration-300 cursor-pointer'>
                                                {preview ? "Change Image" : "Upload"}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* <div className='mt-4'>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Food Image <span className="text-red-500">*</span></h3>

                            <div id="cateringUploadArea" className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-all duration-200 cursor-pointer hover:border-blue-500 hover:bg-blue-50" style={{ minHeight: "288px" }}>
                                <input type="file" id="cateringImageInput" name="itemImage" accept="image/*" className="hidden" />

                                <div id="cateringUploadPrompt" className="flex flex-col items-center justify-center h-full">
                                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="text-base font-medium text-gray-700 mb-2">Drop food image here or click to browse</p>
                                    <p className="text-sm text-gray-500">PNG, JPG, GIF, WEBP up to 10MB</p>
                                </div>

                                <div id="cateringImagePreview" className="hidden">
                                    <img id="cateringPreviewImg" src="" alt="Preview" className="w-full h-64 rounded-lg object-cover border-2 border-gray-200 mb-4" />
                                    <div className="flex gap-2 justify-center">
                                        <button type="button" id="changeCateringImageBtn" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors">
                                            Change Image
                                        </button>
                                        <button type="button" id="removeCateringImageBtn" className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-600 transition-colors">
                                            Remove
                                        </button>
                                    </div>
                                    <p id="cateringFileName" className="text-sm text-gray-600 mt-2"></p>
                                    <p id="cateringFileSize" className="text-xs text-gray-500 mt-1"></p>
                                </div>

                                <div id="cateringDragOverlay" className=" absolute inset-0 bg-blue-100 border-2 border-blue-600 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                        </svg>
                                        <p className="text-lg font-semibold text-blue-600">Drop image to upload</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-red-600 text-sm mt-2 hidden" id="cateringUploadError">Please upload a valid image file (max 10MB)</p>
                        </div> */}
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button type="button" onClick={handleCancel} id="cancelCateringBtn"
                            className="py-2.5 px-6 bg-gray-200 text-gray-700 border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit"
                            className="py-2.5 px-6 bg-blue-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            Create Item
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
