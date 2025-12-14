"use client"
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let loginContext = createContext()

export function MainContext({ children }) {
    const [userRole, setUserRole] = useState("")
    const [token, setToken] = useState("")
    const [role, setRole] = useState("")
    const [userData, setUserData] = useState([])
    const [cart, setCart] = useState([])
    const [stationeryCart, setStationeryCart] = useState([])
    const [profile, setProfile] = useState([])

    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL



    // useEffect(() => {
    //     let t = localStorage.getItem("TOKEN");
    //     let r = localStorage.getItem("USERROLE");

    //     if (t) setToken(t);
    //     if (r) setUserRole(r);
    // }, []);
    // console.log(token);

    useEffect(() => {
        setUserRole(localStorage.getItem("USERROLE") ?? "");
        setToken(localStorage.getItem("TOKEN") ?? "");
    }, []);


    useEffect(() => {
        if (userRole) {
            localStorage.setItem("USERROLE", userRole)
        } else {
            localStorage.removeItem("USERROLE")
        }
    }, [userRole])

    useEffect(() => {
        if (token) {
            localStorage.setItem("TOKEN", token)
        } else {
            localStorage.removeItem("TOKEN")
        }
    }, [token])

    let cartItems = () => {
        axios.post(`${APIURL}/ship/catering-cart/view`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalData) => {
                setCart(finalData.data)
            })
    }

    let stationeryCartItems = () => {
        axios.post(`${APIURL}/ship/stationery-cart/view`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalData) => {
                setStationeryCart(finalData.data)
            })
    }

    let profileView = () => {
        axios.post(`${APIURL}/ship/auth/profile-View`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.data)
            .then((finalData) => {
                setProfile(finalData.data[0])
            })
    }

    useEffect(() => {
        if (token) {
            cartItems();
            stationeryCartItems();
            profileView();
        } else {
            setCart([]);
            setStationeryCart([]);
            setProfile([]);
        }
    }, [token])

    let obj = {
        userRole, setUserRole,
        // clearAdminData,
        role, setRole,
        token, setToken,
        cart, cartItems,
        stationeryCart,
        stationeryCartItems,
        profile,
        userData
    }
    return (
        <loginContext.Provider value={obj}>
            {children}
        </loginContext.Provider>
    )
}
