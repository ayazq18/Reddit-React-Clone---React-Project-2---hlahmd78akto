'use client'
import React, { useContext, useEffect, } from "react";
import { Button, MenuItem, Paper, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { Box } from "@mui/system";
import { Close, Delete, FilterVintage, LocalFireDepartment, MoreHoriz, NewReleasesTwoTone, Publish, Rocket, } from "@mui/icons-material";
import { arrowdown, arrowdowncliked, arrowup, arrowupclicked, comments, followedicon, share } from "../../(Components)/(Constants)/Asset";
import { context } from "../../(Components)/(Context)/ContextProvider";
import { apicontext } from "../../(Components)/(Context)/Apicontextprovider";
import LikeDislike from "@/app/(Components)/(SmallComponents)/LikeDislike";

export default function UserProfile(props) {
    const { userprofilename, theme, pop, popup, router, loginInfo, } = useContext(context)
    const { userId, handledeletecomment, fetchDeletePost, userposttoggle, popupdelete, setpopupdelete, isSwitchOn, getTimeDifference, formatDate, toggleuserfollow, setpopfollowuser, userdata, fetchUserProfile, filteredpost, fetchyourPosts, popfollowuser, handlefollowuser, liketoggle, disliketoggle } = useContext(apicontext)
    useEffect(() => {
        fetchUserProfile(props.params.Profile)
        fetchyourPosts(props.params.Profile)
    }, [toggleuserfollow, liketoggle, disliketoggle, userposttoggle])

    return (
        <Box sx={{ position: 'relative', width: '100vw', display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column-reverse', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' }, backgroundColor: `${theme === 'light' ? '#DAE0E6' : '#000'}`, }}>

            {/* ---------------Follow unfollow popup------------------ */}
            {popfollowuser && <Paper sx={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'absolute', top: '70vh', width: '40%', height: '60px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, zIndex: '9' }}>
                <Box display='flex' alignItems='center' justifyContent='center' borderRadius='5px 0 0 5px' bgcolor='red' height='100%' width='40px' color={`${theme === 'light' ? 'black' : '#fff'}`} sx={{ ":hover": { transform: 'scale(1.5)', borderRadius: '50px', transition: 'all 1s ease' } }} onClick={() => setpopfollowuser(false)}><Close /></Box>
                <Box display='flex' alignItems='center' gap='10px'><Typography sx={{ width: '30px' }}>{followedicon}</Typography><Typography variant="h5" sx={{ color: 'green', fontSize: '15px' }}>{userdata.isFollowed === true ? 'You Followed' : 'You Unfollowed'} {userdata.name}</Typography></Box>
            </Paper>}
            {/* ---------------Follow unfollow popup------------------ */}


            <Box sx={{ width: { xs: '100%', md: '50%', } }}>

                {/* ---------------Create post section------------------ */}
               {userId === loginInfo && <Box width='100%' sx={{ display: 'flex', m: '20px 0', borderRadius: '3px', backgroundColor: `${theme === 'light' ? '#fff' : '#091113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                    <MenuItem >
                        <img style={{ position: 'relative', left: '-5px', width: '35px', borderRadius: '50px' }} src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" alt="User Avatar" className="max-w-full"></img>
                        {isSwitchOn && <Box sx={{ position: 'absolute', left: '37px', top: '30px', width: '10px', height: '10px', bgcolor: '#55bd46', borderRadius: '100%' }}></Box>}
                    </MenuItem>
                    <Typography className="c" onClick={() => router.push('/submit/newpost')} variant="h6" sx={{ width: '70%', p: '7px', m: '7px', borderRadius: '5px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}`, fontSize: '14px', color: '#808080', ":hover": { border: `${theme === 'light' ? '1px solid blue' : '1px solid white'}`, boxSizing: 'border-box' } }}>Create Post</Typography>
                </Box>}

                {/* ---------------Create post section------------------ */}


                {/* ---------------Post section------------------ */}

                {filteredpost && filteredpost.map((item, index) => (
                    <Box key={index} sx={{ width: { xs: '100%', md: '100%' }, mt:'20px', display: 'flex', gap: '5px', mb: '10px', borderRadius: '3px', border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, ":hover": { border: `${theme === 'light' ? '1px solid #808080' : '1px solid white'}` } }}>
                        <Box sx={{width:'7%', p: '10px', borderRadius: '3px 0 0 3px', backgroundColor: `${theme === 'light' ? '#f6f7f8' : '#111113'}`, boxSizing: 'border-box' }}>
                            {/* -------Like Dislike Component---------- */}
                            <LikeDislike item={item} />
                            {/* -------Like Dislike Component---------- */}
                        </Box>
                        <Box sx={{ width: '92%', }}>
                            <Box className="c" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', p: '5px 0' }}>
                                    {item.profileImage ? <img style={{ width: '1rem', borderRadius: '4px' }} src={item.author.profileImage} />
                                        : <Typography variant='h6' sx={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', p: '2px 7px', borderRadius: '100%', backgroundColor: '#808080' }}>{(item.author.name.charAt(0))}</Typography>}
                                    <Typography variant="p" sx={{ fontSize: '14px', fontWeight:'700' }}>{item.author.name} &nbsp;.</Typography>
                                    <Typography variant="p" sx={{ fontSize: '10px' }}>{getTimeDifference(item.createdAt)}</Typography>
                                </Box>
                                {item.author._id === loginInfo && <Box position='relative'>
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}><MoreHoriz sx={{ color: `${theme === 'light' ? '#000' : '#fff'}` }} onClick={() => handledeletecomment(item._id)} /></Box>
                                    {popupdelete == item._id && <Box sx={{ position: 'absolute', right: '0', width: '200px', p: '10px', borderRadius: '5px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.104)'}`, }}>
                                        <Box onClick={() => { fetchDeletePost(item._id) }} sx={{ p: '10px 0 10px 20px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                                            <Delete />
                                            <Typography variant="contained" >Delete Post</Typography>
                                        </Box>
                                        <Box onClick={() => { router.push(`/submit/${item._id}`), setpopupdelete(null) }} sx={{ p: '10px 0 10px 20px', textWrap: 'nowrap', display: 'flex', alignItems: 'center', gap: '10px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>
                                            <CreateIcon />
                                            <Typography variant="contained">Edit Post</Typography>
                                        </Box>
                                    </Box>}
                                </Box>}
                            </Box>
                            <Typography variant="h6" sx={{ fontSize: '18px', overflowWrap: 'break-word', wordWrap: 'break-word', mb: '10px'}}>{item.content}</Typography>
                            <img style={{ width: '100%', }} src={item.images} />
                            <Box display='flex' alignItems='center' gap='10px' sx={{ p: '10px 0', height: '50px' }}>
                                <Box onClick={() => router.push(`/PostComments/${item.author._id}?PostId=${item._id}`)} sx={{ display: 'flex', alignItems: 'center', ":hover": { bgcolor: 'rgba(236, 232, 232, 0.734)' } }}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', p: '5px', borderRadius: '50px', ":hover": { bgcolor: 'rgba(174, 174, 241, 0.558)' } }}>{comments}</Typography>
                                    <Typography variant="h6" sx={{ p: '5px', fontSize: '12px' }}>{item.commentCount} Comments</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}

                {filteredpost.length === 0 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" srcset="" sizes="" alt="Image of a wondering Snoo" />
                    { userdata && <Typography variant='h6' >u/{userdata.name} hasn't posted yet</Typography>}
                </Box>}

                {/* ---------------Post section------------------ */}
            </Box>
            {/* ---------------UserDetails sec------------------ */}

            {userdata && <Box sx={{ p: '19px 10px', height: { xs: 'fit-content', md: '100vh' }, display: 'block', width: { xs: '100%', md: '300px' }, }}>
                <Box sx={{ position: 'relative', pb: '20px', mt: '0px', height: `${popup['moreoptions'] ? 'fit-content' : '320px'}`, borderRadius: '4px', backgroundColor: `${theme === 'light' ? '#fff' : '#1a1a1b'}`, border: `.5px solid ${theme === 'light' ? 'rgba(119, 117, 117, 0.507)' : 'rgba(224, 224, 247, 0.04)'}` }}>
                    <Box sx={{ position: 'relative', width: '100%', height: '100px', borderRadius: '4px 4px 0 0', bgcolor: '#33a8ff', }}>
                    </Box>
                    <Box sx={{ position: 'absolute', top: '40px', left: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px', width: '80px', height: '80px', backgroundColor: `${theme === 'light' ? '#fff' : '#000'}` }}>
                        {userdata.profileImage ? <img style={{ width: '70px', borderRadius: '4px' }} className="_2TN8dEgAQbSyKntWpSPYM7 _3Y33QReHCnUZm9ewFAsk8C" src={userdata.profileImage} />
                            : <Typography variant='h6' sx={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', p: '2px 7px', borderRadius: '100%', backgroundColor: '#808080' }}>{userdata.name.charAt(0)}</Typography>}
                    </Box>
                    <Typography sx={{ m: '20px 0px 10px 15px', fontSize: '12px' }}>{userdata.name}</Typography>
                    <Box sx={{ p: '0 15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <Box sx={{}}>
                            <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Email</Typography>
                            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', }}>
                                <FilterVintage sx={{ fontSize: '14px', color: 'orangered' }} />
                                <Typography variant="p" sx={{ fontSize: '12px', color: '#808080' }}>{userdata.email}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{}}>
                            <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Created on</Typography>
                            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', }}>
                                <FilterVintage sx={{ fontSize: '14px', color: 'orangered' }} />
                                <Typography variant="p" sx={{ fontSize: '12px', color: '#808080' }}>{formatDate(userdata.createdAt)}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', mt: '10px', p: '15px', justifyContent: 'flex-start', alignItems: 'center', gap: '10px' }}>
                        {userprofilename !== userdata.name ?
                            <Button variant='contained' sx={{ width: '40%', p: '3px', fontSize: '14px', textTransform: 'revert', borderRadius: '20px', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}` } }} onClick={() => { handlefollowuser(props.params.Profile) }}>{userdata.isFollowed === true ? 'Unfollow' : 'Follow'}</Button>
                            :
                            <Typography sx={{ width: '40%', p: '3px', fontSize: '14px', textTransform: 'uppercase', textAlign: 'center', color: `${theme === 'light' ? '#fff' : '#000'}`, bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}`, ":hover": { bgcolor: `${theme === 'light' ? '#33a8ff' : '#fff'}` } }}>My Profile</Typography>
                        }
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography className="c" onClick={() => pop('moreoptions')} variant="h5" sx={{ fontSize: '15px', fontWeight: '700', color: '#177ac5', textAlign: 'end', p: '0 10px' }}>{popup['moreoptions'] ? 'Fewer options' : 'More Options'}</Typography>
                    </Box>
                    {popup['moreoptions'] && <Box sx={{ p: '10px', width: '100%', }}>
                        <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '500' }}>Skills :</Typography>
                        {userdata.skills.map((item, index) => (<Typography variant="h6" sx={{ mb: '5px', fontSize: '14px', color: '#177ac5' }}>{item}</Typography>))}
                    </Box>}
                </Box>
            </Box>}

            {/* ---------------UserDetails sec------------------ */}

        </Box>
    )
}
