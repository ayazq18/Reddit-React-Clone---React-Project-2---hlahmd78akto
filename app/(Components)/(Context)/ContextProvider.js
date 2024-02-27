'use client'
import React from 'react'
import { createContext, useState } from 'react'
import { Project_ID } from '../(Constants)/Constants'
import { useRouter } from 'next/navigation'
import { Image, Link, Poll, PostAdd } from "@mui/icons-material"

export const context = createContext()

export const ContextProvider = ({ children }) => {
    const router = useRouter();

    const [storedTheme, setstoredtheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme');
        }
        return 'light';
    });
    const [theme, setTheme] = useState(storedTheme || 'dark')
    const [signUpdata, setSignUpdata] = useState({ name: '', email: '', password: '', isChecked: false })
    const [popup, setpopup] = useState({});
    const [loginpop, setloginpop] = useState(false)
    const [userprofilename, setuserprofilename] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('name');
        }
        return '';
    })
    const [token, settoken] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return 'dark';
    })
    const [activeTabs, setActiveTabs] = useState('Home')
    const [activepostTabs, setActivepostTabs] = useState('Post')
    const [loginInfo, setloginInfo] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('_id');
        }
        return 'dark';
    })
    const [isSignup, setIsSignUp] = useState(true)
    const [homeorpopular, sethomeorpopular] = useState('Home')

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
        // { name: 'Link', icon: <Link />, handler: handlepostTabs },
        // { name: 'Poll', icon: <Poll />, handler: handlepostTabs },
    ]

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (signUpdata.password.length >= 8 && signUpdata.isChecked === true) {
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
                    localStorage.setItem('name', result.data.user.name)
                    localStorage.setItem('_id', result.data._id)
                    setuserprofilename(result.data.user.name)
                    setloginpop(false)
                    setIsSignUp(false)
                    settoken(result.token)
                    setSignUpdata({ name: '', email: '', password: '' })
                    setTimeout(() => {
                        router.push('/Home')
                    }, 20);
                } else if (result.message === "User already exists") {
                    alert("User already exists")
                    setIsSignUp(true)
                }
            } catch (error) {
                alert(error)
            }
        } else if (signUpdata.password.length < 8) {
            alert("Password should be of atleaset 8 characters")
        } else if (signUpdata.isChecked !== true) {
            alert("Please Verify!")
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
                    localStorage.setItem('_id', result.data._id)
                    settoken(result.token)
                    setuserprofilename(result.data.name)
                    setloginpop(false)
                    setTimeout(() => {
                        router.push('/Home')
                    }, 20);
                    setSignUpdata({ name: '', email: '', password: '' })
                } else if (result.status === 'fail') {
                    alert("Incorrect Email or Password")
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
        <context.Provider value={{ homeorpopular, sethomeorpopular, setIsSignUp, isSignup, loginInfo, activepostTabs, setuserprofilename, userprofilename, setActivepostTabs, postingTabs, router, handleTabs, activeTabs, setActiveTabs, switchDark, switchLight, theme, signUpdata, setSignUpdata, handleSignUp, handleSubmit, popup, setpopup, pop, loginpop, setloginpop, token, settoken }}>
            <div className={`${theme}`}>
                {children}
            </div>
        </context.Provider>
    )
}