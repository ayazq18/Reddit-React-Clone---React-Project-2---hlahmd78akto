'use client'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { context } from './ContextProvider'
import { useRouter } from 'next/navigation'
const Base_URL = 'https://academics.newtonschool.co/api/v1/reddit'
const Project_ID = 'hlahmd78akto'

export const apicontext = createContext()
export default function Apicontextprovider({ children }) {
    const router = useRouter();
    const { token } = useContext(context)
    const [post, setpost] = useState([])
    const [channel, setChannel] = useState([])
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [postimage, setpostimage] = useState([])
    const [toggle, settoggle] = useState(true)
    const [reddittoggle, setReddittoggle] = useState(true)
    const [createsubreddit, setcreatesubreddit] = useState('')
    const [subredditname, setsubredditname] = useState('')
    const [toggleuserfollow, settoggleuserfollow] = useState(false)
    const [userdata, setuserdata] = useState([])
    const [filteredpost, setfilteredpost] = useState([])
    const [popfollowuser, setpopfollowuser] = useState(false)
    const [postcomments, setpostComments] = useState([])
    const [postingComments, setpostingComments] = useState([])
    const [usercommenttoggle, settoggleusercomments] = useState(false)
    const [item, setitem] = useState()
    const [popupdelete, setpopupdelete] = useState(null);
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [toggleCommunity, settogglecommunity] = useState(false)
    const [liketoggle, setliketoggle] = useState(false)
    const [disliketoggle, setdisliketoggle] = useState(false)

    const [sortval, setsortval] = useState('best')

    // ----------------FetchPost---------------------
    function sorting(value) {
        if (sortval == "best") {
            return value.sort((a, b) => {
                return (a.likeCount / a.dislikeCount) / (b.likeCount / b.dislikeCount);
            });
        }
        else if (sortval == "hot") {
            return value.sort((a, b) => {
                const ratioA = Math.abs(a.likeCount / a.dislikeCount);
                const ratioB = Math.abs(b.likeCount / b.dislikeCount);
                return ratioA - ratioB;
            });
        } else if (sortval == "new") {
            return value.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        } else if (sortval == "top") {
            return value.sort((a, b) => b.likeCount - a.likeCount)
        } else {
            return value;
        }
    }

    const fetchPosts = useMemo(async () => {
        try {
            const response = await fetch(`${Base_URL}/post?limit=500`, {
                method: 'GET',
                headers: {
                    'ProjectID': Project_ID,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            console.log(result)
            setpost(sorting(result.data))
        }
        catch (error) {
            console.log(error)
        }
    }, [toggle, liketoggle, disliketoggle, sortval])

    // ----------------FetchPost---------------------

    // ------------------Like and dislike----------------
    const Likepost = async (_id) => {
        try {
            const response = await fetch(`${Base_URL}/like/${_id}`, {
                method: 'Post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ProjectID': Project_ID,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            if (result.status === 'success') {
                setliketoggle(!liketoggle)
                setdisliketoggle(false)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    const Dislikepost = async (_id) => {
        try {
            const response = await fetch(`${Base_URL}/like/${_id}`, {
                method: 'Delete',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            if (result.status === 'success') {
                setdisliketoggle(!disliketoggle)
                setliketoggle(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // ------------------Like and dislike----------------

    // ------------------follow and unfollow----------------
    const Userfollow = async (_id) => {
        try {
            const response = await fetch(`${Base_URL}/follow/${_id}`, {
                method: 'Post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ProjectID': Project_ID,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            if (result.status === 'success') {
                settoggleuserfollow(!toggleuserfollow)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const Userunfollow = async (_id) => {
        try {
            const response = await fetch(`${Base_URL}/follow/${_id}`, {
                method: 'Delete',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            if (result.status === 'success') {
                settoggleuserfollow(!toggleuserfollow)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // ------------------follow and unfollow----------------



    const fetchChannel = useMemo(async () => {
        try {
            const response = await fetch(`${Base_URL}/channel?limit=100`, {
                method: 'GET',
                headers: {
                    'ProjectID': Project_ID,
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();
            setChannel(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }, [toggle, toggleCommunity])


    const fetchCreatePost = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', description);
            formData.append('images', postimage);
            const response = await fetch(`${Base_URL}/post/`, {
                method: 'Post',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })
            const result = await response.json();
            settoggle(!toggle)
            router.push('/Home')
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchUpdatePost = async (val) => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', description);
            formData.append('images', postimage);
            const response = await fetch(`${Base_URL}/post/${val}`, {
                method: 'PATCH',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })
            const result = await response.json();
            settoggle(!toggle)
            router.push('/Home')
        }
        catch (error) {
            console.log(error)
        }
    }

    // --------------------deletepost--------------------
    const fetchDeletePost = async (val) => {
        try {
            const response = await fetch(`${Base_URL}/post/${val}`, {
                method: 'Delete',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                },
            })
            settoggle(!toggle)
        }
        catch (error) {
            console.log(error)
        }
    }

    // -------------------Creating a Subreddits------------------

    const fetchCreatesubreddit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', subredditname);
            formData.append('content', description);
            formData.append('images', postimage);
            const response = await fetch(`${Base_URL}/channel/`, {
                method: 'Post',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })
            const result = await response.json();
            settoggle(!toggle)
            router.push('Home')
        }
        catch (error) {
            console.log(error)
        }
    }

    // -------------------Creating a Subreddits------------------
    // -------------------Fetch User Profile------------------

    const fetchUserProfile = async (val) => {
        try {
            const response = await fetch(`${Base_URL}/user/${val}`, {
                method: 'GET',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setuserdata(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    // -------------------Fetch User Profile------------------


    // ----------------fetchyourPosts---------------------

    const fetchyourPosts = async (val) => {
        try {
            const response = await fetch(`${Base_URL}/post/`, {
                method: 'GET',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            const filteredresult = result.data.filter((item) => { return item.author._id == val })
            setfilteredpost(filteredresult)
        }
        catch (error) {
            console.log(error)
        }
    }

    // ----------------fetchyourPosts---------------------

    // ----------------fetchCommentsPosts---------------------

    const fetchCommentsPosts = async (val) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${val}`, {
                method: 'GET',
                headers: {
                    'ProjectID': Project_ID,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setitem(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    // ----------------fetchCommentsPosts---------------------


    // ----------------Fetch Comments---------------------

    const fetchPostComments = async (val) => {
        try {
            const response = await fetch(`${Base_URL}/post/${val}/comments`, {
                method: 'GET',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setpostComments(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchPostingComments = async (val) => {
        try {
            const response = await fetch(`${Base_URL}/comment/${val}`, {
                method: 'POST',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'content': postingComments,
                })
            })
            const result = await response.json();
            settoggleusercomments(!usercommenttoggle)
            setpostingComments('')
            settoggle(!toggle)
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchDeleteComments = async (val) => {
        try {
            const response = await fetch(`${Base_URL}/comment/${val}`, {
                method: 'DELETE',
                headers: {
                    'ProjectID': Project_ID,
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            settoggleusercomments(!usercommenttoggle)
        }
        catch (error) {
            console.log(error)
        }
    }

    // ----------------Fetch Comments---------------------


    useEffect(() => {
        fetchChannel
        fetchPosts
    }, [sortval])


    // ---------------------Functions------------------------------

    const [sort, setsort] = useState('Best')
    const handleselect = (criteria) => {
        setsort(criteria);

        if (criteria === 'Best') {
            const sortedPost = post.sort((a, b) => {
                const ratioA = (a.likeCount) / (a.dislikeCount);
                const ratioB = (b.likeCount) / (b.dislikeCount);
                return ratioB - ratioA;
            });
            setpost(sortedPost);
        } else if (criteria === 'Hot') {
            const sortedPost = post.sort((a, b) => {
                const diffA = Math.abs((a.likeCount / (a.likeCount + a.dislikeCount)));
                const diffB = Math.abs((b.likeCount / (b.likeCount + b.dislikeCount)));
                return diffA - diffB;
            });
            setpost(sortedPost);
        } else if (criteria === 'New') {
            const sortedPost = post.sort((a, b) => {
                return b.createdAt - a.createdAt;
            });
            setpost(sortedPost);
        } else if (criteria === 'Top') {
            const sortedPost = post.sort((a, b) => {
                return b.likeCount - a.likeCount;
            });
            setpost(sortedPost);
        }
    };

    const getTimeDifference = (createdAt) => {
        const currentDate = new Date();
        const postDate = new Date(createdAt);
        const timeDifference = currentDate.getTime() - postDate.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            if (days === 1) {
                return "1 day ago";
            } else {
                return `${days} days ago`;
            }
        } else if (hours > 0) {
            if (hours === 1) {
                return "1 hour ago";
            } else {
                return `${hours} hours ago`;
            }
        } else if (minutes > 0) {
            if (minutes === 1) {
                return "1 minute ago";
            } else {
                return `${minutes} minutes ago`;
            }
        } else {
            return "Just now";
        }
    };

    const recentChannels = channel.filter(item => {
        const currentDate = new Date();
        const channelDate = new Date(item.createdAt);
        const timeDifference = currentDate.getTime() - channelDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference <= 7;
    });


    const formatDate = (dateStr) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    const handlefollowuser = (_id) => {
        if (userdata.isFollowed === true) {
            Userunfollow(_id)
        } else {
            Userfollow(_id)
        }
        setpopfollowuser(!popfollowuser)
        setTimeout(() => {
            setpopfollowuser(false)
        }, 3000);
    }


    const handledeletecomment = (index) => {
        setpopupdelete(index === popupdelete ? null : index);
    }

    const handleSwitchChange = () => {
        setIsSwitchOn(prevState => !prevState);
    };

    return (
        <apicontext.Provider value={{ sortval, setsortval, toggleCommunity, settogglecommunity, recentChannels, isSwitchOn, handleSwitchChange, item, fetchCommentsPosts, popupdelete, setpopupdelete, handledeletecomment, usercommenttoggle, settoggleusercomments, postingComments, setpostComments, setpostingComments, fetchPostingComments, fetchDeleteComments, postcomments, fetchPostComments, popfollowuser, handlefollowuser, filteredpost, fetchyourPosts, userdata, fetchUserProfile, Userfollow, Userunfollow, settoggleuserfollow, toggleuserfollow, reddittoggle, setReddittoggle, settoggle, Likepost, Dislikepost, liketoggle, disliketoggle, disliketoggle, title, settitle, description, setdescription, postimage, setpostimage, subredditname, setsubredditname, fetchCreatePost, fetchDeletePost, fetchUpdatePost, fetchCreatesubreddit, createsubreddit, setcreatesubreddit, post, setpost, sort, setsort, handleselect, getTimeDifference, channel, setChannel, formatDate }}>
            <div>
                {children}
            </div>
        </apicontext.Provider>
    )
}
