'use client'
import React from 'react'
import { createContext, useState } from 'react'
import { Project_ID } from '../(Constants)/Constants'
import { useRouter } from 'next/navigation'
import { Image, Link, Poll, PostAdd } from "@mui/icons-material"

export const context = createContext()

export const ContextProvider = ({ children }) => {
    const router = useRouter();

    // const storedTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState( 'dark')

    const [signUpdata, setSignUpdata] = useState({ name: '', email: '', password: '' })
    const [popup, setpopup] = useState({});
    const [loginpop, setloginpop] = useState(false)
    const [token, settoken] = useState(localStorage.getItem('token'))
    const [activeTabs, setActiveTabs] = useState('Home')
    const [activepostTabs, setActivepostTabs] = useState('Post')
    
    const handleTabs = (tabs) => {
        setActiveTabs(tabs)
    }
    const handlepostTabs = (tabs) => {
        setActivepostTabs(tabs)
    }
    const pop = (key) => {
        setpopup({})
        setpopup((prev) => ({ ...prev, [key]: !popup[key] }))
    }

    const postingTabs = [
        { name: 'Post', icon: <PostAdd />, handler: handlepostTabs },
        { name: 'Image', icon: <Image />, handler: handlepostTabs },
        { name: 'Link', icon: <Link />, handler: handlepostTabs },
        { name: 'Poll', icon: <Poll />, handler: handlepostTabs },
    ]

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': Project_ID,
                },
                body: JSON.stringify({
                    name: signUpdata.name,
                    email: signUpdata.email,
                    password: signUpdata.password,
                    appType: 'reddit'
                })
            })
            const result = await response.json()
            
            if (response.ok) {
                localStorage.setItem('token', result.token)
                setloginpop(false)
                settoken(result.token)
                router.push('/Home')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': Project_ID,
                },
                body: JSON.stringify({
                    email: signUpdata.email,
                    password: signUpdata.password,
                    appType: 'reddit'
                })
            })
            const result = await response.json()
            if (result.status === "success") {
                localStorage.setItem('token', result.token)
                localStorage.setItem('name', result.data.name)
                settoken(result.token)
                setloginpop(false)
                router.push('/Home')
            }
        } catch (error) {
            console.log('Enter Correct details')
        }
    };

    const switchDark = () => {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
    }
    const switchLight = () => {
        setTheme('light')
        localStorage.setItem('theme', 'light')
    }

    return (
        <context.Provider value={{activepostTabs, setActivepostTabs,postingTabs,router, handleTabs,activeTabs, setActiveTabs, switchDark, switchLight, theme, signUpdata, setSignUpdata, handleSignUp, handleSubmit, popup, setpopup, pop, loginpop, setloginpop, token, settoken }}>
            <div className={`${theme}`}>
                {children}
            </div>
        </context.Provider>
    )
}