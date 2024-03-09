'use client'
import { apicontext } from '@/app/(Components)/(Context)/Apicontextprovider'
import { arrowdown, arrowup, comments, communityprofile, share } from '@/app/(Components)/(Constants)/Asset'
import { context } from '@/app/(Components)/(Context)/ContextProvider'
import { Cake, CircleNotificationsOutlined, LocalFireDepartment, MoreHoriz, NewReleasesTwoTone, NotificationAdd, Notifications, Publish, Rocket, VisibilityOff } from '@mui/icons-material'
import { Typography, Button, MenuItem, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import LikeDislike from '@/app/(Components)/(SmallComponents)/LikeDislike'

export default function CommunityInfo(props) {
    const { token, theme, router, pop, popup, setpopup, userprofilename, loginInfo } = useContext(context)
    const { settogglecommunity, toggleCommunity, isSwitchOn, sort, setsort, handleselect, getTimeDifference, fetchDeletePost, Likepost, Disikepost, likedCount, formatDate, toggle, settoggle } = useContext(apicontext)
    const [channelid, setchannleid] = useState()
    const [join, setjoin] = useState(false)
    const [channelpost, setchannelpost] = useState([])
    // console.log(props.params.CommunityInfo)
    // const fetchPostsChannel = async () => {
    //     try {
    //         const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/post', {
    //             method: 'GET',
    //             headers: {
    //                 'ProjectID': 'hlahmd78akto',
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //         const result = await response.json();

    //         const filteredpost = result.data.filter((item) => item.channel ? item.channel._id === props.params.CommunityInfo : '')
    //         setpostchannel(filteredpost)
    //         console.log(filteredpost)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    const fetchChannelById = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${props.params.CommunityInfo}`, {
                method: 'Get',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await response.json();
            setchannleid(result.data)
            console.log(result)

        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchChannelpost = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/channel/${props.params.CommunityInfo}/posts`, {
                method: 'Get',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await response.json();
            setchannelpost(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchDeletesubreddit = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/linkedin/channel/${props.params.CommunityInfo}`, {
                method: 'Delete',
                headers: {
                    'ProjectID': 'hlahmd78akto',
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (response.ok) {
                setTimeout(() => {
                    settoggle(!toggle)
                    settogglecommunity(!toggleCommunity)
                    router.push('/Home')
                }, 500);
            }
        }
        catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchChannelById();
        fetchChannelpost();
    }, [])

    return (

        <Box sx={{ position: 'relative', width: '100vw', backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#000'}` }}>
            {popup['deleteChannel'] && <Box sx={{ zIndex: '9', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100%', bgcolor: '#0c0b0bc0' }}>
                <Box sx={{ top: '30%', left: '25%', width: '50%', p: '20px', backgroundColor: `${theme === 'light' ? '#fff' : '#000'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.24)'}` }}>
                    <Typography sx={{ textAlign: 'center', fontWeight: '700', }}>You won't be able to recover the Channel once deleted!</Typography>
                    <Box sx={{ mt: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <Button onClick={() => { fetchDeletesubreddit(), pop("deleteChannel") }} variant='outlined' sx={{ width: '100px', p: '5px', borderRadius: '10px', fontSize: '16px', fontWeight: '900', textTransform: 'revert', color: `${theme === 'light' ? 'blue' : '#fff'}`, }}>Delete</Button>
                        <Button onClick={() => pop('deleteChannel')} variant='outlined' sx={{ width: '100px', p: '5px', borderRadius: '10px', fontSize: '16px', fontWeight: '900', textTransform: 'revert', color: `${theme === 'light' ? 'blue' : '#fff'}`, }}>Cancel</Button>
                    </Box>
                </Box>
            </Box>}
           {channelid && <Box sx={{ width: '100%', height: '20vh', backgroundImage: `url(${(channelid.owner.profileImage)})`, }}></Box>}
            {channelid ?
                (<Box>
                    <Box sx={{ width: '100%', height: '15vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, }}>
                        <Box sx={{ width: '70%', height: '15vh', }}>
                            <Box sx={{ width: '50%', height: '15vh', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                {channelid.image ? <img style={{ width: '70px', borderRadius: '50px', border: '3px solid white' }} src={channelid.image} />
                                    : <img style={{ width: '70px', borderRadius: '50px' }} src="https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe" />}
                                <Box sx={{ display: 'flex', gap: '20px', width: '100%', height: '10vh' }}>
                                    <Box>
                                        {channelid && <Typography variant='h6' sx={{ fontSize: '30px', fontWeight: '900', textWrap: 'nowrap' }}>{channelid.name}</Typography>}
                                        {channelid && <Typography variant='h6' sx={{ fontSize: '15px', fontWeight: '700', color: `${theme === 'light' ? '#808080' : '#fff'}` }}>r/{channelid.name}</Typography>}
                                    </Box>
                                    <Box sx={{ width: '100%', height: '10vh', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Button variant='outlined' onClick={() => setjoin(!join)} sx={{ width: '100px', p: '5px', borderRadius: '50px', fontSize: '16px', fontWeight: '900', textTransform: 'revert', color: `${theme === 'light' ? 'blue' : '#fff'}`, }}>{join ? "Leave" : "Join"}</Button>
                                        {join && <Box sx={{ border: '1px solid blue', borderRadius: "50%", p: '5px', display: 'flex', alignItems: 'center', }}><Tooltip title='Option coming soon'><Notifications sx={{ color: 'blue', width: '25px', height: '25px' }} /></Tooltip></Box>}
                                        <Box position='relative' sx={{ cursor: 'pointer' }} >
                                            {channelid.owner._id === loginInfo && <MoreHoriz onClick={() => pop('deleteChannelpop')} />}
                                            {/* {channelid.owner._id === loginInfo && <MoreHoriz onClick={() => pop('deleteChannelpop')} />} */}
                                            {popup['deleteChannelpop'] && <Box sx={{ position: 'absolute', top: '20px', left: '20px', width: '200px', p: '10px', backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#000'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.24)'}` }}>
                                                <Box onClick={() => { pop('deleteChannel') }} sx={{ p: '10px ', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                                                    <Typography variant="contained" fontWeight='700'>Delete Channel</Typography>
                                                </Box>
                                            </Box>}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column-reverse', md: 'row' }, gap: '25px' }}>
                        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
                            <Box width='100%' sx={{ display: 'flex', m: '20px 0', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                                <MenuItem >
                                    <img style={{ position: 'relative', left: '-5px', width: '35px', borderRadius: '50px' }} src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" alt="User Avatar" className="max-w-full"></img>
                                    {isSwitchOn && <Box sx={{ position: 'absolute', left: '37px', top: '30px', width: '10px', height: '10px', bgcolor: '#55bd46', borderRadius: '100%' }}></Box>}
                                </MenuItem>
                                <Typography onClick={() => router.push('/submit/newpost')} variant="h6" sx={{ width: '70%', p: '7px', m: '7px', borderRadius: '5px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}`, fontSize: '14px', color: '#808080', ":hover": { border: `${theme === 'light' ? '1px solid blue' : '1px solid white'}`, boxSizing: 'border-box' } }}>Create Post</Typography>
                            </Box>

                            {!channelpost && channelpost.length > 0 ? (channelpost.map((item, index) => (item && <Box key={index} sx={{ width: { xs: '100%', md: '100%' }, display: 'flex', gap: '5px', mb: '10px', borderRadius: '3px', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, ":hover": { border: `${theme === 'light' ? '1px solid #808080' : '1px solid white'}` } }}>
                                <Box sx={{ p: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '3px 0 0 3px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, boxSizing: 'border-box' }}>
                                    <LikeDislike item={item} />
                                </Box>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
                                        {item ? <img style={{ width: '1rem', borderRadius: '4px' }} class="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={item.images[0]} />
                                            : <img style={{ width: '1rem', borderRadius: '4px' }} src="https://preview.redd.it/me-watching-a-random-drawing-i-made-get-turned-into-a-meme-v0-xib15dbut7tb1.png?width=640&crop=smart&auto=webp&s=218dbe01ffa9c145aa5fef90aec31a21b97ffbbe" />}
                                        <Typography onClick={() => router.push(`/User/${item.author._id}`)} variant="p" sx={{ fontSize: '14px', fontWeight: '700' }}>{item.author.name} &nbsp;.</Typography>
                                        <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ fontSize: '22px', mb: '10px', }}>{item.content}</Typography>
                                    <img style={{ width: '100%', height: '400px' }} src={item.images[0]} srcset="" sizes="" alt=""></img>
                                    <Box display='flex' alignItems='center' gap='10px' sx={{ p: '10px 0', height: '50px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                                            <Typography variant="h6" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount} Comments</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px' }}>{share}</Typography>
                                            <Typography variant="p" sx={{ p: '5px', fontSize: '12px' }}>Share</Typography>
                                        </Box>

                                        <Box position='relative'>
                                            <MoreHoriz sx={{ color: `${theme === 'light' ? '#000' : '#fff'}` }} onClick={() => pop('delete')} />
                                            {popup['delete'] && <Box sx={{ position: 'absolute', width: '150px', p: '10px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                                                <VisibilityOff />
                                                <Typography variant="contained" onClick={() => { fetchDeletePost(item._id), pop('delete') }}>Delete Post</Typography>
                                            </Box>}
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                            ))) :
                                (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" srcset="" sizes="" alt="Image of a wondering Snoo" />
                                    <Typography variant='h6' >u/{channelid.name} hasn't posted yet</Typography>
                                </Box>)
                            }
                        </Box>
                        <Box sx={{ pb: '20px', mt: '20px', width: { xs: '100%', md: '22%' }, borderRadius: '4px', height: 'fit-content', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: '15px 10px', color: `${theme === 'light' ? '#fff' : '#808080'}`, backgroundColor: `${theme === 'light' ? '#48576b' : '#000'}` }}>
                                <Typography variant='h6' sx={{ fontSize: '15px', fontWeight: '700', }}>About Community</Typography>
                            </Box>
                            {channelid && <Typography sx={{ p: '10px', fontWeight: '500', color: `${theme === 'light' ? '#000' : '#fff'}`, }}>{channelid.description}</Typography>}
                            <Tooltip title='Created at'>
                                <Box sx={{ p: '10px', display: 'flex', alignItems: 'center', gap: '10px', }}>
                                    {channelid && <><Cake /><Typography>Created {formatDate(channelid.createdAt)}</Typography></>}
                                </Box>
                            </Tooltip>
                            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', m: '10px 0', p: '10px', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.107)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                        <Box sx={{ width: '80px', p: '10px 0', }}>
                            <Typography sx={{ fontSize: '20px', fontWeight: '700' }}>297k</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#808080' }}>Members</Typography>
                        </Box>
                        <Box sx={{ width: '80px', p: '10px 0', }}>
                            <Typography sx={{ fontSize: '20px', fontWeight: '700' }}>11</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#808080' }}>Online</Typography>
                        </Box>
                        <Box sx={{ width: '80px', p: '10px 0', }}>
                            <Typography sx={{ fontSize: '20px', fontWeight: '700' }}>Top 1%</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#808080' }}>Ranked by Size</Typography>
                        </Box>
                    </Box> */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
                                <Button onClick={() => router.push('/submit/newpost')} variant='contained' sx={{ width: '90%', p: '6px', fontSize: '14px', textTransform: 'revert', borderRadius: '20px', color: `${theme === 'light' ? '#fff' : '#000'}`, backgroundColor: `${theme === 'light' ? '#48576b' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#48576b' : '#fff'}` } }}>Create Post</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>)
                :

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '100%', mt: '20px' }}>
                    <Box className='communitydeleted' sx={{ width: '20%', height: '40%', p: '10px', color: `${theme === 'light' ? '#000' : '#fff'}`, }}></Box>
                </Box>
            }
        </Box>
    )
}
