'use client'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { context } from '../(Context)/ContextProvider'
import { useRouter } from 'next/navigation'

export const apicontext = createContext()
export default function Apicontextprovider({ children }) {
    const router = useRouter();
    const { token } = useContext(context)
    const [post, setpost] = useState([])
    const [channel, setChannel] = useState([])
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [postimage, setpostimage] = useState(null)
    const [toggle, settoggle] = useState(true)
    const [reddittoggle, setReddittoggle] = useState(true)
    const [createsubreddit, setcreatesubreddit] = useState('')
    const [subredditname, setsubredditname] = useState('')
    const [likedCount, setlikedcount] = useState('')
    const [dislikedCount, setdislikedcount] = useState('')
    const [toggleuserfollow, settoggleuserfollow] = useState(false)
    const [userdata, setuserdata] = useState('')
    const [filteredpost, setfilteredpost] = useState([])
    const [popfollowuser, setpopfollowuser] = useState(false)
    const [postcomments, setpostComments] = useState([])
    const [postingComments, setpostingComments] = useState([])
    const [usercommenttoggle, settoggleusercomments] = useState(false)
    const [commentsPost, setCommentsPost] = useState()

    // ----------------FetchPost---------------------
    const fetchPosts = useMemo(async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/post?limit=500', {
                method: 'GET',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setpost(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }, [toggle])
    // ----------------FetchPost---------------------

    // ------------------Like and dislike----------------
    const Likepost = useCallback(async (_id) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${_id}`, {
                method: 'Post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ProjectID': 'hlahmd78akto',
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setlikedcount(result)
            settoggle(!toggle)
        }
        catch (error) {
            console.log(error)
        }
    }, [])
    const Disikepost = useCallback(async (_id) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/like/${_id}`, {
                method: 'Delete',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setdislikedcount(result)
            settoggle(!toggle)
        }
        catch (error) {
            console.log(error)
        }
    }, [])
    // ------------------Like and dislike----------------

    // ------------------follow and unfollow----------------
    const Userfollow = async (_id) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/follow/${_id}`, {
                method: 'Post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ProjectID': 'hlahmd78akto',
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
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/follow/${_id}`, {
                method: 'Delete',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
            const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/channel?limit=100', {
                method: 'GET',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();
            setChannel(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }, [toggle])

    const fetchCreatePost = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', description);
            formData.append('images', postimage);
            const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/post/', {
                method: 'Post',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${val}`, {
                method: 'Patch',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            })
            const result = await response.json();
        }
        catch (error) {
            console.log(error)
        }
    }

    // --------------------deletepost--------------------
    const fetchDeletePost = async (val) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${val}`, {
                method: 'Delete',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
            const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/channel/', {
                method: 'Post',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/user/${val}`, {
                method: 'GET',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/`, {
                method: 'GET',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
                    'ProjectID': 'hlahmd78akto',
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json();
            setCommentsPost(result.data)
            // console.log(result)
        }
        catch (error) {
            console.log(error)
        }
    }

    // ----------------fetchCommentsPosts---------------------


    // ----------------Fetch Comments---------------------

    const fetchPostComments = async (val) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${val}/comments`, {
                method: 'GET',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${val}`, {
                method: 'POST',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'content': postingComments,
                })
            })
            const result = await response.json();
            console.log(result)
            settoggleusercomments(!usercommenttoggle)
            setpostingComments('')
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchDeleteComments = async (val) => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${val}`, {
                method: 'DELETE',
                headers: {
                    'ProjectID': 'hlahmd78akto',
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
    }, [])




    // ---------------------Functions------------------------------

    const [sort, setsort] = useState('Best')
    const handleselect = (criteria) => {
        setsort(criteria);

        if (criteria === 'Best') {
            const sortedPost = post.sort((a, b) => {
                const ratioA = a.likeCount / (a.likeCount + a.dislikeCount);
                const ratioB = b.likeCount / (b.likeCount + b.dislikeCount);
                return ratioA - ratioB;
            });
            setpost(sortedPost);
        } else if (criteria === 'Hot') {
            const sortedPost = post.sort((a, b) => {
                const diffA = Math.abs((a.likeCount / (a.likeCount + a.dislikeCount)) - 1);
                const diffB = Math.abs((b.likeCount / (b.likeCount + b.dislikeCount)) - 1);
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

    
    const [popupdelete, setpopupdelete] = useState(null);
    const handledeletecomment = (index) => {
        setpopupdelete(index === popupdelete ? null : index);
    }

    return (
        <apicontext.Provider value={{ commentsPost, fetchCommentsPosts, popupdelete, setpopupdelete, handledeletecomment, usercommenttoggle, settoggleusercomments, postingComments, setpostComments, setpostingComments, fetchPostingComments, fetchDeleteComments, postcomments, fetchPostComments, popfollowuser, handlefollowuser, filteredpost, fetchyourPosts, userdata, fetchUserProfile, Userfollow, Userunfollow, settoggleuserfollow, toggleuserfollow, reddittoggle, setReddittoggle, settoggle, Likepost, Disikepost, likedCount, dislikedCount, title, settitle, description, setdescription, postimage, setpostimage, subredditname, setsubredditname, fetchCreatePost, fetchDeletePost, fetchUpdatePost, fetchCreatesubreddit, createsubreddit, setcreatesubreddit, post, setpost, sort, setsort, handleselect, getTimeDifference, channel, setChannel, formatDate }}>
            <div>
                {children}
            </div>
        </apicontext.Provider>
    )
}
