'use client'
import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { Project_ID } from '../(Constants)/Constants'
import { useRouter } from 'next/navigation'
import { Image, Link, Poll, PostAdd } from "@mui/icons-material"
import { useSnackbar } from 'notistack';

export const context = createContext()


export const ContextProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [themetoggle, setthemetoggle] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('theme')) {
            setTheme(localStorage.getItem('theme'));
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }

    }, [])
    const [theme, setTheme] = useState()
    const [signUpdata, setSignUpdata] = useState({ name: '', email: '', password: '', isChecked: false })
    const [popup, setpopup] = useState({});
    const [loginpop, setloginpop] = useState(false)
    const [userprofilename, setuserprofilename] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('name');
        }
        return null;
    })
    const [token, settoken] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    })
    const [activeTabs, setActiveTabs] = useState('Home')
    const [activepostTabs, setActivepostTabs] = useState('Post')
    const [loginInfo, setloginInfo] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('_id');
        }
        return null;
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
        { name: 'Image & Video', icon: <Image />, handler: handlepostTabs },
        // { name: 'Link', icon: <Link />, handler: handlepostTabs },
        // { name: 'Poll', icon: <Poll />, handler: handlepostTabs },
    ]

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (signUpdata.isChecked) {
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
                if (result) {
                    enqueueSnackbar('SignUp Successful', { variant: 'success', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                      }, });
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('_id', result.data.user._id)
                    localStorage.setItem('name', result.data.user.name)
                    setuserprofilename(result.data.user.name)
                    settoken(result.token)
                    setloginInfo(result.data.user._id)
                    setloginpop(false)
                    setIsSignUp(false)
                    setpopup({})
                    setSignUpdata({ name: '', email: '', password: '' })
                    setTimeout(() => {
                        router.push('/Home')
                    }, 20);
                } else if (result.message === "User already exists") {
                    enqueueSnackbar('User already exists!', { variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                      }, });
                    setIsSignUp(true)
                } else if (result.message === 'Invalid input data. Please provide a valid email') {
                    enqueueSnackbar('Please enter correct email!', { variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                      }, });
                }
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  }, });
            }
        }
        else if (!signUpdata.isChecked) {
            enqueueSnackbar('Please Verify!', { variant: 'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              }, });

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
            // console.log('result------->', result)
            if (result.status === "success") {
                enqueueSnackbar('Login Successful', { variant: 'success', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  }, });
                localStorage.setItem('token', result.token)
                localStorage.setItem('_id', result?.data?.user?._id)
                localStorage.setItem('name', result?.data?.user?.name)
                settoken(result.token)
                setuserprofilename(result?.data?.user?.name)
                setloginInfo(result.data._id)
                setloginpop(false)
                setTimeout(() => {
                    router.push('/Home')
                }, 20);
                setSignUpdata({ name: '', email: '', password: '' })
            } else if (result.status === 'fail') {
                enqueueSnackbar('Incorrect Email or Password!', { variant: 'error', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  }, });

            }
        } catch (error) {
            // console.log('Enter Correct details')
            enqueueSnackbar('Enter Correct details!', { variant: 'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              }, });
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
        <context.Provider value={{ homeorpopular, setthemetoggle, sethomeorpopular, setIsSignUp, isSignup, loginInfo, setloginInfo, activepostTabs, setuserprofilename, userprofilename, setActivepostTabs, postingTabs, router, handleTabs, activeTabs, setActiveTabs, switchDark, switchLight, theme, signUpdata, setSignUpdata, handleSignUp, handleSubmit, popup, setpopup, pop, loginpop, setloginpop, token, settoken }}>
            <div className={`${theme}`}>
                {children}
            </div>
        </context.Provider>
    )
}